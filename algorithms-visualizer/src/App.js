import React from 'react';
import Make_grid from './setup/make_grid'
import MyNavbar from './MyNavbar'
import './App.css'
import Sudoku_grid from './sudoku_setup/sudoku_grid'
import { HashRouter, Route, Link } from "react-router-dom";



function App() {
	return (
		// <div>
		// 	<MyNavbar />	
		// 	<div className = "app-main">
		// 		<h1> </h1>
		// 		<h1> </h1>
		// 		<Make_grid />
		// 	</div>	
		// </div>
		<div>
			Hello world
			{/* <MyNavbar />	
			<div className = "app-main">
				<h1> </h1>
				<h1> </h1>
				<Make_grid />
			</div> */}
			<Sudoku_grid />	
		</div>
	);
}

export default App;
