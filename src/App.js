import React from 'react';
import Make_grid from './pathfinder/setup/make_grid'
import MyNavbar from './MyNavbar'
import './App.css'
import Sudoku_grid from './sudoku/sudoku_grid'
import { HashRouter, Route, Link, Switch } from "react-router-dom";



function App() {
	return (
		<div>
			{/* <MyNavbar/>
			<HashRouter>
				<Switch>
					<Route exact path='/pathfinder' component = {Pathfinder}/>
					<Route exact path='/sudoku' component={Sudoku}/>
				</Switch>
			</HashRouter> */}
		</div>
	);
}
// function Panel({ title, subtitle, doSomething }) {
// 	return (
// 	<div className="panel">
// 	  <h2 className="panel__title">{title}</h2>
// 	  <img src="some/url"/>
// 	   <div panel__content>
// 		<h3 className="panel__subtitle">{subtitle}</h3>
// 	   </div>
// 		<button class="action-button" onClick={doSomething}>Click me</button>
// 	 </div>
//    );
//   } 
  
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
