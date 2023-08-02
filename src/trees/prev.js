import React, { Component } from 'react'
import TreeNode from './TreeNode'
import './Tree.css'
import *  as d3 from "d3"

/*********************************** Setup **************************************/
// starting at index = 1, children are at 2n and 2n+1
let treeValues = Array(63).fill(-1).map((v, i) => i+1) // for testing purposes
// let treeValues = Array(64).fill(-1)
let data = {}, x = 0, y = 0
const H = window.innerHeight
const W = window.innerWidth
// location of each node should be calculated as follows:
// 0         x
// 1    x       x
// 2  x    x   x    x
// x location = (inner_width / level ) * position of each item
// y location = (inner_height / 6 ), use 6 since it supports maximum depth of 6
let count = 0, xdiff 
for (var i = 0; i < treeValues.length; i++) {
    let level = Math.ceil(Math.log2(i+2))
    count ++
    xdiff = (W / (2**level))// width chunk size
    if (level == 1) {
        x = xdiff
    } else {
        if ((i + 1) % 2 == 0) {
            x = data[ Math.floor( (i+1) / 2) ].position[0] - (xdiff)
        } else {
            x = data[ Math.floor( (i+1) / 2) ].position[0] + (xdiff)
        }
    }
    y = (H / (6.5) * level) // maximum depth =6, add 1 for better spacing
    // console.log(x, y)
    data[i+1] = {
        key: i+1,
        value: treeValues[i],
        children: [(i+1)*2, (i+1) * 2 + 1], //2n , 2n+1
        position: [x, y], // should not change
        level: level // should not change, starts off at level = 1
    }
    if (count == 2**(level-1)) {
        count = 0
        x = 0
    }
}

/*********************************** React Component ***********************************/
export default class Tree extends Component {

    constructor() {
        super()
        this.state = {
            nodes: data
        }
        this.findChildren = this.findChildren.bind(this)
    }

    findChildren(node) {
        const { nodes } = this.state
        // if value is null, return null, else return node
        return node.children.map(value => value !== null? nodes[value] : null)
    }

    render() {
        let nodes = [], links = [], even, odd, l
        for (const i in this.state.nodes) {
            nodes.push(
                <circle 
                    cx = {this.state.nodes[i].position[0]}
                    cy = {this.state.nodes[i].position[1]}
                    color = {"red"}
                    r = {10}
                />
            )
            
            even = 2 * i
            odd = 2 * i + 1
            if (even in this.state.nodes){
                l = d3.linkHorizontal() ({
                    source: this.state.nodes[i].position,
                    target: this.state.nodes[even].position
                })
                console.log(l, this.state.nodes[i].position)
                links.push(l)
            }
            if (odd in this.state.nodes) {
                links.push( 
                    d3.linkHorizontal() ({
                        source: this.state.nodes[i].position,
                        target: this.state.nodes[odd].position
                    })
                )
            }
        }

        // console.log(this.findChildren(this.state.nodes[1])) // works as it should
        console.log("nodes are ", nodes)
        return (
            <div className='treetop'>
                <svg className="svgSize">
                    {nodes}
                    {links.map((link) => (
                        <path
                            d = {link}
                            stroke = {'black'}
                        />
                    ))}
                </svg>
            </div>
        )
    }
}
