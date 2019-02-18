import { auth, app } from '../../firebase/config';
import { toastr } from 'react-redux-toastr';
import { SIGN_IN, LOG_OUT, SET_USER } from '../types/authConstants';

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
			toastr.success('Log in', 'You have signed in successfull');
		})
		.catch(err => toastr.error('Login error', 'Invalid credentials'));
};
export const setUser = user => dispatch => {
	dispatch({
		type: SET_USER,
		user: {
			id: user.uid,
			email: user.email
		}
	});
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
	toastr.success('Sign out', 'You have successfully signed out');
};

export const signInWithGoogle = () => dispatch => {
	console.log('clicked');
	const provider = new app.auth.GoogleAuthProvider();
	auth
		.signInWithPopup(provider)
		.then(data => {
			let user = data.user;
			dispatch({
				type: SIGN_IN,
				user: {
					id: user.uid,
					email: user.email
				}
			});
			toastr.success('Log in', 'You have signed in successfull');
		})
		.catch(err => console(err));
};
