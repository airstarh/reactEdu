import React from 'react';
import {Td}  from "./td";

export class Tr extends React.Component {

	fields = [];

	constructor(props) {
		super(props);
		this.state = {
			model:  this.props.model,
			fields: this.props.fields,
		};
	}

	render() {

		const fields     = this.state.fields;
		const model      = this.state.model;
		const even_odd   = this.props.even_odd % 2 === 0 ? 'even' : 'odd';
		const isSubTable = this.props.isSubTable;


		let tpl = (
			<tr className={even_odd}>
				<td>
					<button>E</button>
					<button>S</button>
					<button>D</button>
				</td>
				{fields.map((f, i) => <Td key={i} model={model} fieldName={f}/>)}
			</tr>
		);

		if (isSubTable) {
			tpl = (
				<tr className={even_odd}>
					{fields.map((f, i) => <Td key={i} model={model} fieldName={f}/>)}
				</tr>
			);
		}

		return tpl;
	}
}