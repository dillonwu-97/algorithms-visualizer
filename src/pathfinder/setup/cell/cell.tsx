import React, {Component, MouseEvent} from 'react';
import {nodeType} from '../../algorithms/path_algs/types'

import './cell.css'

interface CellProps {
	element_id: string,
	type: number,
	row: number,
	col: number,
	onClick: (event: MouseEvent) => void
}

interface CellState {

}

// the animation for each individual cell should basically take place here? 
// So re
// TODO: How to implement the transition of cell colors in this component? 
export default class Cell extends Component<CellProps, CellState> { 

	render() {
		const {element_id, type, row, col, onClick} = this.props

		return (
			<div className = {'cell ' + nodeType[type].toLowerCase()}
			data-row = {row}
			data-col = {col}
			onClick = {onClick}
			>
			</div>
		)
	}
}