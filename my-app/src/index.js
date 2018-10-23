// import App                   from './App';
// import registerServiceWorker from './registerServiceWorker';
import React               from 'react';
import ReactDOM            from 'react-dom';
import './index.css';
import {Ajax}              from './services/ajax'
import {Table}             from "./elements/table";
import {SelectSimpleArray} from "./elements/sekect-simple-array";
import {Pager}             from "./elements/pager";

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

class Query extends React.Component {

	q = {
		url:       "http://alinazero/alinaRestAccept",
		getParams: {
			cmd: "model",
			m:   "user",
			p:   1,
			ps:  5
		}
	};

	models       = [
		'user',
		'article',
		'hero',
		'role',
		'user_role',
	];
	modelCurrent = 'user';

	constructor(props) {
		super(props);

		this.state = {
			response: {
				data: []
			},
		};

		this.handleChangeModels = this.handleChangeModels.bind(this);
		this.handlePager        = this.handlePager.bind(this);
		this.handleChangeSearchF = this.handleChangeSearchF.bind(this);
	}

	componentDidMount() {
		this.fetch();
	}

	handleChangeModels(event) {
		this.modelCurrent = this.q.getParams.m = event.target.value;
		this.fetch();
	}

	handlePager(e) {
		if (e.Pager) {
			if (e.Pager.pageCurrentNumber) {
				this.q.getParams.p = e.Pager.pageCurrentNumber
			}
			if (e.Pager.pageSize) {
				this.q.getParams.p  = 1;
				this.q.getParams.ps = e.Pager.pageSize
			}
			this.fetch();
		}
	}

	handleChangeSearchF(fName, fValue){

		console.log("onChangeSearchField ++++++++++");
		console.log(arguments);

		this.q.getParams[fName] = fValue;
		this.fetch();
	}

	fetch() {
		new Ajax(this.q)
			.get()
			.then(
				(r) => {

					console.log("response ++++++++++");
					console.log(r);

					this.setState({response: r,});
				},
				(error) => {
					console.log("error ++++++++++");
					console.log(error);
				}
			)
	}


	render() {
		const data              = this.state.response.data;
		const meta              = this.state.response.meta || {};
		//region Pager
		const pageCurrentNumber = meta.pageCurrentNumber || this.q.getParams.p;
		const pageSize          = meta.pageSize || this.q.getParams.ps;
		const rowsTotal         = meta.rowsTotal || 0;
		//endregion Pager

		return (
			<div>
				<div>
					<SelectSimpleArray arr={this.models} sel={this.modelCurrent}
					                   onChangeValue={this.handleChangeModels}/>
				</div>
				<div>
					<Pager pageCurrentNumber={pageCurrentNumber} pageSize={pageSize} rowsTotal={rowsTotal}
					       onChangePage={this.handlePager}/>
				</div>
				<Table data={data} onChangeSearchField={this.handleChangeSearchF}/>
			</div>
		);
	}
}

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

ReactDOM.render(
	<Query/>,
	document.getElementById('root')
);
