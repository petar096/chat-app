export const startLoading = () => dispatch => {
	console.log('ovde');
	dispatch({
		type: 'LOADING_START'
	});
};

export const finishLoading = () => ({ type: 'LOADING_FINISH' });
