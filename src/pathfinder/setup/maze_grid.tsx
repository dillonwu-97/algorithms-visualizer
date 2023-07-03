
import React, {ReactElement} from 'react';
import Cell from './cell/cell'
import Bfs from '../algorithms/path_algs/bfs'
import Dfs from '../algorithms/path_algs/dfs'
import greedy from '../algorithms/path_algs/greedy'
import astar from '../algorithms/path_algs/astar'
import dijkstra from '../algorithms/path_algs/dijkstra'
import random_maze from '../algorithms/maze_algs/random_maze'
import random_kruskal from '../algorithms/maze_algs/random_kruskal'
import random_prims from '../algorithms/maze_algs/random_prims'
import wilson from '../algorithms/maze_algs/wilson'
import {create_grid} from './helpers'
import { Node, nodeType } from '../algorithms/path_algs/types'

/****************************** CSS imports ******************************/
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './cell/cell.css'
import './maze_grid.css'

var assert = require('assert')

const row_count = global.rc // TODO: allow for user to input these values
const col_count = global.cc

let start_i = 15
let start_j = 20

let end_i = 15
let end_j = 30

// TODO: Find a better way of solving this problem:
// Currently, I need to do this because when a cell is rendered after a click, it might replace a wall with a clean block
let prev_start_i = 15
let prev_start_j = 20
let prev_end_i = 15
let prev_end_j = 30

// for now, create walls that are hard coded and then color them in
let walls: number[][] = []

// TODO: After fixing all the errors, move the functions around so that they make more sense

interface pathfinderState {
	start_end: number,
	animating: boolean
}

// TODO: Go through the code and find the places that I need to replace number with Node 

// Maybe there should instead be a grid state that maps the Cells 
// animation triggers a check on this grid
// the grid state is built using the Node 
// When the graph functions return or the maze functions return, this grid is updated; this update automatically causes the rerendering, 
// this also solves the onclick crap 

export default class pathfinder extends React.Component<{}, pathfinderState> {
	
	// Not sure what this should actually be, any or what???
	constructor(props: any) {
		super(props);
		this.state = {
			start_end: 0, // keeps track of start (0) or end (1)
			animating: false,
		};
		this.handleSearch = this.handleSearch.bind(this);
		this.reset = this.reset.bind(this);
		this.startEnd = this.startEnd.bind(this)
		this.createWall = this.createWall.bind(this)
		
		this.make_maze = this.make_maze.bind(this)
		this.dark_maze = this.dark_maze.bind(this)
	}

	/************************** General Use Methods **************************/
	// create a cell
	// probably dont need this
	create_cell () {
		const cell = {
			type: "",
			weight: 1
		}
		return cell
	}

	/***************************** Resizing Window *****************************/

	/************************* Pathfinding Methods *************************/
	// runs bfs and returns the nodes visited path and backtrack path
	// the pathfinding methods should probably exist separately? 

	// keeps the walls; resets the path colors
	// TODO: this does not keep the walls; this resets everything
	reset_paths() {
		for (let i = 0; i < row_count; i++) {
			for (let j = 0; j < col_count; j++) {
				let id = 'cell-' + i + '-' + j;
				if (document.getElementById(id)!.className === 'cell cell-visited' || 
				document.getElementById(id)!.className === 'cell cell-backtrack') {
					document.getElementById(id)!.className = 'cell '
				}
			}
		}
	}

	// backtrack animation
	animate_backtrack(path: number[][]) {
		for (let i = 0; i < path.length; i++) {
			let x = path[i][0]
			let y = path[i][1]
			if (x === start_i && y === start_j) {
				continue
			}
			if (x === end_i && y === end_j) {
				continue
			}
			const str = 'cell-' + x + '-' + y
			setTimeout(() => {
				document.getElementById(str)!.className = 'cell cell-backtrack'
			},50 * i);
		}
	}

	// pathfinding animation
	// TODO: Next thing to fix
	// basically this is bad design. I should instead be manipulating the state of the grid? 
	// Not sure how it should work, but I should be setting the state of the cell instead of doing this getElementbyId shit. This is the current component that I have. I want to change the state of the cell component. So, I should set the state of the cell component to the animating state. The cell component checks to see if the state is animating. If it is animating, then I change the className in the react Component. This automatically causes the re-rendering to happen? 

	// Idea: so instead of animate_pathfind, set the state of the Cell component to something else 
	// After setting the state to something else, the cell individually re renders. It now changes to a different color
	// After figuring this out, I can try to figure out the setTimeOut animation shit, which should probably happen in the Cell component
	// How to set the state of multiple components at once? 

	// Another todo is probably to code from a different branch
	animate_pathfind(path: number[][]) {
		// length is path - 1 because the last element of the input is the array for backtrack steps
		for (let i = 0; i < path.length - 1; i++) {
			let x = path[i][0]
			let y = path[i][1]
			let str: (string) = ""
			str = 'cell-' + x + '-' + y

			// is finding by className really the right way to do this? 
			if (document.getElementById(str)?.className === 'cell cell-start') {
				continue
			}
			if (document.getElementById(str)?.className === 'cell cell-finish') {
				continue
			}
			if (str != null) {
				setTimeout(() => {
					document.getElementById(str)!.className = 'cell cell-visited'
				},10 * i)
			}
		}
		return 10 * path.length

	}

	handleSearch(start_i: number, start_j: number, end_i: number, end_j: number, walls: number[][], algorithm: string) {

		// TODO: Need to modify this
		let tempWalls: string[] = []
		for (let i = 0; i < walls.length; i++) {
			tempWalls.push(walls[i].toString())
		}
		let walls_unique: string[] = Array.from(new Set(tempWalls));
		// run bfs
		let ret: any[][] = [];

		let startNode: Node = {
			row: start_i,
			col: start_j,
			type: nodeType.UNVISITED
		}

		let endNode: Node = {
			row: end_i, 
			col: end_j,
			type: nodeType.UNVISITED
		}

		switch (algorithm) {
			case "bfs":
				ret = Bfs(startNode, endNode, walls_unique)
				break
			case "dfs":
				// ret = Dfs(startNode, endNode, walls_unique)
				ret = Dfs(start_i, start_j, end_i, end_j, walls_unique)
				break
			case "greedy":
				ret = greedy(start_i, start_j, end_i, end_j, walls_unique)
				break
			case "astar":
				ret = astar(start_i, start_j, end_i, end_j, walls_unique)
				break
			case "dijkstra":
				ret = dijkstra(start_i, start_j, end_i, end_j, walls_unique)
				break

		}
		this.reset_paths() // why is it doing this?? if the graph has already been modified, then reset it basically. seems a bit extraneous which is bad? But not necessary to get rid of it 

		this.setState({animating: true}) // this will always rerender 
		// if this is causing a rerender, then the cell type should be changed
		// when do I setState animating to false again? 

		// TODO: This must be replaced. I should not be animating using document.elementbyid stuff; call set state instead. 
		let wait_time: number = this.animate_pathfind(ret) // this should instead animate differently based on type BACKTRACK vs type VISITED
		// TODO: Need to change this definitely 
		if (ret[ret.length-1][0][0] != undefined) {
			setTimeout(() => {
				this.animate_backtrack(ret[ ret.length - 1])
			}, wait_time)
		}
	}

	// clears the entire grid
	reset() {
		walls = []
		for (let i = 0; i < row_count; i++) {
			for (let j = 0; j < col_count; j++) {
				let id = 'cell-' + i + '-' + j;
				document.getElementById(id)!.className = 'cell '
			}
		}
	}

	/************************* Animation Methods *************************/

	animate_maze() {
		for (let i = 0; i < walls.length; i++) {
			const str = 'cell-' + walls[i][0] + '-' + walls[i][1]
			setTimeout(() => {
				document.getElementById(str)!.className = 'cell cell-wall'
			},5 * i);
		}
	}

	// converts the color of cells in the maze to white
	dark_animate_maze(maze: number[][]) {
		for (let i = 0; i < maze.length; i++) {
			const str = 'cell-' + maze[i][0] + '-' + maze[i][1]
			setTimeout(() => {
				document.getElementById(str)!.className = 'cell '
			},5 * i);
		}
	}

	/****************************** Generate Walls *************************/

	createWall(event: KeyboardEvent) {
		if (event.shiftKey) {
			const id = (event.currentTarget as HTMLElement).id // row and col are not returned for this
			document.getElementById(id)!.className = 'cell cell-wall'
			let a: number = Number(id.split("-")[1])
			let b: number = Number(id.split("-")[2])
			walls.push([a,b])
		} 
	}

	async make_maze() {
		await this.reset()
		walls = random_maze()
		this.animate_maze()
	}

	async dark_maze(maze_type: string) {
		await this.reset()
		let out;
		this.darken()
		switch(maze_type) {
			case "kruskal":
				out = random_kruskal()
				break
			case "prim":
				out = random_prims() // this returned an object, walls ends up being a number[][] type
				break
			case "wilson":
				out = wilson()
				break
		}
		if (out != undefined) {
			walls = out.walls // I think I was mixing types
			this.dark_animate_maze(out.maze)
		}
	}


	/****************************** Mouse Click Methods *************************/

	// TODO: this looks way too complicated
	startEnd(event: MouseEvent) {
		// TODO: disallow clicking of walls
		const id = (event.currentTarget as HTMLElement).id // row and col are not returned for this
		let r: number = Number(document.getElementById(id)!.getAttribute("row"))
		let c: number = Number(document.getElementById(id)!.getAttribute("col"))

		// what is this doing? 
		if (this.state.start_end === 0) {
			// reset the start colors
			if (document.getElementById('cell-' + start_i + '-' + start_j)!.className !== 'cell cell-wall') {
				document.getElementById('cell-' + start_i + '-' + start_j)!.className = 'cell '
				prev_start_i = r
				prev_start_j = c
			} else {
				prev_start_i = start_i
				prev_start_j = start_j
			}
			document.getElementById(id)!.className = 'cell cell-start'
			this.setState({
				start_end: 1
			})
			start_i = r
			start_j = c
		} else {
			if (document.getElementById('cell-' + end_i + '-' + end_j)!.className !== 'cell cell-wall') {
				document.getElementById('cell-' + end_i + '-' + end_j)!.className = 'cell '
				prev_end_i = r
				prev_end_j = c
			} else {
				prev_end_i = end_i
				prev_end_j = end_j
			}
			document.getElementById(id)!.className = 'cell cell-finish'
			this.setState({
				start_end: 0
			})
			end_i = r
			end_j = c
		}
		
	}

	// darkens the entire grid
	darken() {
		for (let i = 0; i < row_count; i++) {
			for (let j = 0; j < col_count; j++) {
				let id = 'cell-' + i + '-' + j;
				document.getElementById(id)!.className = 'cell cell-wall'
			}
		}
	}

	/****************************** Rendering *************************/
	render() {
		// setup for grid
		let grid: any = create_grid()
		let maze_list: string[] = ["kruskal", "prim", "wilson"]
		let alg_list: string[] = ["bfs", "dfs", "greedy", "astar", "dijkstra"]
		return (
			<div className="pathfinder">
				<div className="grid" > 
					{grid.map((row: number[], row_index: number) => {
						return (
							<div className="row">
							{row.map((col, col_index) => {
								const cell = this.create_cell()
								let {type, weight} = cell
								if (row_index === start_i && col_index === start_j) {
									type = 'cell-start'
								} else if (row_index === end_i && col_index === end_j) {
									type = 'cell-finish'
								} else if (row_index === prev_start_i && col_index === prev_start_j || row_index === prev_end_i && col_index === prev_end_j) {
									type = 'cell-wall'
								}
								return (<Cell element_id={'cell-' + row_index + '-' + col_index}
								type = {type} weight = {weight} row = {row_index} col = {col_index} 
								onMouseMove={this.createWall} 
								onClick={this.startEnd} />)

							})}
							
							</div>
						)
					})}
				</div>
				<div>
				</div>
{/************************************ Buttons below *******************************/}
				<div className="container">
{/************************************ Algorithm Button *******************************/}
{/* Should I have a separate interface for the button and button functionality?  */}
					<div>
						<div className="dropdown" >
							<button className="algorithms-button" type="button" data-toggle="dropdown">
								Select Algorithm
							</button>
							<div className="dropdown-menu">
								{alg_list.map((alg) => {
									return (
										<div>
											<a className="algorithms-menu" onClick = {
												()=> {this.handleSearch(
												start_i,
												start_j,
												end_i,
												end_j,
												walls,
												alg)}
											}>
												Visualize {alg}
											</a>
											<div className="dropdown-divider"></div>
										</div>
										
									)
								})}
							</div>
						</div>
					</div>
{/************************************ Reset Button *******************************/}
					<div>
						<button type="button" className="btn-xlarge" id="reset-button"
						onClick={()=>this.reset()}>
							Reset
						</button>
					</div>
{/************************************ Maze Button *******************************/}
					<div>
						<div className="dropdown" >
								<button className="maze-button" type="button" data-toggle="dropdown">
									Select Maze
								</button>
								<div className="dropdown-menu">
									<div>
										<a className="maze-menu" onClick = {this.make_maze}>
											general maze
										</a>
										<div className="dropdown-divider"></div>
									</div>
									{maze_list.map((maze) => {
										return (
											<div>
												<a className="maze-menu" onClick = {()=>this.dark_maze(maze)}>
													{maze} maze
												</a>
												<div className="dropdown-divider"></div>
											</div>
											
										)
									})}
								</div>
							</div>
					</div>
				</div>
			</div>
		);
	}
}