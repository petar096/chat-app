import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../store/actions/authActions';
import { HOME_PAGE } from '../../../constants/routes';
import img from '../../../assets/images/46.jpg';
import Avatar from '../../common/Avatar';
import Capitalize from '../../common/helpers/Capitalize';

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
			<div className="user">
				<span className="user__username">
					{Capitalize(props.auth.firstName)} {Capitalize(props.auth.lastName)}
				</span>
				<i className="fa fa-chevron-down" />
				<Avatar src={img} alt="User avatar image" />
				<div className="dropdown">
					<NavLink to="" className="dropdown__link">
						dadas
					</NavLink>
					<a href="#" onClick={props.logout} className="dropdown__link">
						Logout
					</a>
				</div>
			</div>
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
