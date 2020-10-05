import React, { Component } from 'react'
import './sudoku_cell.css'
import backtrack_bruteforce from './sudoku_algorithms/backtrack_bruteforce'
import { Button } from 'react-bootstrap'
import './sudoku_global'

let table_size = [...Array(9).keys()]
/****************************** Creating the sudoku configuration ******************************/

function create_table() {
	var table = new Array(9)
	for (let i = 0; i < 9; i++) {
		table[i] = new Array(9).fill(0)
	}
    return table
    
}

// TODO:
// Create a backtrack counter

/****************************** Render method ******************************/

export default class Sudoku_grid extends Component {

    constructor(props) {
        super()
        this.state = {
            board: [[0,0,5,3,0,0,0,0,0],
            [8,0,0,0,0,0,0,2,0],
            [0,7,0,0,1,0,5,0,0],
            [4,0,0,0,0,5,3,0,0],
            [0,1,0,0,7,0,0,0,6],
            [0,0,3,2,0,0,0,8,0],
            [0,6,0,5,0,0,0,0,9],
            [0,0,4,0,0,0,0,3,0],
            [0,0,0,0,0,9,7,0,0]]
        }
        this.solve_puzzle = this.solve_puzzle.bind(this)
        this.visualize_puzzle = this.visualize_puzzle.bind(this)
    }

/****************************** Solving the sudoku configuration ******************************/
    visualize_puzzle() {
        let grid = this.state.board
        let str
        global.values = [] // resetting the global variable
        backtrack_bruteforce(grid)
        for (let i = 0; i < global.values.length; i++) {
            // console.log(str, document.getElementById(str).innerHTML)
            // console.log(document.getElementById(str).innerHTML)
            setTimeout(()=>{
                str = 'sudoku-' + global.values[i][0] + '-' + global.values[i][1]
                if (global.values[i][2] == 0) {
                    document.getElementById(str).innerHTML = ' '
                } else {
                    document.getElementById(str).innerHTML = global.values[i][2]
                }
            }, 10*i)
        }
        // this.setState({
        //     board:grid
        // })
    }
    
    solve_puzzle() {
        let grid = this.state.board
        backtrack_bruteforce(grid)
        console.log(global.backtrack_count)
        this.setState({
            board:grid
        })
    }

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
                                            return (
                                            <td id = {'sudoku-'+idx+'-'+idy}>
                                                {console.log('sudoku-'+idx+'-'+idy)}
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
                <div className = "button-div">
                    Visualize
                    <button type="button" className="sudoku-solve-button" onClick={()=>this.visualize_puzzle()}>
                        Brute Force Search
                    </button>
                    Instant 
                    <button type="button" className="sudoku-solve-button" onClick={()=>this.solve_puzzle()}>
                        Brute Force Search
                    </button> 
                </div>
            </div>
        )
    }
}
