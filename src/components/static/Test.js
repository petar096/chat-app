import React from 'react';
import Card from '@common/Card';
import Modal from '../common/Modal';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux';
import AvatarUploader from '../common/AvatarUploader';
import img from '@images/46.jpg';

const Test = props => {
	return (
		// <div style={{ marginTop: '20rem' }}>
		// 	<Card />
		// </div>
		<AvatarUploader avatar={img} />
		// <Modal>
		// 	{props.isLoading}
		// 	<Spinner />
		// </Modal>
	);
};
const mapStateToProps = ({ isLoading }) => ({ isLoading });
export default connect(
	mapStateToProps,
	null
)(Test);
