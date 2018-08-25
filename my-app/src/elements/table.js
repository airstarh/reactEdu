import React from 'react';
import {Tr}  from "./tr";

export class Table extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
	}

	componentDidMount() {
		this.setState({data: this.props.data})
	}

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

		return (
			<table border="1" cellPadding="5" cellSpacing="0">
				{
					data.map((m) => <Tr model={m}/>)
				}
			</table>
		);
	}
}