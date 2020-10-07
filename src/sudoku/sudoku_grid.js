import React, { Component } from 'react'
import './sudoku_cell.css'
import backtrack_bruteforce from './sudoku_algorithms/backtrack_bruteforce'
import { Button } from 'react-bootstrap'
import './sudoku_global'
import backtrack_smart from './sudoku_algorithms/backtrack_smart'

let table_size = [...Array(9).keys()]
/****************************** Creating the sudoku configuration ******************************/

function create_table() {
	var table = new Array(9)
	for (let i = 0; i < 9; i++) {
		table[i] = new Array(9).fill(0)
	}
    return table
    
}

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
                backtrack_bruteforce(grid)
                break
            case "smart":
                backtrack_smart(grid)
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
                backtrack_bruteforce(grid)
                break
            case "smart":
                backtrack_smart(grid)
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


/****************************** Render method ******************************/

    render() {
        return (
            <div>
                <div>
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
                    {this.state.backtrack_count}
                </div>
                <div className = "button-div">
                    Visualize
                    <button type="button" className="sudoku-solve-button" onClick={()=>this.visualize_puzzle("bruteforce")}>
                        Brute Force
                    </button>
                    Instant 
                    <button type="button" className="sudoku-solve-button" onClick={()=>this.solve_puzzle("bruteforce")}>
                        Brute Force
                    </button> 
                    Visualize
                    <button type="button" className="sudoku-solve-button" onClick={()=>this.visualize_puzzle("smart")}>
                        Smart Brute Force
                    </button>
                    Instant 
                    <button type="button" className="sudoku-solve-button" onClick={()=>this.solve_puzzle("smart")}>
                        Smart Brute Force
                    </button> 
                    <button type="button" onClick={()=>this.resetboard()}>
                        Reset Board
                    </button>
                </div>
            </div>
        )
    }
}
