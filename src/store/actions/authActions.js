import { auth } from '../../firebase/config';
import { SIGN_IN, LOG_OUT } from '../types/authConstants';

export const signIn = () => dispatch => {
	auth
		.signInWithEmailAndPassword('admin@admin.com', 'admin123')
		.then(data => {
			let user = data.user;
			console.log(user);
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

export const signOut = () => dispatch => {
	auth.signOut();
	dispatch({
		type: LOG_OUT
	});
};
