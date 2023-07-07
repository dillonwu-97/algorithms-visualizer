
import React, {ReactElement, MouseEvent} from 'react';
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
import {initNodeGraph, initNode, resetNodeGraph, deepCopyGraph} from '../algorithms/helpers'

/****************************** CSS imports ******************************/
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './cell/cell.css'
import './maze_grid.css'

// TODO: After fixing all the errors, move the functions around so that they make more sense

let walls:number[][] = []

interface PathfinderState {
	startFlag: boolean,
	start: [number, number],
	end: [number, number]
	grid: Node[][], // grid is ground truth 
	animating: boolean
}

// TODO: Go through the code and find the places that I need to replace number with Node 

export default class pathfinder extends React.Component<{}, PathfinderState> {
	
	// Not sure what this should actually be, any or what???
	constructor(props: any) {
		super(props);

		// TODO: Find a better way to manage the start end location issues
		let grid: Node[][] = initNodeGraph(30,50);
		grid[15][20].type = nodeType.START;
		grid[15][30].type = nodeType.END;
		this.state = {
			startFlag: true,
			start: [15, 20],
			end: [15, 30],
			animating: false,
			grid: grid
		};
		this.handleSearch = this.handleSearch.bind(this);
		this.startEnd = this.startEnd.bind(this)
		this.createWall = this.createWall.bind(this)
		
		this.make_maze = this.make_maze.bind(this)
		this.dark_maze = this.dark_maze.bind(this)
	}

	/************************* Pathfinding Methods *************************/

	handleSearch(algorithm: string) {

		let updateOrder: Node[] = [];
		switch (algorithm) {
			case "bfs":
				updateOrder = Bfs(this.state.start, this.state.end, this.state.grid)
				break
			// case "dfs":
			// 	// ret = Dfs(startNode, endNode, walls_unique)
			// 	ret = Dfs(start_i, start_j, end_i, end_j, walls_unique)
			// 	break
			// case "greedy":
			// 	ret = greedy(start_i, start_j, end_i, end_j, walls_unique)
			// 	break
			// case "astar":
			// 	ret = astar(start_i, start_j, end_i, end_j, walls_unique)
			// 	break
			// case "dijkstra":
			// 	ret = dijkstra(start_i, start_j, end_i, end_j, walls_unique)
			// 	break
		}
		
		let updateGrid = async (newGraph: Node[][]) => {
			return new Promise<void>(resolve =>
			  setTimeout(() => {
					this.setState({
				  		grid: newGraph
					}, resolve);
			  	}, 2)
			)
		}
		  
		let updateAll = async (updateOrder: Node[]) => {
			for (let i = 0; i < updateOrder.length; i++) {
				let tempGrid: Node[][] = [...this.state.grid];
				tempGrid[updateOrder[i].row][updateOrder[i].col] = updateOrder[i];
				// console.log(tempGrid)
				await updateGrid([...tempGrid]);
			}
		}
		  
		updateAll(updateOrder);
		
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
		walls = random_maze()
		this.animate_maze()
	}

	async dark_maze(maze_type: string) {
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
		let newGrid: Node[][] = this.state.grid;
		let r: number = Number(event.currentTarget.getAttribute('data-row'))
		let c: number = Number(event.currentTarget.getAttribute('data-col'))
		let newStart: [number, number] = this.state.start;
		let newEnd: [number, number] = this.state.end;
		if (this.state.startFlag === true) {
			newGrid[this.state.start[0]][this.state.start[1]].type = nodeType.UNVISITED;
			newStart = [r,c];
			newGrid[r][c].type = nodeType.START;
		} else {
			newEnd = [r,c];
			newGrid[this.state.end[0]][this.state.end[1]].type = nodeType.UNVISITED;
			newGrid[r][c].type = nodeType.END;
		}

		for (let i = 0; i < newGrid.length; i++) {
			for (let j = 0; j < newGrid[0].length; j++) {
				if (newGrid[i][j].type === nodeType.VISITED || newGrid[i][j].type === nodeType.BACKTRACK) {
					newGrid[i][j].type = nodeType.UNVISITED;
				}
			}
		}
		
		this.setState({
			start: newStart,
			end: newEnd,
			grid: newGrid,
			startFlag: !this.state.startFlag
		})
		
	}

	// darkens the entire grid
	darken() {
		for (let i = 0; i < 30; i++) {
			for (let j = 0; j < 50; j++) {
				let id = 'cell-' + i + '-' + j;
				document.getElementById(id)!.className = 'cell cell-wall'
			}
		}
	}

	/****************************** Rendering *************************/
	render() {
		// setup for grid
		let maze_list: string[] = ["kruskal", "prim", "wilson"]
		let alg_list: string[] = ["bfs", "dfs", "greedy", "astar", "dijkstra"]
		console.log("rendering")
		return (
			<div className="pathfinder">
				<div className="grid">
					{
					this.state.grid.map((row:Node[], row_index:number) => {
						return (
							<div className="row">
							{row.map((cell:Node, col_index:number) => {

								// Animation should change based on cell.type
								return (
									<Cell element_id={'cell-' + row_index + '-' + col_index} type = {cell.type} row = {row_index} col = {col_index} onClick = {this.startEnd} />
								)
							})}
							</div>
						)
					})}
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
												()=> {this.handleSearch(alg)}
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
					{/* <div>
						<button type="button" className="btn-xlarge" id="reset-button"
						onClick={()=>this.reset()}>
							Reset
						</button>
					</div> */}
{/************************************ Maze Button *******************************/}
					{/* <div>
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
					</div> */}
				</div>
			</div>
		);
	}
}