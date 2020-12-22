import *  as d3 from "d3"
import React, { Component } from 'react'
import { useEffect, useRef } from 'react'

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

const Circle = () => {
    const ref = useRef() // stores reference to rendered svg element

    useEffect(() => {
        // d3.select turns ref into d3 selection object
        const svgElement = d3.select(ref.current)
        svgElement.append("circle")
            .attr("cx", 150)
            .attr("cy", 70)
            .attr("r", 50)
    }, [])

    return (
        <svg ref = {ref} />
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
                <Circle />
            </div>
        )
    }
}
