import React from 'react'
import swap from './lib'

function bubblesort(array) {
    let ret_val = []
    let swap_values
    for (let i = 0; i < array.length-1; i++) {
        for (let j = 0; j < array.length-i-1; j++) {
            if (array[j] > array[j+1]) {
                swap_values = swap( array, j, j+1)
                ret_val.push(swap_values)
            }
        }
    }
    return ret_val
    
}

export default bubblesort
