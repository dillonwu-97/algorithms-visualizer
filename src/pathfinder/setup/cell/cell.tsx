import React, {Component, MouseEvent} from 'react';
import {nodeType} from '../../types'
import './cell.css'

interface CellProps {
	element_id: string,
	type: number,
	row: number,
	col: number,
	tdelay: number,
	onClick: (event: MouseEvent) => void
}

interface CellState {

}

// the animation for each individual cell should basically take place here? 
// So re
// TODO: How to implement the transition of cell colors in this component? 
export default class Cell extends Component<CellProps, CellState> { 

	render() {
		const {element_id, type, row, col, tdelay, onClick} = this.props
		// issue is that not everything is rendered at the same time for the maze
		return (
			<div className = {'cell ' + nodeType[type].toLowerCase()}
			data-row = {row}
			data-col = {col}
			onClick = {onClick}
			style = {{
				transitionDelay: `${tdelay}ms`
			}}
			>
			</div>
		)
	}
}