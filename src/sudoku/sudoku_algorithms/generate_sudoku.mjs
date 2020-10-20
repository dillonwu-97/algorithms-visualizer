// This algorithm generates the sudoku puzzles
/*
Start with a complete, valid board (filled with 81 numbers).
Make a list of all 81 cell positions and shuffle it randomly.
As long as the list is not empty, take the next position from the list and remove the number from the related cell.
Test uniqueness using a fast backtracking solver. My solver is - in theory - able to count all solutions, but for testing uniqueness, it will stop immediately when it finds more than one solution.
If the current board has still just one solution, goto step 3) and repeat.
If the current board has more than one solution, undo the last removal (step 3), and continue step 3 with the next position from the list
Stop when you have tested all 81 positions.
*/
// import React from 'react'
import {find_next_cell, is_valid, shuffle, create_table, debug_board} from './lib.mjs'


// console.log(generate_config())
let board = generate_config()
create_puzzle(board)
// Generates the initial configuration for the sudoku board

export default function create_puzzle(board) {
    let coordinates = []
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9;j++) {
            coordinates.push([i,j])
        }
    }
    coordinates = shuffle(coordinates)
    console.log(coordinates)
    let curr_val = 0
    let temp_board = []
    for (let i = 0; i < coordinates.length; i++) {
        global.total_solutions = 0
        curr_val = board[coordinates[i][0]][coordinates[i][1]]
        board[coordinates[i][0]][coordinates[i][1]] = 0
        temp_board = board.map(function(arr) {
            return arr.slice();
        });
        // debug_board(temp_board)
        let val = test_one_solution(temp_board, 0) // fill_grid parameter is 0
        if (val == true) {
            // console.log("broke the grid ")
            board[coordinates[i][0]][coordinates[i][1]] = curr_val
        }
        
        // for easy puzzle: break at 30
        // for medium puzzle: break at 60
        // for hard puzzle: dont break
        
    }
    return board
}

function generate_config () {
    let board = create_table()

    // randomly get some elements
    let a = [...Array(10).keys()]
    a.splice(a.indexOf(0), 1)
    
    // fill in the diagonal boxes
    let sectors = [0,3,3,6,6,9]
    let count = 0
    for (let k = 0; k < sectors.length; k+=2) {
        count = 0
        a = shuffle(a)
        for (let i = sectors[k]; i < sectors[k+1]; i++) {
            for (let j = sectors[k]; j < sectors[k+1]; j++) {
                board[i][j] = a[count]
                count ++
            }
        }
    }

    // solve the rest of the boxes
    test_one_solution(board, 1)
    debug_board(board)

    return board

}


function test_one_solution(grid, fill_grid) {
    // function backtrack_bruteforce(grid) {
        let i, j, ret
        ret = find_next_cell(grid)
        i = ret[0]
        j = ret[1]
        if (i == -1) {
            global.total_solutions ++
            // console.group(global.total_solutions)
            // if we are JUST filling the grid, return true once we hit the end
            if (fill_grid == 1) { return true }
            // otherwise check if there is a second solution; if there is no second solution, return false
            // if there is a second solution, return true
            if (global.total_solutions >= 2) {
                return true
            } else {
                return false
            }
        }
        for (let e= 1; e < 10; e++) {
            if (is_valid(grid, i, j, e) ) {
                grid[i][j] = e
                // console.log(i,j,e)
                if (test_one_solution(grid, fill_grid)) {
                    return true
                } 
                grid[i][j] = 0
                // console.log(i,j,e)
                global.backtrack_count ++;
            }
        }
        return false
    }   