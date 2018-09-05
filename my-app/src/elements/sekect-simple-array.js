import React from 'react';

export class SelectSimpleArray extends React.Component {
	constructor(props) {
		super(props);

		this.onChangeValue = this.onChangeValue.bind(this);
	}

	onChangeValue(e){
		console.log("SELECTION CHANGED ++++++++++");
		console.log(e.target.name);
		console.log(e.target.value);
		this.props.onChangeValue(e);
	}

	render() {
		const arr = this.props.arr;
		const sel = this.props.sel;

		return (
			<select
				name={this.props.theName ? this.props.theName : "model"}
				value={sel}
				onChange={this.onChangeValue}
			>
				{arr.map((e,i)=> <option key={i} value={e}>{e}</option>)}
			</select>
		);
	}
}