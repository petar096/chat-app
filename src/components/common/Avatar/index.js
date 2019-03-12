import React from 'react';
import './_Avatar.scss';
import defaultAvatar from '@images/46.jpg';

const Avatar = ({ src, large, style, alt }) => {
	return (
		<img
			src={src}
			className={large ? 'avatar avatar--lg' : 'avatar'}
			onError={e => (e.target.src = defaultAvatar)}
			style={style}
			alt={alt}
		/>
	);
};
export default Avatar;
