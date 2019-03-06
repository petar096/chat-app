export const startLoading = () => {
	console.log('start');

	return {
		type: 'LOADING_START'
	};
};

export const finishLoading = () => {
	console.log('finish');
	return {
		type: 'LOADING_FINISH'
	};
};
