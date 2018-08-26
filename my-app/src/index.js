// import App                   from './App';
// import registerServiceWorker from './registerServiceWorker';
import React                 from 'react';
import ReactDOM              from 'react-dom';
import './index.css';
import {Ajax}              from './services/ajax'
import {Table}             from "./elements/table";
import {SelectSimpleArray} from "./elements/sekect-simple-array";

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
	}

	componentDidMount() {
		this.fetch();
	}

	handleChangeModels(event) {
		this.modelCurrent = this.q.getParams.m = event.target.value;
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
		const data = this.state.response.data;
		const meta = this.state.response.meta;
		return (
			<div>
				<div>
					<SelectSimpleArray arr={this.models} sel={this.modelCurrent} onChangeValue={this.handleChangeModels}/>
				</div>
				<Table data={data}/>
			</div>
		);
	}
}

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/**
 * Man: Lifting State Up
 * https://reactjs.org/docs/lifting-state-up.html
 * code:
 * https://codepen.io/gaearon/pen/WZpxpz?editors=0010
 */

const scaleNames = {
	c: 'Celsius',
	f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
	return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
	return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
	const input = parseFloat(temperature);
	if (Number.isNaN(input)) {
		return '';
	}
	const output  = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}

function BoilingVerdict(props) {
	if (props.celsius >= 100) {
		return <p>The water would boil.</p>;
	}
	return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.onTemperatureChange(e.target.value);
	}

	render() {
		const temperature = this.props.temperature;
		const scale       = this.props.scale;
		return (
			<fieldset>
				<legend>Enter temperature in {scaleNames[scale]}:</legend>
				<input value={temperature}
				       onChange={this.handleChange}/>
			</fieldset>
		);
	}
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.handleCelsiusChange    = this.handleCelsiusChange.bind(this);
		this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
		this.state                  = {temperature: '', scale: 'c'};
	}

	handleCelsiusChange(temperature) {
		this.setState({scale: 'c', temperature});
	}

	handleFahrenheitChange(temperature) {
		this.setState({scale: 'f', temperature});
	}

	render() {
		const scale       = this.state.scale;
		const temperature = this.state.temperature;
		const celsius     = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
		const fahrenheit  = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

		return (
			<div>
				<TemperatureInput
					scale="c"
					temperature={celsius}
					onTemperatureChange={this.handleCelsiusChange}/>
				<TemperatureInput
					scale="f"
					temperature={fahrenheit}
					onTemperatureChange={this.handleFahrenheitChange}/>
				<BoilingVerdict
					celsius={parseFloat(celsius)}/>
			</div>
		);
	}
}

ReactDOM.render(
	<Query/>,
	document.getElementById('root')
);
