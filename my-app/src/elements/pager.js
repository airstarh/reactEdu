import React from 'react';

export class Pager extends React.Component {
	pagesTotal      = 0;
	pagesTotalArray = 0;

	constructor(props) {
		super(props);
		this.state = {
			pageCurrentNumber: 1,
			pageSize:          5,
			rowsTotal:         0,
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

	calcPagesTotal() {
		let rowsTotal = this.state.rowsTotal;
		let pageSize  = this.state.pageSize;
		if (pageSize <= 0) {
			pageSize = this.state.pageSize = rowsTotal
		}
		let pagesTotal       = Math.ceil(rowsTotal / pageSize);
		this.pagesTotal      = pagesTotal;
		this.pagesTotalArray = new Array(pagesTotal).fill(0).map(function (v, i) {
			return i + 1
		});
	}

	render() {
		return (
			<div className="pager">
				XXX
			</div>
		);
	}
}