import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../firebase/config';
import { setUser } from '../store/actions/authActions';
import { startLoading, finishLoading } from '../store/actions/loadingActions';

import AppRouter from '../routing/AppRouter';
import Spinner from './common/Spinner';

class App extends Component {
	componentDidMount() {
		this.props.startLoading();

		this.listener = auth.onAuthStateChanged(authUser => {
			console.log(authUser);
			if (authUser) {
				this.props.setUser(authUser.uid).then(() => this.props.finishLoading());
			} else {
				this.props.finishLoading();
			}
		});
	}

	componentWillUnmount() {
		this.listener();
	}

	render() {
		return (
			<React.Fragment>
				{this.props.isLoading ? <Spinner /> : <AppRouter />}
			</React.Fragment>
		);
	}
}

const mapStateFromProps = state => ({
	user: state.auth,
	isLoading: state.isLoading
});

const mapDispatchToProps = dispatch => ({
	setUser: user => dispatch(setUser(user)),
	startLoading: () => dispatch(startLoading()),
	finishLoading: () => dispatch(finishLoading())
});
export default connect(
	mapStateFromProps,
	mapDispatchToProps
)(App);
