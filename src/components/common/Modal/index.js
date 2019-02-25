import React from 'react';
import ReactDOM from 'react-dom';
import './_Modal.scss';

class Modal extends React.Component {
	constructor(props) {
		super(props);

		this.modalRoot = document.getElementById('modal-root');

		this.el = document.createElement('div');
	}

	componentDidMount() {
		this.modalRoot.appendChild(this.el);
	}

	componentWillUnmount() {
		this.modalRoot.removeChild(this.el);
	}

	render() {
		return ReactDOM.createPortal(
			<div className="modal-container">{this.props.children}</div>,
			this.el
		);
	}
}

export default Modal;
