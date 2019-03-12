import React from 'react';
import Card from '@common/Card';
import Modal from '../common/Modal';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux';

const Test = props => {
	return (
		<div style={{ marginTop: '20rem' }}>
			<Card />
		</div>

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
