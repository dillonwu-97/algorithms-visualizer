
import React, {Component} from 'react';
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

/****************************** CSS imports ******************************/
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './cell/cell.css'
import './make_grid.css'

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

	/***************************** Resizing Window *****************************/

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
				ret = Bfs(start_i, start_j, end_i, end_j, walls_unique)
				break
			case "dfs":
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
		this.reset_paths()
		let wait_time = this.animate_pathfind(ret)
		if (ret[ret.length-1][0][0] != undefined) {
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
			if (document.getElementById(str).className === 'cell cell-start') {
				continue
			}
			if (document.getElementById(str).className === 'cell cell-finish') {
				continue
			}
		
			setTimeout(() => {
				document.getElementById(str).className = 'cell cell-visited'
			},10 * i)
		}
		return 10 * path.length

	}

	// backtrack animation
	animate_backtrack(path) {
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

	// converts the color of cells in the maze to white
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
			document.getElementById(id).className = 'cell cell-wall'
			let a = id.split("-")[1]
			let b = id.split("-")[2]
			walls.push([a,b])
		} 
	}

	async make_maze() {
		await this.reset()
		walls = random_maze()
		this.animate_maze()
	}

	async dark_maze(maze_type) {
		await this.reset()
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
		if (this.state.start_end === 0) {
			// reset the start colors
			if (document.getElementById('cell-' + start_i + '-' + start_j).className !== 'cell cell-wall') {
				document.getElementById('cell-' + start_i + '-' + start_j).className = 'cell '
				prev_start_i = r
				prev_start_j = c
			} else {
				prev_start_i = start_i
				prev_start_j = start_j
			}
			document.getElementById(id).className = 'cell cell-start'
			this.setState({
				start_end: 1
			})
			start_i = r
			start_j = c
		} else {
			if (document.getElementById('cell-' + end_i + '-' + end_j).className !== 'cell cell-wall') {
				document.getElementById('cell-' + end_i + '-' + end_j).className = 'cell '
				prev_end_i = r
				prev_end_j = c
			} else {
				prev_end_i = end_i
				prev_end_j = end_j
			}
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
		walls = []
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
				if (document.getElementById(id).className === 'cell cell-visited' || 
				document.getElementById(id).className === 'cell cell-backtrack') {
					document.getElementById(id).className = 'cell '
				}
			}
		}
	}

	/****************************** Rendering *************************/

	render() {
		// setup for grid
		let grid = create_grid()
		let maze_list = ["kruskal", "prim", "wilson"]
		let alg_list = ["bfs", "dfs", "greedy", "astar", "dijkstra"]
		return (
			<div className="pathfinder">
				<div className = "grid" > 
					{grid.map((row, row_index) => {
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
				<div class="container">
{/************************************ Algorithm Button *******************************/}
					<div>
						<div class="dropdown" >
							<button class="btn btn-secondary dropdown-toggle" className="algorithms-button" type="button" data-toggle="dropdown">
								Select Algorithm
							</button>
							<div class="dropdown-menu">
								{alg_list.map((alg) => {
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
{/************************************ Reset Button *******************************/}
					<div>
						<button type="button" class="btn btn-outline-secondary" className="btn-xlarge" id="reset-button"
						onClick={()=>this.reset()}>
							Reset
						</button>
					</div>
{/************************************ Maze Button *******************************/}
					<div>
						<div class="dropdown" >
								<button class="btn btn-secondary dropdown-toggle" className="maze-button" type="button" data-toggle="dropdown">
									Select Maze
								</button>
								<div class="dropdown-menu">
									<div>
										<a class="dropdown-item" className="maze-menu" onClick = {this.make_maze}>
											general maze
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
		)
	}
}