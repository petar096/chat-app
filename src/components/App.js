import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../firebase/config';
import { setUser, getUserById } from '@actions/authActions';
import { startLoading, finishLoading } from '@actions/loadingActions';

import AppRouter from '../routing/AppRouter';
import Spinner from './common/Spinner';

class App extends Component {
	componentDidMount() {
		const {
			setUser,
			getUserById,
			finishLoading,
			startLoading,
			user,
			isLoading
		} = this.props;
		startLoading();
		console.log(user);

		this.listener = auth.onAuthStateChanged(authUser => {
			if (authUser) {
				getUserById(authUser.uid).then(data => {
					setUser({
						id: authUser.uid,
						email: data.data().email,
						firstName: data.data().firstName,
						lastName: data.data().lastName
					});
				});
			}
		});
	}

	componentWillUnmount() {
		this.listener();
	}

	render() {
		return (
			<React.Fragment>
				{this.props.user && this.props.isLoading ? <Spinner /> : <AppRouter />}
			</React.Fragment>
		);
	}
}

const mapStateFromProps = state => ({
	user: state.auth,
	isLoading: state.isLoading
});

const mapDispatchToProps = dispatch => ({
	getUserById: id => getUserById(id),
	setUser: user => dispatch(setUser(user)),
	startLoading: () => dispatch(startLoading()),
	finishLoading: () => dispatch(finishLoading())
});
export default connect(
	mapStateFromProps,
	mapDispatchToProps
)(App);
