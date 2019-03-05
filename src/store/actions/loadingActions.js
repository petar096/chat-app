export const startLoading = () => dispatch => {
	dispatch({
		type: 'LOADING_START'
	});
};

export const finishLoading = () => dispatch => {
	console.log('ovde');
	dispatch({
		type: 'LOADING_FINISH'
	});
};
