export const startLoading = () => {
	return {
		type: 'LOADING_START'
	};
};

export const finishLoading = () => {
	return {
		type: 'LOADING_FINISH'
	};
};
