import *  as d3 from "d3"
import React, { Component } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom"
import { useSpring, animated } from 'react-spring'

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



// useinterval taken from: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const circleCount = 10

const generateDataset = () => {
    return Array(circleCount).fill(0).map(i=>[Math.random() * 100, Math.random() * 100])
}

const generateVisible = () => {
    return Array(circleCount).fill(0).map(i=>Math.round(Math.random()))
}

const AllCircles = () => {
    // const [circleDataset, createDataset] = useState(generateDataset())
    // this one is better because the above is called every time state is rerendered
    // whereas the one below only renders at the start
    // not entirely sure why
    const [circleDataset, createDataset] = useState(() => generateDataset())
    const [visibleCircles, createVisible] = useState(() => generateVisible())

    function setVisible() {
        createVisible(generateVisible())
    }

    console.log("circle dataset value is ", circleDataset[0])
    const link = d3.linkHorizontal()({
        source:circleDataset[0],
        destination: circleDataset[1]
    })

    return (
        <div>
            {console.log(visibleCircles)}
            <svg>
                <path
                    d = {link}
                    fill={'none'}
                    stroke= {'black'}
                />
                {circleDataset.map((val, index) => (
                    <Circle
                        x = {val[0]}
                        y = {val[1]}
                        visible = {visibleCircles[index]}
                    />
                ))}
            </svg>

            <button onClick = {() => setVisible()}> Click me </button>
        </div>
    )

}


const Circle = ({ x, y, visible}) => {

    // use spring for these styles
    const style = useSpring({
        config: {
            duration: 1200,
            mass: 1,
            tension: 170,
            friction:24
        },
        r: visible? "10": "0",
        opacity: visible? "1": "0",
        fill: visible? "blue": "red"
    })
    
    return (
        <animated.circle {...style}
            cx = {x}
            cy = {y}
            // r = {visible == 1? "10": "0"}
        />
    )
}

const circleDataset = generateDataset()
// const link = d3.linkHorizontal() ({
//     source: circleDataset[0],
//     target: circleDataset[1]
// })


export default class Tree extends Component {

    constructor(){
        super()
        this.state = {
            nodes: circleDataset
        }
    }
    render() {
        let c = []
        let color
        for (let i = 0; i < circleDataset.length;i++) {
            if (i == 0) {color = "red"}
            else {color = "blue"}
            c.push(<circle 
                r = {"5"}
                cx = {circleDataset[i][0]}
                cy = {circleDataset[i][1]}
                fill = {color}
                />)
            if (i == 1) {break;}
        }
        const link = d3.linkHorizontal() ({
            source: this.state.nodes[0],
            target: this.state.nodes[1]
        })
        console.log(circleDataset[0], link)
        return (
            <div>
                {/* <AllCircles /> */}
                <svg>
                    <path 
                        d = {link}
                        stroke = {'black'}
                    />
                    {c}
                </svg>
            </div>
        )
    }
}
