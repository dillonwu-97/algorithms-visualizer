
import React, {ReactElement, MouseEvent} from 'react';
import Cell from './cell/cell'
import Bfs from '../path_algs/bfs'
import Dfs from '../path_algs/dfs'
import greedy from '../path_algs/greedy'
import astar from '../path_algs/astar'
import dijkstra from '../path_algs/dijkstra'
import random_maze from '../maze_algs/random_maze'
import random_kruskal from '../maze_algs/random_kruskal'
import random_prims from '../maze_algs/random_prims'
import wilson from '../maze_algs/wilson'
import {create_grid} from '../helpers'
import { Node, nodeType, pathRet } from '../types'
import {allWalls, initNodeGraph, initNode, resetNodeGraph, deepCopyGraph} from '../helpers'

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
	end: [number, number],
	grid: Node[][], // grid is ground truth 
}

// TODO: Go through the code and find the places that I need to replace number with Node 
// maybe the node has a value called transition delay, so just return the grid instead of the order
// then, when rendering, the transition delay is passed as a prop to the cell
// also, in order to do both visited and backtrack, maybe i can handle it by returning two different arrays. first, do the transition delay for the visited graph, and do a settimeout that equals the size of the visited array. afterwards, do another transition delay for the backtracking that is done 
// this means that I should be returning an object containing an array of visited nodes, and an array of backtracking nodes 

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
	}

	/************************* Pathfinding Methods *************************/

	updateGrid = async (newGraph: Node[][], delay: number) => {
		return new Promise<void>(resolve =>
		  setTimeout(() => {
				this.setState({
					  grid: newGraph
				}, resolve);
			  }, delay)
		)
	}

	// updateAll = async (updateOrder: Node[]) => {
	// 	for (let i = 0; i < updateOrder.length; i++) {
	// 		let tempGrid: Node[][] = [...this.state.grid];
	// 		tempGrid[updateOrder[i].row][updateOrder[i].col] = updateOrder[i];
	// 		await this.updateGrid([...tempGrid]);
	// 	}
	// }

	resetGrid = async() => {
		return 
	}

	async handleSearch(algorithm: string) {

		console.log("Handling search")

		// TODO: Interestingly, the first method doesn't work but the second does. Why not, and what are the benefits / detractions from both methods? 
		// this.setState(prevState => ({
		// 	grid: resetNodeGraph(prevState.grid)
		// }))
		this.setState({
			grid: resetNodeGraph(this.state.grid)
		})

		let path: pathRet = {
			vNodes: [],
			bNodes: []
		};

		switch (algorithm) {
			case "bfs":
				path = Bfs(this.state.start, this.state.end, this.state.grid)
				break
			case "dfs":
				path = Dfs(this.state.start, this.state.end, this.state.grid)
				break;
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

		let vNodes: Node[] = path.vNodes;
		let bNodes: Node[] = path.bNodes;
		let vGrid: Node[][] = deepCopyGraph(this.state.grid);

		for (let i = 0; i < vNodes.length; i++) {
			vNodes[i].tdelay = i * 10;
			vGrid[vNodes[i].row][vNodes[i].col] = vNodes[i];
		}
		  
		await this.updateGrid(vGrid, 0);

		let bGrid: Node[][] = deepCopyGraph(this.state.grid);
		for (let i = 0; i < bNodes.length; i++) {
			bNodes[i].tdelay = i * 10;
			bGrid[bNodes[i].row][bNodes[i].col] = bNodes[i];
		}
		await this.updateGrid(bGrid, 10 * vNodes.length);
		
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

		// TODO: why does prevState cause different behavior? When using prevState, the animation will continue instead of halting
		this.setState({
			grid: initNodeGraph(30,50)
		})

		let maze : Node[] = [];
		switch(maze_type) {
			case "kruskal":
				maze = random_kruskal()
				break
			case "prim":
				maze = random_prims() // this returned an object, walls ends up being a number[][] type
				break
			case "wilson":
				maze = wilson(30, 50);
				break
		}

		console.log(maze);

		await this.updateGrid(allWalls(30,50), 0);
		let mGrid: Node[][] = deepCopyGraph(this.state.grid);

		// Note: need to do this in reverse because there are repeats in the maze array
		for (let i = maze.length -1; i >= 0; i--) {
			mGrid[maze[i].row][maze[i].col] = maze[i];
		}

		await this.updateGrid(mGrid, 0)

		this.setState(prevState => {
			prevState.grid[maze[0].row][maze[0].col].type = nodeType.START;
			prevState.grid[maze[maze.length-1].row][maze[maze.length-1].col].type = nodeType.END;
			return {
				start: [maze[0].row, maze[0].col],
				end: [maze[maze.length-1].row, maze[maze.length-1].col],
				grid: prevState.grid
			}
		})
	}

	/****************************** Mouse Click Methods *************************/

	// TODO: this looks way too complicated
	startEnd(event: MouseEvent) {
		let newGrid: Node[][] = this.state.grid;
		let r: number = Number(event.currentTarget.getAttribute('data-row'))
		let c: number = Number(event.currentTarget.getAttribute('data-col'))
		let newStart: [number, number] = this.state.start;
		let newEnd: [number, number] = this.state.end;
		if (this.state.grid[r][c].type !== nodeType.WALL) {
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
									<Cell element_id={'cell-' + row_index + '-' + col_index} type = {cell.type} row = {row_index} col = {col_index} tdelay={cell.tdelay} onClick = {this.startEnd} />
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