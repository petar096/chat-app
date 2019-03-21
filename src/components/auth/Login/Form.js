import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signInWithGoogle } from '../../../store/actions/authActions';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';

import './_Login.scss';

import { PASSWORD_FORGET, SIGN_UP } from '../../../constants/routes';

import InputField from '../../common/InputField';
import Button from '../../common/Button';
import Footer from '../../layout/Footer';
import { warn, validate } from './validate';

class Login extends Component {
	render() {
		const { handleSubmit, t, submitting } = this.props;

		return (
			<React.Fragment>
				<h2 className="primary-heading">Food-order</h2>
				<h4 className="subheading">{t('loginMsg')}</h4>
				<form
					className="form"
					onSubmit={handleSubmit(({ email, password }) =>
						this.props.signIn(email, password)
					)}>
					<Field
						type="email"
						name="email"
						label={t('email')}
						component={InputField}
					/>
					<Field
						type="password"
						name="password"
						label={t('password')}
						component={InputField}
					/>
					<div className="form-group-inline">
						<Field
							type="checkbox"
							name="rememberMe"
							component={InputField}
							label={t('rememberMe')}
						/>
						<Link to={PASSWORD_FORGET} className="forgot-password-link">
							{t('forgotPass')}
						</Link>
					</div>
					<div className="inline-wrapper">
						<Button
							text={t('login')}
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
						fontSize: '1.8rem',
						display: 'block',
						textAlign: 'center'
					}}>
					{t('dontHaveAcc')}
				</Link>
				<Footer />
			</React.Fragment>
		);
	}
}

export default connect(
	null,
	{ signIn, signInWithGoogle }
)(
	reduxForm({
		form: 'loginForm',
		validate,
		warn
	})(withTranslation()(Login))
);
