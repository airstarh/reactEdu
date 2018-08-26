import React from 'react';
import {Tr}  from "./tr";

export class Table extends React.Component {
	state = {
		data: [],
	};

	constructor(props) {
		super(props);
	}

	/**
	 * https://reactjs.org/docs/react-component.html
	 *
	 * Why use getDerivedStateFromProps instead of componentDidUpdate?
	 * https://stackoverflow.com/questions/49449527/why-use-getderivedstatefromprops-instead-of-componentdidupdate
	 * */
	static getDerivedStateFromProps(props, state) {
		if (props.data !== state.data) {
			return {
				data: props.data
			};
		}

		// Return null to indicate no change to state.
		return null;
	}

	render() {
		const data = this.state.data;
		let fields = [];
		if (data[0]) {
			fields = Object.keys(data[0]);
		}
		const isSubTable = this.props.isSubTable;

		let tpl = (
			<table border="1" cellPadding="5" cellSpacing="0">
				<thead>
				<tr>

					<td>ACTIONS</td>
					{
						fields.map((h, i) =>
							           <th key={i}>
								           <button>&lt;</button>
								           {h}
								           <button>&gt;</button>
							           </th>
						)
					}
				</tr>

				 <tr>
					 <td>&nbsp;</td>
					 {
						 fields.map((h, i) =>
							            <th key={i}><input type="text" name={h}/></th>)
					 }
				 </tr>
				</thead>
				<tbody>
				{
					data.map((m, i) => <Tr key={m.id} model={m} fields={fields} even_odd={i} isSubTable={isSubTable}/>)
				}
				</tbody>
			</table>
		);

		if (isSubTable) {
			tpl = (
				<table border="1" cellPadding="5" cellSpacing="0">
					<thead>
					<tr>
						{
							fields.map((h, i) =>
								           <th key={i}>
									           {h}
								           </th>
							)
						}
					</tr>
					</thead>
					<tbody>
					{
						data.map((m, i) => <Tr key={m.id} model={m} fields={fields} even_odd={i} isSubTable={isSubTable}/>)
					}
					</tbody>
				</table>
			)
		}
		return tpl;
	}
}