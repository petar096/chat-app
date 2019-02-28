import React from 'react';
import img from '../../../../../assets/images/46.jpg';
import Avatar from '../../../../common/Avatar';
import { connect } from 'react-redux';

import './_Chat-list-item.scss';

const ChatListItem = props => {
	return (
		<React.Fragment>
			<a href="#" className="chat-list-item">
				<Avatar src={img} alt="User picture" />
				<div className="chat-list-item__content">
					<div className="chat-details">
						{' '}
						{props.participants[0] === props.user.email
							? props.participants[1]
							: props.participants[0]}
						{/* {props.email} */}
						<span className="chat-details__time">3min</span>
					</div>
					<p className="last-message">loreasdmnsdnsadsandjssdkjsbaskjsabdj</p>
				</div>
			</a>
		</React.Fragment>
	);
};

const mapStateToProps = state => ({
	user: state.auth
});

export default connect(
	mapStateToProps,
	null
)(ChatListItem);
