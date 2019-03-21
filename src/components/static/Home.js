import React from 'react';
import { getUserById } from '../../store/actions/authActions';
import { getChats, sendMessage } from '../../store/actions/chatActions';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Home = props => {
	const { t } = useTranslation();

	return (
		<div>
			<h1 className="primary-heading" style={{ marginTop: '5rem' }}>
				{' '}
				{t('wellcome')}
			</h1>
		</div>
	);
};

const mapStateToProps = state => ({
	user: state.auth
});

export default connect(
	mapStateToProps,
	{ getUserById, getChats, sendMessage }
)(Home);
