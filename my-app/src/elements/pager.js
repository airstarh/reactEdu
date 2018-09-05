import React               from 'react';
import {SelectSimpleArray} from "./sekect-simple-array";

export class Pager extends React.Component {
	pagesTotal      = 0;
	pagesTotalArray = 0;
	amountAvailable = [
		2,
		5,
		10,
		15,
		20,
		25,
		50,
		100,
		1000000
	];

	constructor(props) {
		super(props);
		this.state = {
			pageCurrentNumber: 1,
			pageSize:          5,
			rowsTotal:         0,
		};

		this.handleChangePage     = this.handleChangePage.bind(this);
		this.handleChangePageSize = this.handleChangePageSize.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		let statusChanged        = false;
		const toReturn           = {};
		const checkPropertyNames = [
			"pageCurrentNumber",
			"pageSize",
			"rowsTotal",
			//"onChangePage",
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

	handleChangePage(e) {
		// e.preventDefault();
		//e = e.nativeEvent;
		e.persist();
		const pageCurrentNumber   = e.target.dataset.pn;
		e.Pager                   = {};
		e.Pager.pageCurrentNumber = pageCurrentNumber;
		this.props.onChangePage(e);
	}

	handleChangePageSize(e) {
		// e.preventDefault();
		//e = e.nativeEvent;
		e.persist();
		const pageSize = e.target.value;
		e.Pager          = {};
		e.Pager.pageSize = pageSize;
		this.props.onChangePage(e);
	}

	render() {
		this.calcPagesTotal();
		const pagesTotalArray   = this.pagesTotalArray;
		const pageCurrentNumber = parseInt(this.state.pageCurrentNumber);

		return (
			<div className="pager">
				<button
					onClick={this.handleChangePage}
					data-pn="1"
				>
					&lt;&lt;&lt;
				</button>

				<button
					onClick={this.handleChangePage}
					data-pn={pageCurrentNumber - 1}
				>
					&lt;
				</button>

				{pagesTotalArray.map(pn => {
					return (
						<button
							key={pn}
							onClick={this.handleChangePage}
							data-pn={pn}
							className={pn == pageCurrentNumber ? 'current' : ''}
						>
							{pn}
						</button>
					);
				})}

				<button
					onClick={this.handleChangePage}
					data-pn={pageCurrentNumber + 1}
				>
					&gt;
				</button>

				<button
					onClick={this.handleChangePage}
					data-pn={this.pagesTotal}
				>
					&gt;&gt;&gt;
				</button>
				<span>
					<SelectSimpleArray theName="amount" arr={this.amountAvailable} sel={this.state.pageSize}
					                   onChangeValue={this.handleChangePageSize}/>
				</span>
			</div>
		);
	}
}