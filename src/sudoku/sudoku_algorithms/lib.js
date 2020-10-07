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
export {find_next_cell, is_valid}