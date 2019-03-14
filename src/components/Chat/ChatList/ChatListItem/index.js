import React from 'react';
import Avatar from '@common/Avatar';
import { connect } from 'react-redux';
import './_Chat-list-item.scss';
import Capitalize from '@helpers/Capitalize';

const ChatListItem = ({ data, onClick, img, auth }) => {
	return (
		<React.Fragment>
			<a className="chat-list-item" onClick={onClick}>
				<Avatar src={img} alt="User picture" />
				<div className="chat-list-item__content">
					<div className="chat-details">
						{data.firstName
							? `${Capitalize(data.firstName)}  ${Capitalize(data.lastName)}`
							: Capitalize(data)}
						{data.id === auth.id ? ` (you)` : null}
					</div>
					<p className="last-message">
						i <i className="fa fa-heart" style={{ color: 'red' }} /> Firebase
					</p>
				</div>
			</a>
		</React.Fragment>
	);
};

const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(
	mapStateToProps,
	null
)(ChatListItem);
