import React from 'react';
import Make_grid from './pathfinder/setup/make_grid'
import MyNavbar from './MyNavbar'
import './App.css'
import Sudoku_grid from './sudoku/sudoku_grid'
import { BrowserRouter, Route, Link, Switch, HashRouter } from "react-router-dom";

import pathfinderGif from './images/pathfinder_1.gif'
import './images/images.css'

function App() {
	return (
		<div>
			{/* <MyNavbar/> */}
			{/* Currently making this look prettier but  */}
			{/* paths are https://dillonwu-97.github.io/algorithms-visualizer/#/pathfinder */}
			{/* https://dillonwu-97.github.io/algorithms-visualizer/#/sudoku */}
			<HashRouter>
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route exact path='/pathfinder' component = {Pathfinder}/>
					<Route exact path='/sudoku' component={Sudoku}/>
				</Switch>
			</HashRouter>
		</div>
	);
}

function Home() {
	return (
		<div>
			<Link to={'/pathfinder'}>
				<div className="pathfinder-gif">
					<img class = "thumbnail" src={pathfinderGif} alt="" height="190px" width="250px"/>
					Click me!
				</div>
			</Link>
		</div>
	)
}
  
function Pathfinder() {
	return (
		<div className = "app-main">
			<h1> </h1>
			<h1> </h1>
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

export default App;
