import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../../store/actions/authActions';
import './_Login.scss';

import InputField from '../../common/InputField';
import Button from '../../common/Button';
import Alert from '../../common/Alert';
import Footer from '../../layout/Footer';
import { PASSWORD_FORGET } from '../../../constants/routes';
import { withRouter } from 'react-router-dom';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			remeberMe: false,
			error: ''
		};

		// functions
		this.handleChange = this.handleChange.bind(this);
		this.handleCheckbox = this.handleCheckbox.bind(this);
		this.handleError = this.handleError.bind(this);
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
	}

	handleOnSubmit(e) {
		e.preventDefault();

		console.log(this.props);
		const login = () =>
			this.props.signIn(this.state.email, this.state.password);
	}

	handleChange(e) {
		const { email, password } = this.state;
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleError(type, msg) {
		return <Alert type={type} msg={msg} />;
	}

	handleCheckbox(e) {
		this.setState({
			remeberMe: !this.state.remeberMe
		});
	}

	render() {
		return (
			<React.Fragment>
				{this.state.error ? <Alert type="success" msg="Error" /> : null}
				<h2 className="primary-heading">Food-order</h2>
				<h4 className="subheading">
					Welcome back!Please login to your account.
				</h4>
				<form className="form" onSubmit={this.handleOnSubmit}>
					<InputField
						type="email"
						name="email"
						label="Email"
						onChange={this.handleChange}
						value={this.state.username}
					/>
					<InputField
						type="password"
						name="password"
						label="Password"
						onChange={this.handleChange}
						value={this.state.password}
					/>
					<div className="form-group-inline">
						<label className="container">
							<input
								type="checkbox"
								name="remeberMe"
								onChange={this.handleCheckbox}
								checked={this.state.remeberMe}
							/>{' '}
							<span className="checkmark" />
							Remember me
						</label>

						<Link
							to={PASSWORD_FORGET}
							style={{
								marginLeft: 'auto',
								fontSize: '1.8rem',
								textDecoration: 'none'
							}}>
							Forgot Password?
						</Link>
					</div>

					<div className="form-group-inline" style={{ marginTop: '4rem' }}>
						<Button text="Login" className="btn--primary btn-block" />
						<Link to="/signup" style={{ width: '100%', marginLeft: '2rem' }}>
							<Button text="Sign up" className="btn--secondary btn-block" />
						</Link>
					</div>
				</form>
				<Footer />
			</React.Fragment>
		);
	}
}
export default connect(
	null,
	{ signIn }
)(withRouter(Login));
