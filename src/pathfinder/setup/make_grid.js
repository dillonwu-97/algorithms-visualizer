
import React, {Component} from 'react';
import Cell from './cell/cell'
import './make_grid.css'
import Bfs from '../algorithms/path_algs/bfs'
import Dfs from '../algorithms/path_algs/dfs'
import greedy from '../algorithms/path_algs/greedy'
import astar from '../algorithms/path_algs/astar'
import dijkstra from '../algorithms/path_algs/dijkstra'
import './cell/cell.css'
import random_maze from '../algorithms/maze_algs/random_maze'
import random_kruskal from '../algorithms/maze_algs/random_kruskal'
import random_prims from '../algorithms/maze_algs/random_prims'
import wilson from '../algorithms/maze_algs/wilson'
import './global'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';



const row_count = global.rc // TODO: allow for user to input these values
const col_count = global.cc

let start_i = 15
let start_j = 20

let end_i = 15
let end_j = 30

// for now, create walls that are hard coded and then color them in
let walls = []


export default class make_grid extends Component {
	
	constructor(props) {
		super()
		this.state = {
			start_end: 0 // keeps track of start (0) or end (1)
		}
		this.handleSearch = this.handleSearch.bind(this)
		this.startEnd = this.startEnd.bind(this)
		this.createWall = this.createWall.bind(this)
		this.reset = this.reset.bind(this)
		this.make_maze = this.make_maze.bind(this)
		this.dark_maze = this.dark_maze.bind(this)
	}

	/************************** General Use Methods **************************/
	// create a cell
	create_cell () {
		const cell = {
			type: "",
			weight: 1
		}
		return cell
	}

	/************************* Pathfinding Methods *************************/
	// runs bfs and returns the nodes visited path and backtrack path

	handleSearch(start_i, start_j, end_i, end_j, walls, algorithm) {
		for (let i = 0; i < walls.length; i++) {
			walls[i] = walls[i].toString()
		}
		let walls_unique = Array.from(new Set(walls));
		// run bfs
		let ret;
		switch (algorithm) {
			case "bfs":
				// console.log(start_i, " ", start_j)
				ret = Bfs(start_i, start_j, end_i, end_j, walls_unique)
				break
			case "dfs":
				// console.log("dfs switch case")
				ret = Dfs(start_i, start_j, end_i, end_j, walls_unique)
				break
			case "greedy":
				// console.log("greedy")
				ret = greedy(start_i, start_j, end_i, end_j, walls_unique)
				break
			case "astar":
				ret = astar(start_i, start_j, end_i, end_j, walls_unique)
				break
			case "dijkstra":
				ret = dijkstra(start_i, start_j, end_i, end_j, walls_unique)
				break

		}
		this.reset_paths()
		let wait_time = this.animate_pathfind(ret)
		// console.log(wait_time)
		if (ret[ret.length-1][0][0] != undefined) {
			// console.log(algorithm, " ", ret[ret.length-1].length)
			setTimeout(() => {
				this.animate_backtrack(ret[ ret.length - 1])
			}, wait_time)
		}
	}

	/************************* Animation Methods *************************/
	// pathfinding animation
	animate_pathfind(path) {
		// length is path - 1 because the last element of the input is the array for backtrack steps
		for (let i = 0; i < path.length - 1; i++) {
			let x = path[i][0]
			let y = path[i][1]
			const str = 'cell-' + x + '-' + y
			if (document.getElementById(str).className == 'cell cell-start') {
			// if (x == start_i && y == start_j) {
				// document.getElementById(str).className = 'cell cell-start'
				continue
			}
			if (document.getElementById(str).className == 'cell cell-finish') {
			// if (x == end_i && y == end_j) {
				// document.getElementById(str).className = 'cell cell-finish'
				continue
			}
			
			// if (x == 15 && y == 20 || x == 15 && y==30) {
			// 	console.log("debugging ", document.getElementById(str).className)
			// }
			// if (document.getElementById(str).className== 'cell ') {
				// for some reason, having a console.log makes the color change, but not having this doesnt
				// if (x == 15 && y == 20 || x == 15 && y==30) {
				// 	console.log("debugging ", document.getElementById(str).className, " ", x, " ", y)
				// }
			setTimeout(() => {
				document.getElementById(str).className = 'cell cell-visited'
				// this.animate_backtrack(path[ path.length - 1])
			},10 * i)
			// }
		}
		return 10 * path.length

	}

	// backtrack animation
	animate_backtrack(path) {
		for (let i = 0; i < path.length; i++) {
			let x = path[i][0]
			let y = path[i][1]
			if (x == start_i && y == start_j) {
				continue
			}
			if (x == end_i && y == end_j) {
				continue
			}
			// console.log(x, y)
			const str = 'cell-' + x + '-' + y
			setTimeout(() => {
				document.getElementById(str).className = 'cell cell-backtrack'
			},50 * i);
		}
	}

	animate_maze() {
		for (let i = 0; i < walls.length; i++) {
			const str = 'cell-' + walls[i][0] + '-' + walls[i][1]
			setTimeout(() => {
				document.getElementById(str).className = 'cell cell-wall'
			},5 * i);
		}
	}

	dark_animate_maze(maze) {
		for (let i = 0; i < maze.length; i++) {
			const str = 'cell-' + maze[i][0] + '-' + maze[i][1]
			setTimeout(() => {
				document.getElementById(str).className = 'cell '
			},5 * i);
		}
	}

	/****************************** Generate Walls *************************/

	createWall(event) {
		if (event.shiftKey) {
			const {id} = event.currentTarget // row and col are not returned for this
			let r = parseInt(document.getElementById(id).getAttribute("row"))
			let c = parseInt(document.getElementById(id).getAttribute("col"))
			document.getElementById(id).className = 'cell cell-wall'
			let a = id.split("-")[1]
			let b = id.split("-")[2]
			// console.log(a,b)
			walls.push([a,b])
		} 
	}

	make_maze() {
		this.reset()
		walls = random_maze()
		this.animate_maze()
	}

	dark_maze(maze_type) {
		let out;
		this.darken()
		switch(maze_type) {
			case "kruskal":
				out = random_kruskal()
				break
			case "prim":
				out = random_prims()
				break
			case "wilson":
				out = wilson()
				break
		}
		walls = out.walls
		this.dark_animate_maze(out.maze)
	}


	/****************************** Mouse Click Methods *************************/
	startEnd(event) {
		// TODO;
		// disallow clicking of walls
		const {id} = event.currentTarget // row and col are not returned for this
		let r = parseInt(document.getElementById(id).getAttribute("row"))
		let c = parseInt(document.getElementById(id).getAttribute("col"))
		if (this.state.start_end == 0) {
			// reset the start colors
			document.getElementById('cell-' + start_i + '-' + start_j).className = 'cell '
			document.getElementById(id).className = 'cell cell-start'
			this.setState({
				start_end: 1
			})
			start_i = r
			start_j = c
		} else {
			document.getElementById('cell-' + end_i + '-' + end_j).className = 'cell '
			document.getElementById(id).className = 'cell cell-finish'
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
				document.getElementById(id).className = 'cell cell-wall'
			}
		}
	}

	// clears the entire grid
	reset() {
		for (let i = 0; i < row_count; i++) {
			for (let j = 0; j < col_count; j++) {
				let id = 'cell-' + i + '-' + j;
				document.getElementById(id).className = 'cell '
			}
		}
	}

	// keeps the walls; resets the path colors
	reset_paths() {
		for (let i = 0; i < row_count; i++) {
			for (let j = 0; j < col_count; j++) {
				let id = 'cell-' + i + '-' + j;
				if (document.getElementById(id).className == 'cell cell-visited' || 
				document.getElementById(id).className == 'cell cell-backtrack') {
					document.getElementById(id).className = 'cell '
				}
			}
		}
	}

	/****************************** Rendering *************************/
	render() {
		// setup for grid
		let grid = []
		for (let i = 0; i < row_count; i++) {
			let temp = []
			for (let j = 0; j < col_count; j++) {
				temp.push(0)
			}
			grid.push(temp)
		}
		let maze_list = ["kruskal", "prim", "wilson"]
		let alg_list = ["bfs", "dfs", "greedy", "astar", "dijkstra"]
		return (
			<div className="parent">
				<div className = "grid" > 

					{grid.map((row, row_index) => {
						return (
							<div className="row">
							{row.map((col, col_index) => {
								const cell = this.create_cell()
								let {type, weight} = cell
								if (row_index == start_i && col_index == start_j) {
									type = 'cell-start'
								} else if (row_index == end_i && col_index == end_j) {
									type = 'cell-finish'
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
					" "
				</div>
				<div class="container">
					<div id="pathfinder-dropdown" class="row text-center">
						<div class="col-4">
							<div class="dropdown" >
								<button class="btn btn-secondary dropdown-toggle" className="algorithms-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									Select Algorithm
								</button>
								<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
									{alg_list.map((alg) => {
									// console.log(typeof(alg))
										return (
											<div>
												<a class="dropdown-item" className="algorithms-menu" onClick = {()=>this.handleSearch(
													start_i,
													start_j,
													end_i,
													end_j,
													walls,
													alg)}>
													Visualize {alg}
												</a>
												<div class="dropdown-divider"></div>
											</div>
											
										)
									})}
								</div>
							</div>
						</div>
						<div class="col-4">
							<button type="button" class="btn btn-outline-secondary" className="btn-xlarge" id="reset button"
							onClick={()=>this.reset()}>
								Reset
							</button>
						</div>
						
						<div class="col-4">
							<div class="dropdown" >
									<button class="btn btn-secondary dropdown-toggle" className="maze-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Select Maze
									</button>
									<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
										<div>
											<a class="dropdown-item" className="maze-menu" onClick = {this.make_maze}>
												General Maze
											</a>
											<div class="dropdown-divider"></div>
										</div>
										{maze_list.map((maze) => {
											return (
												<div>
													<a class="dropdown-item" className="maze-menu" onClick = {()=>this.dark_maze(maze)}>
														{maze} maze
													</a>
													<div class="dropdown-divider"></div>
												</div>
												
											)
										})}
									</div>
								</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}