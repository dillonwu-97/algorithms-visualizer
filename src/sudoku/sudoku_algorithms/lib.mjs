import React from 'react'

function find_next_cell(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j =0; j < 9; j++) {
            if (grid[i][j] == 0) {
                return [i, j]
            }
        }
    }
    return [-1, -1]
}

function is_valid(grid, row, col, e) {
    // check rows
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] == e) {
            return false;
        }
    }
    // check columns
    for (let i = 0; i < 9; i++) {
        if (grid[i][col] == e) {
            return false;
        }
    }
    // check square
    let top_x = 3 * Math.floor(row / 3) // works since 0 <= row < 9
    let top_y = 3 * Math.floor(col / 3)
    for (let i = top_x; i < top_x+3; i++) {
        for (let j = top_y; j < top_y + 3; j++) {
            if (grid[i][j] == e) {
                return false;
            }
        }
    }

    return true;
}

function shuffle(a) {
    var j, x, i;
    for (let i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function create_table() {
	var table = new Array(9)
	for (let i = 0; i < 9; i++) {
		table[i] = new Array(9).fill(0)
	}
    return table
    
}

function debug_board(grid) {
    for (let i = 0; i < 9; i++) {
        console.log(grid[i].toString())
    }
}


export {find_next_cell, is_valid, shuffle, create_table, debug_board}