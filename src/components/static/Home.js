import React from 'react';
import { getUserById } from '../../store/actions/authActions';
import { getChats, sendMessage } from '../../store/actions/chatActions';
import { connect } from 'react-redux';
import Card from '@common/Card';

const Home = props => {
	return (
		<div>
			<h1 className="primary-heading" style={{ marginTop: '5rem' }}>
				{' '}
				Wellcome to FOOD ORDER app
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
