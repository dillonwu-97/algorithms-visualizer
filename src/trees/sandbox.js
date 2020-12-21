import *  as d3 from "d3"

import React, { Component } from 'react'

// Useful resource for learning d3 and react https://wattenberger.com/blog/react-and-d3

const tree_layout = {
    "value":10,
    "type": "red",
    "children": [
        {
            "value": 8,
            "type": "black"
        }
    ],
}

const Svg = () => {
    return (
        <svg style = {{
            border: "2px solid gold"
        }} />
    )
}

export default class Trees extends Component {

    constructor(){
        super()
        this.state = {
        }
    }

    

    render() {
        return (
            <div>
                <Svg />
            </div>
        )
    }
}
