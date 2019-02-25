import React from 'react';
import './_Spinner.scss';
import Modal from '../Modal';

const Spinner = () => (
	<Modal>
		<div className="lds-ring">
			<h1>Loading..</h1>
			<div />
			<div />
			<div />
			<div />
		</div>
	</Modal>
);

export default Spinner;
