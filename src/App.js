import React from 'react';
import { BrowserRouter, Route, Link, Switch, HashRouter } from "react-router-dom";
import './App.css'

// Pathfinder
import Make_grid from './pathfinder/setup/make_grid'

// Sudoku
import Sudoku_grid from './sudoku/sudoku_grid'
import Sorting_grid from './sorting/sorting_grid';
import Trees from './trees/sandbox'

function App() {
	return (
		<div>
			<HashRouter>
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route exact path='/pathfinder' component = {Pathfinder}/>
					<Route exact path='/sudoku' component={Sudoku}/>
					<Route exact path='/sorting' component={Sorting}/>
					<Route exact path='/trees' component = {Trees}/>
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
					<h3> Pathfinding Visualizer </h3>
				</Link>
			</div>
			<div className="algorithm">
				<Link style={{color: "white"}} to={'/sudoku'}>
					<h3> Sudoku Visualizer </h3>
				</Link>
			</div>
			<div className="algorithm">
				<Link style={{color: "white"}} to={'/sorting'}>
					<h3> Sorting Visualizer </h3>
				</Link>
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

export default App;
