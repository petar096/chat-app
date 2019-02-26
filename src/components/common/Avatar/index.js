import React from 'react';
import './_Avatar.scss';

const Avatar = ({ src, large, style, alt }) => {
	return (
		<img
			src={src}
			className={large ? 'avatar avatar--lg' : 'avatar'}
			style={style}
			alt={alt}
		/>
	);
};
export default Avatar;
