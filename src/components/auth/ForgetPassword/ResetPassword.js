import React, { Component } from 'react';

import InputField from '../../common/InputField';
import Button from '../../common/Button';
import Footer from '../../layout/Footer';

class ResetPassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: ''
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		return (
			<React.Fragment>
				<h2 className="primary-heading">Food-order</h2>
				<h4 className="subheading">
					Welcome back!Please login to your account.
				</h4>
				<form className="form">
					<InputField
						autofocus={true}
						type="email"
						name="email"
						label="Email"
						onChange={this.handleChange}
						value={this.state.email}
					/>
					<Button text="Login" className="btn--primary" />
				</form>
				<Footer />
			</React.Fragment>
		);
	}
}

export default ResetPassword;
