import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	signIn,
	signInWithGoogle,
	getUserById
} from '../../../store/actions/authActions';
import './_Login.scss';

import { Field, reduxForm } from 'redux-form';

import InputField from '../../common/InputField';
import Button from '../../common/Button';
import Footer from '../../layout/Footer';
import { PASSWORD_FORGET } from '../../../constants/routes';

const validate = values => {
	const errors = {};
	if (!values.password) {
		errors.password = 'Required';
	} else if (values.password.length > 15) {
		errors.password = 'Must be 15 characters or less';
	}
	if (!values.email) {
		errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}

	return errors;
};
const warn = values => {
	const warnings = {};
	if (values.email && values.email.includes('admin.com')) {
		console.log(values.email.includes('admin'));
		warnings.email = 'Hmm, that looks little sketchy';
	}
	return warnings;
};

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
		this.handleCheckbox = this.handleCheckbox.bind(this);
	}

	handleCheckbox() {
		this.setState({
			remeberMe: !this.state.remeberMe
		});
	}

	render() {
		const { handleSubmit, reset, submitting } = this.props;

		return (
			<React.Fragment>
				{/* {this.state.error ? <Alert type="success" msg="Error" /> : null} */}
				<h2 className="primary-heading">Food-order</h2>
				<h4 className="subheading">
					Welcome back!Please login to your account.
				</h4>
				<form
					className="form"
					onSubmit={handleSubmit(({ email, password }) => {
						this.props.signIn(email, password);
						reset();
					})}>
					<Field
						type="email"
						name="email"
						label="Email"
						component={InputField}
					/>
					<Field
						type="password"
						name="password"
						label="Password"
						component={InputField}
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
						<Button
							text="Login"
							className="btn--primary btn-block"
							type="submit"
							disabled={submitting}
						/>
						<Button
							text={<i className="fa fa-google" />}
							type="button"
							className="btn--google btn-block"
							onClick={this.props.signInWithGoogle}
							style={{ marginRight: '0' }}
						/>
					</div>
				</form>
				<Footer />
			</React.Fragment>
		);
	}
}
export default connect(
	null,
	{ signIn, signInWithGoogle, getUserById }
)(
	reduxForm({
		form: 'loginForm',
		validate,
		warn
	})(Login)
);
