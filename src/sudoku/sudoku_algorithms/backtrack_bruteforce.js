import React from 'react'
import {find_next_cell, is_valid} from './lib.mjs'
import '../sudoku_global'

/******************* Testing function ********************/
// test = [[0,0,5,3,0,0,0,0,0],
// [8,0,0,0,0,0,0,2,0],
// [0,7,0,0,1,0,5,0,0],
// [4,0,0,0,0,5,3,0,0],
// [0,1,0,0,7,0,0,0,6],
// [0,0,3,2,0,0,0,8,0],
// [0,6,0,5,0,0,0,0,9],
// [0,0,4,0,0,0,0,3,0],
// [0,0,0,0,0,9,7,0,0]]

// val = backtrack_bruteforce(test, 0, 0)
// for (let i = 0; i < 9; i++) {
//     console.log(test[i].toString())
// }
// console.log(global.backtrack_count, val)

export default function backtrack_bruteforce(grid, store_flag) {
// function backtrack_bruteforce(grid) {
    let i, j, ret
    ret = find_next_cell(grid)
    i = ret[0]
    j = ret[1]
    if (i == -1) {
        return true
    }
    for (let e= 1; e < 10; e++) {
        if (is_valid(grid, i, j, e) ) {
            grid[i][j] = e
            // console.log(i,j,e)
            if (store_flag == 1) {
                global.values.push([i,j,e])
            }
            if (backtrack_bruteforce(grid, store_flag)) {
                return true
            } 
            grid[i][j] = 0
            // console.log(i,j,e)
            if (store_flag == 1) {
                global.values.push([i,j,0, 1])
            }
            global.backtrack_count ++;
        }
    }
    return false
}   


/*
[[ 5,3,0,0,7,0,0,0,0 ],  
[ 6,0,0,1,9,5,0,0,0 ],  
[ 0,9,8,0,0,0,0,6,0],  
[ 8,0,0,0,6,0,0,0,3],  
[ 4,0,0,8,0,3,0,0,1 ],  
[ 7,0,0,0,2,0,0,0,6 ],  
[ 0,6,0,0,0,0,2,8,0 ],  
[ 0,0,0,4,1,9,0,0,5 ],  
[ 0,0,0,0,8,0,0,7,9]]
*/