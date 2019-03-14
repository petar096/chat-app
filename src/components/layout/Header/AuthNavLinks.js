import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../store/actions/authActions';
import img from '../../../assets/images/user.png';
import Avatar from '../../common/Avatar';
import Capitalize from '@helpers/Capitalize';

const AuthNavLinks = props => {
	return (
		<React.Fragment>
			<li>
				<a href="#0" className="nav__link">
					<i className="fa fa-bullseye" />
				</a>
			</li>
			<li>
				<a href="#0" className="nav__link">
					<i className="fa fa-comments-o" />
				</a>
			</li>
			<li>
				<a href="#" className="nav__link">
					<i className="fa fa-bell" />
				</a>
			</li>
			{props.auth.firstName === '' ? (
				<p>Loading...</p>
			) : (
				<div className="user">
					<span className="user__username">
						{Capitalize(props.auth.firstName)} {Capitalize(props.auth.lastName)}
					</span>
					<i className="fa fa-chevron-down" />
					<Avatar
						src={props.auth.avatar ? props.auth.avatar : img}
						alt="User avatar image"
						size="sm"
					/>
					<div className="dropdown">
						<NavLink to="/profile" className="dropdown__link">
							My profile
						</NavLink>
						<a href="#" onClick={props.logout} className="dropdown__link">
							Logout
						</a>
					</div>
				</div>
			)}
		</React.Fragment>
	);
};

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(signOut())
});
const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthNavLinks);
