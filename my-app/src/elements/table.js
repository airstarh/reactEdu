import React     from 'react';
import PropTypes from 'prop-types';
import {Tr}      from "./tr";

export class Table extends React.Component {
	state = {
		data: [],
	};

	constructor(props) {
		super(props);
		this.handleChangeSearchField = this.handleChangeSearchField.bind(this);
	}

	/**
	 * https://reactjs.org/docs/react-component.html
	 *
	 * Why use getDerivedStateFromProps instead of componentDidUpdate?
	 * https://stackoverflow.com/questions/49449527/why-use-getderivedstatefromprops-instead-of-componentdidupdate
	 * */
	static getDerivedStateFromProps(props, state) {

		// if (!isSubTable) {
		// 	console.log("++++++++++ getDerivedStateFromProps props");
		// 	console.log(props);
		// }

		if (props.data !== state.data) {

			// if (!isSubTable) {
			// 	console.log("++++++++++ CHANGING STATE getDerivedStateFromProps props");
			// 	console.log(props.data);
			// }

			return {
				data: props.data
			};
		}

		// Return null to indicate no change to state.
		return null;
	}

	handleChangeSearchField(e) {
		e.persist();
		e            = e.nativeEvent;
		const fName  = e.target.name;
		const fValue = e.target.value;

		this.props.onChangeSearchField(fName, fValue);

		console.log("handleChangeSearchField ++++++++++");
		console.log(e);
	}

	render() {
		const data       = this.state.data || [];
		const isSubTable = this.props.isSubTable;

		// if (!isSubTable) {
		// 	console.log("RENDER TABLE ++++++++++");
		// 	console.log(data);
		// }

		let fields = [];
		if (data[0]) {
			fields = Object.keys(data[0]);
		}

		let tpl = (
			<table border="1" cellPadding="2" cellSpacing="0">
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
							<th key={i}>
								<div>
									<input type="text" name={`lk_${h}`} placeholder=''
									       onChange={this.handleChangeSearchField}
									/>
								</div>
								<div>
									<input type="text" name={`gt_${h}`} placeholder="&gt;"
									       onChange={this.handleChangeSearchField}/>
								</div>
								<div>
									<input type="text" name={`lt_${h}`} placeholder="&lt;"
									       onChange={this.handleChangeSearchField}/>
								</div>

							</th>)
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
				<table border="1" cellPadding="2" cellSpacing="0">
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
						data.map((m, i) => <Tr key={m.id} model={m} fields={fields} even_odd={i}
						                       isSubTable={isSubTable}/>)
					}
					</tbody>
				</table>
			)
		}
		return tpl;
	}
}

Table.propTypes = {
	data:                PropTypes.array,
	onChangeSearchField: PropTypes.func,
	isSubTable:          PropTypes.bool,
};