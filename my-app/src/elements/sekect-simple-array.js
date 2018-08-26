import React from 'react';

export class SelectSimpleArray extends React.Component {
	constructor(props) {
		super(props);

		this.onChangeValue = this.onChangeValue.bind(this);
	}

	onChangeValue(e){
		this.props.onChangeValue(e);
	}

	render() {
		const arr = this.props.arr;
		const sel = this.props.sel;

		return (
			<select name="model" value={sel} onChange={this.onChangeValue}>
				{arr.map((e,i)=> <option key={i} value={e}>{e}</option>)}
			</select>
		);
	}
}