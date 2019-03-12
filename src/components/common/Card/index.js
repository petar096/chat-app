import React from 'react';
import './_Card.scss';
import img from '@images/46.jpg';

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
				<div className="content">
					<button className="btn btn--primary"> Add </button>
				</div>
			</div>
			<div className="card__footer">
				<img className="user-avatar" alt="User avatar image" src={img} />
				<div className="user-info">
					<span className="user-info__username"> David Lee</span> created order
					<span className="user-info__time">4 min ago</span>
				</div>
			</div>
		</div>
	);
};

export default Card;
