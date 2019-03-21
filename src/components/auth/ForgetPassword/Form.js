import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetPassword } from '../../../store/actions/authActions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import InputField from '../../common/InputField';
import Button from '../../common/Button';
import Footer from '../../layout/Footer';
import { SIGN_IN } from '../../../constants/routes';

class ResetPassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.resetPassword = this.resetPassword.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	resetPassword(e) {
		e.preventDefault();

		this.props.resetPassword(this.state.email);
	}

	render() {
		const { t } = this.props;
		return (
			<React.Fragment>
				<h2 className="primary-heading">Food-order</h2>
				<h4 className="subheading">{t('forgotPassMsg')}</h4>
				<form className="form" onSubmit={this.resetPassword}>
					<Field
						type="email"
						name="email"
						label="Email"
						component={InputField}
					/>
					<Button
						text={t('sendReq')}
						className="btn--primary btn-block"
						style={{ margin: '0 auto' }}
					/>
				</form>
				<Link to={SIGN_IN} className="have-account-link">
					{t('alreadyHaveAcc')}
				</Link>
				<Footer />
			</React.Fragment>
		);
	}
}

export default connect(
	null,
	{ resetPassword }
)(
	reduxForm({
		form: 'resetForm'
	})(withTranslation()(ResetPassword))
);
