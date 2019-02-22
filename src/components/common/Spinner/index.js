import React from 'react';
import './_Spinner.scss';
import Modal from '../Modal';

const Spinner = () => (
	<Modal>
		<div className="lds-ripple">
			<div />
			<div />
		</div>
	</Modal>
);

export default Spinner;
