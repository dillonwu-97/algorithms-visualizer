import React from 'react'
import {find_next_cell, is_valid} from './lib.mjs'
import '../sudoku_global'

/******************* Testing function ********************/
// test = [[8,5,0,0,0,2,4,0,0],
// [7,2,0,0,0,0,0,0,9],
// [0,0,4,0,0,0,0,0,0],
// [0,0,0,1,0,7,0,0,2],
// [3,0,5,0,0,0,9,0,0],
// [0,4,0,0,0,0,0,0,0],
// [0,0,0,0,8,0,0,7,0],
// [0,1,7,0,0,0,0,0,0],
// [0,0,0,0,3,6,0,4,0]]

// global.backtrack_count = 0
// global.values = []

// val = backtrack_smart(test, 0, 0)
// for (let i = 0; i < 9; i++) {
//     console.log(test[i].toString())
// }
// console.log(global.values)
// console.log(global.backtrack_count, val)


// imply(test, 0, 0, 1)
/******************* Methods ********************/
// "1" in global.values[3] stands for whether to add a backtrack counter or not
export default function backtrack_smart(grid, store_flag) {
    // function backtrack_smart(grid) {
    let i , j, ret, implied_values
    ret = find_next_cell(grid)
    // console.log('DEBUG')
    // for (let i = 0; i < 9; i++) {
    //     console.log(grid[i].toString())
    // }
    // console.log("next cell is ", ret)
    i = ret[0]
    j = ret[1]
    if (i == -1) {
        return true
    }
    for (let e= 1; e < 10; e++) {
        if (is_valid(grid, i, j, e) ) {
            grid[i][j] = e
            implied_values = imply(grid, i, j, e)
            if (store_flag == 1) {
                global.values.push([i,j,e])
                global.values = [...global.values,...implied_values]
            }
            // global.values = [...global.values, ...implied_values]
            if (backtrack_smart(grid, store_flag)) {
                return true
            }
            // undoing the implied values
            grid[i][j] = 0
            for (let x = 0; x < implied_values.length; x++) {
                grid[implied_values[x][0]][implied_values[x][1]] = 0
                if (store_flag == 1) {
                    global.values.push([implied_values[x][0], implied_values[x][1], 0])
                }
            }
            if (store_flag == 1) {
                global.values.push([i,j,0,1])
            }
            global.backtrack_count ++;
        }
    }
    return false
}   

// separate into 9 regions
// can also take the sum of each set and subtract from current so that if current has only 1 value, then that means it must be that value
// (row_start, row_end, col_start, col_end)
function imply(grid, i, j, e) {
    let sectors= [[0,3,0,3],[3,6,0,3],[6,9,0,3],[0,3,3,6],[3,6,3,6],[6,9,3,6],[0,3,6,9],[3,6,6,9],[6,9,6,9]]
    let implied_values = []
    grid[i][j] = e
    let complete_set, v
    let all_values = new Set([...Array(10).keys()])
    all_values.delete(0)
    let flag = 1
    while (flag == 1) {
        flag = 0
        let possible_values = [...Array(9)].map(i=>Array(9).fill(0))
        for (let sec = 0; sec < sectors.length; sec++) {
            for (let i = sectors[sec][0]; i < sectors[sec][1]; i++) {
                for (let j = sectors[sec][2]; j < sectors[sec][3]; j++) {
                    if (grid[i][j] == 0) {
                        complete_set = new Set();
                        // adding values for rows and columns
                        for (let x = 0; x < 9; x++) {  
                            // add the values it CAN NOT be             
                            if (grid[i][x] != 0) {complete_set.add(grid[i][x])}
                            if (grid[x][j] != 0) {complete_set.add(grid[x][j])}
                        }
                        // adding the values for the respective box
                        // add the values it CAN NOT be             
                        for (let x = sectors[sec][0]; x < sectors[sec][1]; x++) {
                            for (let y = sectors[sec][2]; y < sectors[sec][3]; y++) {
                                if (grid[x][y] != 0) {complete_set.add(grid[x][y])}
                            }
                        }
                        possible_values[i][j] = [...complete_set] // possible_values[i][j] contains values it cannot be
                        // possible_values[i][j] contains values it can be
                        possible_values[i][j] = new Set([...all_values].filter(x => !possible_values[i][j].includes(x) ));
                        if (possible_values[i][j].size == 1) {
                            v = possible_values[i][j].values().next().value
                            if (is_valid(grid, i, j, v)) {
                                // console.log("found one", v)
                                implied_values.push([i, j, v])
                                grid[i][j] = v
                                flag = 1
                            }
                        }
                    }       
                }
            }
        }
    }
    return implied_values
    // return {"iv": implied_values, "g": grid}
}