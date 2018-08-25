import React   from 'react';
import {Table} from "./table";

export class Td extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			model: this.props.model,
			fieldName: this.props.fieldName
		};
	}

	render() {

		const m = this.state.model;
		const f = this.state.fieldName;
		let v = m[f];

		if (typeof v === 'object') {
			if (!Array.isArray(v)) {
				v = [v];
			}
			return (
				<td>
					<Table data={v}/>
				</td>
			);

		}

		return (
			<td>
				{v}
			</td>
		);
	}
}