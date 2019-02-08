import React, { Component } from 'react';
import InputField from './helpers/InputField';

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			rePassword: ''
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
			<div className="parent">
				<div className="child-div left-side" />
				<div className="child-div right-side">
					<div>
						<h2 className="primary-heading">Food-order</h2>
						<h4 className="subheading">
							Plaease complete to create your account
						</h4>
						<form className="form">
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

							<button className="btn">Sign up</button>
						</form>
						<a
							href=""
							style={{
								display: 'block',
								textAlign: 'center',
								fontSize: '1.7rem',
								letterSpacing: '.1rem'
							}}>
							Already have account?Sign in.
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default SignUp;
