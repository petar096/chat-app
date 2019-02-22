class Modal extends React.Component {
	constructor(props) {
		super(props);
		// These two containers are siblings in the DOM
		const modalRoot = document.getElementById('modal-root');

		this.el = document.createElement('div');
	}

	componentDidMount() {
		modalRoot.appendChild(this.el);
	}

	componentWillUnmount() {
		modalRoot.removeChild(this.el);
	}

	render() {
		return ReactDOM.createPortal(
			<div className="modal-container">{this.props.children}</div>,
			this.el
		);
	}
}

export default Modal;
