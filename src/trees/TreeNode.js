import React from 'react'


// doing react functional component so as to practice hooks
export default function TreeNode(props) {
    const {node, findChildren} = props

    if (node !== undefined) {
        console.log("node is ", node, " ", node.position[0], " ", node.position[1])
    }
    return (
        // <React.Fragment>
        <div>
            <svg>
                        <circle
                        cx = {node.position[0]}
                        cy = {node.position[1]}
                        r = {"10"}
                        />
                        </svg>
            {/* {node !== undefined && findChildren(node).map((value) => (
                <div>
                    <TreeNode node = {value}
                        findChildren = {findChildren}>
                    </TreeNode>
                    </div>
            ))} */}
            </div>
            /* </React.Fragment> */
    )
}
