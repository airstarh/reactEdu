import React from 'react';

export class XXX extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			XXX: null,
		};
	}

	static getDerivedStateFromProps(props, state) {
		let statusChanged        = false;
		const toReturn           = {};
		const checkPropertyNames = [
			"pageCurrentNumber",
			"pageSize",
			"rowsTotal",
		];
		checkPropertyNames.map(p => {
			if (props[p] !== state[p]) {
				statusChanged = true;
				toReturn[p]   = props[p]
			}
		});
		return statusChanged ? toReturn : null;
	}

	render() {
		return (
			<div>
				XXX
			</div>
		);
	}
}