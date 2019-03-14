import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../firebase/config';
import { setUser, getUserById } from '@actions/authActions';
import { startLoading, finishLoading } from '@actions/loadingActions';

import AppRouter from '../routing/AppRouter';
import Spinner from './common/Spinner';

import 'react-circular-progressbar/dist/styles.css';

class App extends Component {
	componentDidMount() {
		const { setUser, getUserById, startLoading } = this.props;
		// startLoading();

		this.listener = auth.onAuthStateChanged(authUser => {
			if (authUser) {
				getUserById(authUser.uid).then(data => {
					setUser({
						id: authUser.uid,
						email: data.data().email,
						username: data.data().username,
						firstName: data.data().firstName,
						lastName: data.data().lastName,
						avatar: data.data().avatar
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
