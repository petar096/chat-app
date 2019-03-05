import React from 'react';
import './_SearchInput.scss';

const SearchInput = props => {
	return (
		<div
			className={props.large ? 'search-box search-box--block' : 'search-box'}>
			<i className="fa fa-search" />
			<input
				type="text"
				className="search-box__input"
				placeholder="Search for places, invoices"
				onChange={props.onChange}
				name={props.name}
				autoComplete={props.autoComplete}
				value={props.value}
			/>
		</div>
	);
};
export default SearchInput;
