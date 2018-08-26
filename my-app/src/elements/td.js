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

	static getDerivedStateFromProps(props, state) {
		let statusChanged = false;
		const toReturn = {};
		if (props.model !== state.model) {
			statusChanged = true;
			toReturn.model = props.model
		}
		if (props.fieldName !== state.fieldName) {
			statusChanged = true;
			toReturn.fieldName = props.fieldName
		}
		return statusChanged ? toReturn : null;
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
					<Table isSubTable={true} data={v}/>
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