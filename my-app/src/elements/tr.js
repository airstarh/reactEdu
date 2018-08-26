import React from 'react';
import {Td}  from "./td";

export class Tr extends React.Component {

	fields = [];

	constructor(props) {
		super(props);
		this.state = {
			model: this.props.model,
		};
		this.organizeFields();
	}

	organizeFields() {
		this.fields = Object.keys(this.state.model);
	}

	render() {
		return (
			<tr>
				{this.fields.map((f, i) => {
					return <Td key={i} model={this.state.model} fieldName={f}/>
				})}
			</tr>
		);
	}
}