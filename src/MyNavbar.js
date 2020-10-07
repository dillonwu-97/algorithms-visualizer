import React, {Component} from 'react'
import {Navbar, Nav, NavItem, NavDropdown} from 'react-bootstrap'
import './App.css'

export default class MyNavbar extends Component {

	render() {
		return (
			<nav class="nav navbar-dark bg-dark">
				Pathfinding Visualizer
			{/* <div class="container">
				<div class="logo">
					<a href="#">Algorithms Visualizer</a>
				</div>
				<Nav id="mainListDiv" class="main_list">
					<ul class="navlinks">
						<li>
							<NavDropdown href="#" title="Dropdown" id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
							</NavDropdown>
						</li>
						<li><a href="#">About</a></li>
						<li><a href="#">Portfolio</a></li>
						<li><a href="#">Services</a></li>
						<li><a href="#">Contact</a></li>
					</ul>
				</Nav>
				<span class="navTrigger">
					<i></i>
					<i></i>
					<i></i>
				</span>
			</div> */}
		</nav>

		)
	}
}