import React from 'react';
import './_Spinner.scss';
import Modal from '../Modal';

const Spinner = () => (
	<Modal>
		<div style={{ margin: 'auto', textAlign: 'center' }}>
			<h1 className="primary-heading" style={{ color: '#fff' }}>
				Loading...
			</h1>
			<div className="lds-ring">
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	</Modal>
);

export default Spinner;
