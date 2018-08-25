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

		console.log("Tr RENDER ++++++++++");
		console.log(this.fields);

		//return (<tr>0</tr>);

		return (
			<tr>
				{this.fields.map((f) => {
					return <Td model={this.state.model} fieldName={f}/>
				})}
			</tr>
		);
	}
}