import React from 'react';
// import withAuthorization from '../../routing/PublicRoute';
import { Link } from 'react-router-dom';
import { getUserById } from '../../store/actions/authActions';
import { connect } from 'react-redux';

const Home = props => {
	const getUserById = function(id) {
		props
			.getUserById(id)
			.then(doc => console.log(doc.data()))
			.catch();
	};
	return (
		<React.Fragment>
			<h1>Home page</h1>
			<Link to="/signin">Login</Link>
			<button onClick={() => getUserById(props.user.id)}>Click</button>
		</React.Fragment>
	);
};

const mapStateToProps = state => ({
	user: state.auth
});

export default connect(
	mapStateToProps,
	{ getUserById }
)(Home);
