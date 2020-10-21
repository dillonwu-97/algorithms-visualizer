import React, { Component } from 'react'
import backtrack_bruteforce from './sudoku_algorithms/backtrack_bruteforce'
import { Button } from 'react-bootstrap'
import './sudoku_global'
import backtrack_smart from './sudoku_algorithms/backtrack_smart.js'
import {create_puzzle, generate_config} from './sudoku_algorithms/generate_sudoku.js'

/************************* CSS imports *************************/
// import { Dropdown, DropdownButton } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery/dist/jquery.min.js';
// import 'bootstrap/dist/js/bootstrap.min.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './sudoku_cell.css'
import './sudoku_grid.css'

/****************************** Creating the sudoku configuration ******************************/

let table_size = [...Array(9).keys()]

// this variable is used to clear timeouts 
global.vis = 0
global.timeid = []

// TODO:
// Create a backtrack counter

global.board = [[0,0,5,3,0,0,0,0,0],
[8,0,0,0,0,0,0,2,0],
[0,7,0,0,1,0,5,0,0],
[4,0,0,0,0,5,3,0,0],
[0,1,0,0,7,0,0,0,6],
[0,0,3,2,0,0,0,8,0],
[0,6,0,5,0,0,0,0,9],
[0,0,4,0,0,0,0,3,0],
[0,0,0,0,0,9,7,0,0]]

// global.board = [[8,5,0,0,0,2,4,0,0],
// [7,2,0,0,0,0,0,0,9],
// [0,0,4,0,0,0,0,0,0],
// [0,0,0,1,0,7,0,0,2],
// [3,0,5,0,0,0,9,0,0],
// [0,4,0,0,0,0,0,0,0],
// [0,0,0,0,8,0,0,7,0],
// [0,1,7,0,0,0,0,0,0],
// [0,0,0,0,3,6,0,4,0]]
/****************************** Class method ******************************/

export default class Sudoku_grid extends Component {

    constructor(props) {
        super()
        this.state = {
            board: global.board.map(inner => inner.slice()),
            original: global.board.map(inner => inner.slice()),
            backtrack_count: 0
        }
        this.solve_puzzle = this.solve_puzzle.bind(this)
        this.visualize_puzzle = this.visualize_puzzle.bind(this)
        this.resetboard = this.resetboard.bind(this)
    }

/****************************** Solving the sudoku configuration ******************************/
    visualize_puzzle(type) {
        let grid = this.state.board.map(inner=>inner.slice())
        let str
        global.values = [] // resetting the global variable
        global.backtrack_count = 0
        switch(type) {
            case "bruteforce":
                backtrack_bruteforce(grid, 1) // means I need to store the values for visualization
                break
            case "smart":
                backtrack_smart(grid, 1)
                break        
        }
        var ret
        // console.log(this.state.board)
        for (let i = 0; i < global.values.length; i++) {
            // console.log(str, document.getElementById(str).innerHTML)
            // console.log(document.getElementById(str).innerHTML)
            global.vis = setTimeout(()=>{
                this.setState(before => {
                    let grid = before.board
                    let counter = before.backtrack_count
                    if (global.values[i][2] == 0) {
                        grid[global.values[i][0]][global.values[i][1]] = ''
                    } else {
                        grid[global.values[i][0]][global.values[i][1]] = global.values[i][2]
                    }
                    if (global.values[i].length > 3) {
                        // increment backtrack counter
                        counter ++
                    }
                    return {
                       board: grid,
                       backtrack_count: counter
                    }})
                }, 10*i)
            global.timeid.push(global.vis)
            // Errors with this method: (1) results show up before they should
            //     grid = this.state.board
            //     if (global.values[i][2] == 0) {
            //         grid[global.values[i][0]][global.values[i][1]] = ''
            //     } else {
            //         grid[global.values[i][0]][global.values[i][1]] = global.values[i][2]
            //     }
            //     this.setState({
            //         board:grid
            //     })
            // }, 10 * i)

            // Errors with this method: (1) Difficult to / cannot reset the board
            //     str = 'sudoku-' + global.values[i][0] + '-' + global.values[i][1]
            //     if (global.values[i][2] == 0) {
            //         document.getElementById(str).innerHTML = ' '
            //     } else {
            //         document.getElementById(str).innerHTML = global.values[i][2]
            //     }
            // }, 10*i)
            // console.log(global.vis)
        }
        // this.setState({
        //     board:grid
        // })
    }
    
    solve_puzzle(type) {
        let grid = this.state.board
        global.values = []
        global.backtrack_count = 0
        switch(type) {
            case "bruteforce":
                backtrack_bruteforce(grid, 0)
                break
            case "smart":
                backtrack_smart(grid, 0)
                break        
        }
        // console.log(global.backtrack_count)
        this.setState({
            board:grid,
            backtrack_count: global.backtrack_count
        })
    }

/****************************** Board Updates ******************************/
    resetboard() {
        let str
        for (let i = 0; i < global.timeid.length; i++) {
            // console.log(global.timeid[i])
            clearTimeout(global.timeid[i]);
        }
        // console.log(this.state.board)
        // console.log(this.state.original)
        // for (let i = 0; i < this.state.original.length; i++) {
        //     for (let j = 0; j < this.state.original[0].length; j++) {
        //         str = 'sudoku-' + i + '-' + j
        //         if (this.state.original[i][j] == 0) {
        //             // console.log(document.getElementById(str).innerHTML)
        //             document.getElementById(str).innerHTML = 0
        //         } else {
        //             document.getElementById(str).innerHTML = this.state.original[i][j]
        //         }
        //     }
        // }
        // console.log("done")
        let grid = this.state.original.map(inner => inner.slice())
        this.setState({
            board: grid,
            backtrack_count: 0
        })
        // console.log(this.state.board)
    }

    generateboard() {
        let grid = generate_config()
        create_puzzle(grid)
        let original_grid = grid.map(i => i.slice())
        this.setState({
            board: grid,
            original: original_grid,
            backtrack_count:0
        })
    }


/****************************** Render method ******************************/

    render() {
        let solve_type = ["bruteforce", "smart"]
        return (

            <div>

                <nav class="navbar navbar-expand-lg bg-light">
                    <div class= "navbar-collapse">
                        <ul class="navbar-nav mr-auto nav-fill w-100">
                            <li class="nav-item dropdown">
                                <div class="dropdown">
                                    <button class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                                        Visualize
                                    </button>
                                    <div class = "dropdown-menu dropdown-menu-center" >
                                        {solve_type.map((name) => {
                                            return (
                                                <a class="dropdown-item" onClick = {()=>this.visualize_puzzle(name)}>
                                                    {name}
                                                </a>
                                            )
                                        })}
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item active">
                                <div>
                                    <button type="button" onClick={()=>this.resetboard()}>
                                        Reset Board
                                    </button>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <button type="button" onClick={()=>this.generateboard()}>
                                        Generate Board
                                    </button>
                                </div>
                            </li>
                            <li class="nav-item dropdown">
                                <div class="dropdown" className="button-div">
                                    <button class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                                        Instant
                                    </button>
                                    <div class = "dropdown-menu dropdown-menu-center" >
                                        {solve_type.map((name) => {
                                            return (
                                                <div>
                                                    <a class="dropdown-item" onClick = {()=>this.solve_puzzle(name)}>
                                                        {name}
                                                    </a>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                
                <div className="sudoku-grid">
                    <table>
                        {/* {console.log(this.state.board)} */}
                        {this.state.board.map((row, idx) => {
                            return(
                                <tr>
                                    {row.map((unit, idy) => {
                                        {if (unit == 0) {
                                            // console.log(unit, idy)
                                            return (
                                            <td id = {'sudoku-'+idx+'-'+idy}>
                                                {/* {console.log('sudoku-'+idx+'-'+idy)} */}
                                                <input>
                                                </input>
                                            </td>
                                            )
                                        } else {
                                            return (
                                            <td id = {'sudoku-'+idx+'-'+idy}>
                                                {unit}
                                            </td>
                                            )
                                        }}
                                        // return (
                                        // <td>
                                        //     {j}
                                        // </td>
                                    // )
                                    })}
                                </tr>
                            )
                        })}
                    </table>
                </div> 
                <div className="back-counter">
                    Backtrack Counter: {this.state.backtrack_count}
                </div>

            </div>
        )
    }
}
