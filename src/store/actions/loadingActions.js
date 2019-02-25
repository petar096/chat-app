export const startLoading = () => dispatch => {
	console.log('ovde');
	dispatch({
		type: 'LOADING_START'
	});
};

export const finishLoading = () => dispatch => {
	dispatch({
		type: 'LOADING_FINISH'
	});
};
