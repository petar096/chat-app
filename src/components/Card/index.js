import React from 'react';
import './_Card.scss';
import img from '../../assets/images/46.jpg';

const Card = props => {
	return (
		<div className="card">
			<div className="card__heading">
				<span className="">Don Pizza</span>
				<span className={props.status ? 'status status--active' : 'status'}>
					Active
				</span>
			</div>
			<div className="card__content">
				<div className="content"> Havariju </div>
			</div>
			<div className="card__footer">
				<img className="user-avatar" alt="User avatar image" src={img} />
				<div className="user-info">
					David Lee created order
					<spn>4 min ago</spn>
				</div>
			</div>
		</div>
	);
};

export default Card;
