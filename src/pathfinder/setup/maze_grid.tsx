
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
// TODO: Maybe instead of doing setstate n number of times, render each cell with some transition delay and color
// so the transition delay value is passed to the cell, and the transition delay should be based on the index of the element in the array, transition delay should be a prop? 

let walls:number[][] = []

interface PathfinderState {
	startFlag: boolean,
	start: [number, number],
	end: [number, number]
	grid: Node[][], // grid is ground truth 
}

// TODO: Go through the code and find the places that I need to replace number with Node 
// maybe the node has a value called transition delay, so just return the grid instead of the order
// then, when rendering, the transition delay is passed as a prop to the cell 

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
			grid: grid
		};
		this.handleSearch = this.handleSearch.bind(this);
		this.startEnd = this.startEnd.bind(this)
		this.createWall = this.createWall.bind(this)
		this.makeMaze = this.makeMaze.bind(this)
		this.updateGrid = this.updateGrid.bind(this)
		this.updateAll = this.updateAll.bind(this)
	}

	/************************* Pathfinding Methods *************************/

	updateGrid = async (newGraph: Node[][]) => {
		return new Promise<void>(resolve =>
		  setTimeout(() => {
				this.setState({
					  grid: newGraph
				}, resolve);
			  }, 0)
		)
	}

	updateAll = async (updateOrder: Node[]) => {
		for (let i = 0; i < updateOrder.length; i++) {
			let tempGrid: Node[][] = [...this.state.grid];
			tempGrid[updateOrder[i].row][updateOrder[i].col] = updateOrder[i];
			await this.updateGrid([...tempGrid]);
		}
	}

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
		  
		this.updateAll(updateOrder);
		
	}

	/************************* Animation Methods *************************/

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

	async makeMaze(maze_type: string) {
		let maze : Node[] = [];
		switch(maze_type) {
			case "kruskal":
				maze = random_kruskal()
				break
			// case "prim":
			// 	out = random_prims() // this returned an object, walls ends up being a number[][] type
			// 	break
			// case "wilson":
			// 	out = wilson()
			// 	break
		}
		// console.log(maze)
		this.updateAll(maze)
		
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
					<div>
						<div className="dropdown" >
								<button className="maze-button" type="button" data-toggle="dropdown">
									Select Maze
								</button>
								<div className="dropdown-menu">
									{maze_list.map((maze) => {
										return (
											<div>
												<a className="maze-menu" onClick = {()=>this.makeMaze(maze)}>
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