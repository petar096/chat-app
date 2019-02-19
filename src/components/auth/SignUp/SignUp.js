import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../../store/actions/authActions';

import { SIGN_IN } from '../../../constants/routes';

import InputField from '../../common/InputField';
import Button from '../../common/Button';
// import Alert from '../../common/Alert';
import Footer from '../../layout/Footer';

import './_SignUp.scss';

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			rePassword: '',
			error: ''
		};

		// functions
		this.handleChange = this.handleChange.bind(this);
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleOnSubmit(e) {
		e.preventDefault();
		const { firstName, lastName, email, username, password } = this.state;

		let user = { email, password, username, password, firstName, lastName };
		this.props.signUp(user);
	}

	render() {
		return (
			<React.Fragment>
				{/* {this.state.error ? (
					<Alert type="error" msg={this.state.error} />
				) : null} */}

				<h2 className="primary-heading">Food-order</h2>
				<h4 className="subheading">Please complete to create your account</h4>

				<form className="form" onSubmit={this.handleOnSubmit}>
					<div className="form-group-inline">
						<InputField
							type="text"
							name="firstName"
							label="First Name"
							small={true}
							onChange={this.handleChange}
							value={this.state.firstName}
						/>
						<InputField
							type="text"
							small={true}
							name="lastName"
							label="Last Name"
							onChange={this.handleChange}
							value={this.state.lastName}
						/>
					</div>

					<InputField
						type="text"
						name="username"
						label="Username"
						onChange={this.handleChange}
						value={this.state.username}
					/>
					<InputField
						type="email"
						name="email"
						label="Email"
						onChange={this.handleChange}
						value={this.state.email}
					/>
					<InputField
						type="password"
						name="password"
						label="Password"
						onChange={this.handleChange}
						value={this.state.password}
					/>
					<InputField
						type="password"
						name="rePassword"
						label="Re password"
						onChange={this.handleChange}
						value={this.state.rePassword}
					/>
					<Button text="Sign up" className="btn--primary" />
				</form>
				<Link
					to={SIGN_IN}
					style={{
						display: 'block',
						textAlign: 'center',
						fontSize: '1.7rem',
						letterSpacing: '.1rem'
					}}>
					Already have account?Sign in.
				</Link>
				<Footer />
			</React.Fragment>
		);
	}
}

export default connect(
	null,
	{ signUp }
)(SignUp);
