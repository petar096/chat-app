import React from 'react';
import { useTranslation } from 'react-i18next';

const ChatForm = ({ handleOnSubmit, handleOnChange, message }) => {
	const { t } = useTranslation();
	return (
		<div className="conversation__form">
			<form className="message-form" onSubmit={handleOnSubmit}>
				<input
					type="text"
					autoComplete="off"
					className="message-input"
					onChange={handleOnChange}
					name="message"
					value={message}
					placeholder={t('typeMsg')}
				/>
				<div className="action-buttons-container">
					<button className="send-button" type="submit">
						<i className="fa fa-location-arrow" />
					</button>
					<a href="#0" className="input-actions">
						<i className="fa fa-film" />
					</a>
					<a href="#0" className="input-actions">
						<i className="fa fa-paperclip" />
					</a>
				</div>
			</form>
		</div>
	);
};
export default ChatForm;
