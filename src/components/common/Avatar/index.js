import React from 'react';
import './_Avatar.scss';
import defaultAvatar from '@images/46.jpg';

const Avatar = ({ src, size = 'sm', style, alt }) => {
	return (
		<img
			src={src}
			className={`avatar avatar--${size}`}
			onError={e => (e.target.src = defaultAvatar)}
			style={style}
			alt={alt}
		/>
	);
};
export default Avatar;
