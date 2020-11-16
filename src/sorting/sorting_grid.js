import React, { Component } from 'react'
import './sorting_grid.css'
import bubblesort from './sorting_algorithms/bubblesort'
import insertionsort from './sorting_algorithms/insertionsort'

const MAX_HEIGHT = window.innerHeight // 644 
// const MAX_HEIGHT = 100
// 500 is ok for zoom = 100% on a normal window
const MAX_WIDTH = window.innerWidth
// const MAX_WIDTH = 500 // window.innerWidth = 1280 
const ARRAY_SIZE = 20
// 200 is padding on left and right side
const BAR_WIDTH = (MAX_WIDTH - 200) / ARRAY_SIZE


export default class Sorting_grid extends Component {
    constructor() {
        super()
        this.state = {
            array: Array.from(Array(ARRAY_SIZE), () => Math.floor(Math.random() * ARRAY_SIZE)+1)
        }
        this.sort = this.sort.bind(this)
        this.newArray = this.newArray.bind(this)
    }

/*********************************** Animation Methods ******************************/
sort(algorithm) {
    // document.getElementById('array-0').style.height = `100px`
    let ret_values
    switch (algorithm) {
        case 'bubblesort':
            ret_values = bubblesort(this.state.array)
            break
        case 'insertionsort':
            ret_values = insertionsort(this.state.array)
            break
    }
    // let out, value_i, value_j, index_i, index_j, s_i, s_j
    // NOTE: have to use let in the loop instead of defining above because:
    // https://medium.com/@axionoso/watch-out-when-using-settimeout-in-for-loop-js-75a047e27a5f
    for (let i = 0; i < ret_values.length; i++) {
        // change height of the element
        let out = ret_values[i]
        
        // ith element being swapped
        let index_i = out[0][0]
        let value_i = out[0][1]
        let s_i = "array-" + index_i

        // jth element being swapped
        let index_j = out[1][0]
        let value_j = out[1][1]
        let s_j = "array-" + index_j
        setTimeout(() => {
            // console.log(i, s_i, s_j, Math.floor(MAX_HEIGHT * (value_i/(ARRAY_SIZE+1))))
            document.getElementById(s_i).style.height = `${Math.floor(MAX_HEIGHT * (value_i/(ARRAY_SIZE+1)))}px`
            document.getElementById(s_j).style.height = `${Math.floor(MAX_HEIGHT * (value_j/(ARRAY_SIZE+1)))}px`
        }, i * 1000 / ARRAY_SIZE)
    }
}

newArray() {
    this.setState({
        array: Array.from(Array(ARRAY_SIZE), () => Math.floor(Math.random() * ARRAY_SIZE +1))
    })
}

/*********************************** Render Method ******************************/
    render() {
        let algorithms = ['bubblesort', 'insertionsort']
        return (
            <div>
                <button onClick={this.newArray}>
                    Create New Array
                </button>
                {algorithms.map((algorithm) => {
                    return (
                        <button onClick = {()=>this.sort(algorithm)}>
                            {algorithm}
                        </button>
                    )
                })}
                <div className="sorting-grid">
                    {this.state.array.map((value, id) => {
                        return (
                            <div
                                id = {"array-" + id}
                                className="bar" 
                                style={{width: BAR_WIDTH, height: MAX_HEIGHT * (value/(ARRAY_SIZE+1))}}
                            >
                                {/* {console.log("array-"+id)} */}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
