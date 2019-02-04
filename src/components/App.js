import React, { Component } from 'react';
import image from '../assets/images/placeholder.png';

export default class App extends Component {
	render() {
		return (
			<div>
				<h1 className="title"> das </h1>
				<img src={image} alt="" />
			</div>
		);
	}
}
