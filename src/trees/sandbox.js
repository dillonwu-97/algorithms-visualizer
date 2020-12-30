import *  as d3 from "d3"
import React, { Component } from 'react'
import { useEffect, useRef, useState } from 'react'
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
    return Array(circleCount).fill(0).map(i=>[Math.round(Math.random() * 100), Math.round(Math.random() * 100)])
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

    return (
        <div>
            {console.log(visibleCircles)}
            <svg>
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

export default class Trees extends Component {

    constructor(){
        super()
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <AllCircles />
            </div>
        )
    }
}
