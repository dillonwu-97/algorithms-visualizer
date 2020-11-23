import React from 'react';
import { BrowserRouter, Route, Link, Switch, HashRouter } from "react-router-dom";
import './App.css'
import './images/images.css'

// Pathfinder
import Make_grid from './pathfinder/setup/make_grid'
import pathfinderGif from './images/pathfinder-slow1.gif'

// Sudoku
import Sudoku_grid from './sudoku/sudoku_grid'
import sudokuGif from './images/sudoku-slow.gif'
import Sorting_grid from './sorting/sorting_grid';

function App() {
	return (
		<div>
			<HashRouter>
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route exact path='/pathfinder' component = {Pathfinder}/>
					<Route exact path='/sudoku' component={Sudoku}/>
					<Route exact path='/sorting' component={Sorting}/>
				</Switch>
			</HashRouter>
		</div>
	);
}

function Home() {
	return (
		<div className="algorithm-matrix">
			<div className="algorithm" >
				<Link style={{color: "white"}} to={'/pathfinder'}>
					<img class = "thumbnail" src={pathfinderGif} alt="" />
					<h3> Pathfinding Visualizer </h3>
				</Link>
			</div>
			<div className="algorithm">
				<Link style={{color: "white"}} to={'/sudoku'}>
					<img class = "thumbnail" src={sudokuGif} alt="" />
					<h3> Sudoku Visualizer </h3>
				</Link>
			</div>
			<div className="algorithm">
				<Link style={{color: "white"}} to={'/sorting'}>
					<h3> Sorting Visualizer </h3>
				</Link>
			</div>
			<div className="algorithm">
				NQueens will be here
			</div>
		</div>
	)
}
  
function Pathfinder() {
	return (
		<div className = "app-pathfinder">
			<Make_grid />
		</div>
	)
}

function Sudoku() {
	return (
		<div className = "app-sudoku">
			<Sudoku_grid />	
		</div>
	)
}

function Sorting() {
	return (
		<div className = "app-sorting">
			<Sorting_grid />
		</div>
	)
}

function NQueens() {
	return (
		<div className = "app-queens">
			NQueens visualizer will be here
		</div>
	)
	
}

export default App;
