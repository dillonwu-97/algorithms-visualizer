import React, {Component} from 'react';

import './cell.css'

export default class cell extends Component { 

	render() {
		const {element_id, type, row, col, onClick,
			onMouseMove} = this.props
		return (
			<div id={element_id} 
			row = {row} 
			col = {col}
			className= {'cell ' + type} 
			onClick = {onClick}
			onMouseMove= {onMouseMove}
			>
			</div>
		)
	}
}