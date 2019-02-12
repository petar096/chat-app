import { auth } from '../../firebase/config';
import { SIGN_IN, LOG_OUT } from '../types/authConstants';

export const signIn = (email, password) => dispatch => {
	auth
		.signInWithEmailAndPassword(email, password)
		.then(data => {
			let user = data.user;
			dispatch({
				type: SIGN_IN,
				user: {
					id: user.uid,
					email: user.email
				}
			});
		})
		.catch(err => console.log(err));
};

export const signUp = user => dispatch => {
	auth
		.createUserWithEmailAndPassword(user.email, user.password)
		.then(data => {
			console.log(data);
		})
		.catch();
};

export const signOut = () => dispatch => {
	auth.signOut().then(() =>
		dispatch({
			type: LOG_OUT
		})
	);
};
