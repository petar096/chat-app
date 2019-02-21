import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signInWithGoogle } from '../../../store/actions/authActions';
import { Field, reduxForm } from 'redux-form';

import './_Login.scss';

import { PASSWORD_FORGET, SIGN_UP } from '../../../constants/routes';

import InputField from '../../common/InputField';
import Button from '../../common/Button';
import Footer from '../../layout/Footer';
import { warn, validate } from './validate';

class Login extends Component {
	render() {
		const { handleSubmit, reset, submitting } = this.props;

		return (
			<React.Fragment>
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
						<Field
							type="checkbox"
							name="rememberMe"
							component={InputField}
							label="Remeber me"
						/>
						<Link to={PASSWORD_FORGET} className="forgot-password-link">
							Forgot Password?
						</Link>
					</div>
					<div className="inline-wrapper">
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
						/>
					</div>
				</form>
				<Link
					to={SIGN_UP}
					style={{
						marginTop: '3rem',
						textDecoration: 'underline',
						fontSize: '1.8rem'
					}}>
					Don't have account? Sign up for free.
				</Link>
				<Footer />
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	signIn: (email, password) => dispatch(signIn(email, password)),
	signInWithGoogle: () => dispatch(signInWithGoogle())
});

export default connect(
	null,
	mapDispatchToProps
)(
	reduxForm({
		form: 'loginForm',
		validate,
		warn
	})(Login)
);
