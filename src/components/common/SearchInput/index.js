import React from 'react';
import './_SearchInput.scss';
import { useTranslation } from 'react-i18next';

const SearchInput = props => {
	const { t } = useTranslation();
	return (
		<div
			className={props.large ? 'search-box search-box--block' : 'search-box'}>
			<i
				className="fa fa-search"
				onClick={props.onClick ? props.onClick : null}
			/>
			<input
				type="text"
				className={`search-box__input ${
					props.className ? props.className : ''
				}`}
				placeholder={t('search')}
				onChange={props.onChange}
				name={props.name}
				autoComplete={props.autoComplete}
				value={props.value}
			/>
		</div>
	);
};
export default SearchInput;
