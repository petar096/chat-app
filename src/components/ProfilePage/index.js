import React from 'react';
import { connect } from 'react-redux';
import Avatar from '../common/Avatar';

const ProfilePage = props => {
	return (
		<div>
			<Avatar src={props.user.avatar} />
			<h1>{props.user.firstName}</h1>
			<h1>{props.user.lastName}</h1>
			<h1>{props.user.email}</h1>
		</div>
	);
};

const mapStateFromProps = state => ({
	user: state.auth
});

export default connect(
	mapStateFromProps,
	null
)(ProfilePage);
