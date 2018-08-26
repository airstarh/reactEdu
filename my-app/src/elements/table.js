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

		return (
			<table border="1" cellPadding="5" cellSpacing="0">
				<tbody>
				{
					data.map((m) => <Tr key={m.id} model={m}/>)
				}
				</tbody>
			</table>
		);
	}
}