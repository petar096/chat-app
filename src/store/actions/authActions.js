import { auth, app, db } from '../../firebase/config';
import { toastr } from 'react-redux-toastr';
import { SIGN_IN, LOG_OUT, SET_USER } from '../types/authConstants';
import { startLoading, finishLoading } from './loadingActions';

export const signIn = (email, password) => dispatch => {
	dispatch(startLoading());
	auth
		.signInWithEmailAndPassword(email, password)
		.then(data => {
			let user = data.user;
			dispatch(setUser(user));
			dispatch(finishLoading());
			toastr.success('Log in', 'You have signed in successfull');
		})
		.catch(err => toastr.error('Login error', err.message));
};

export const setUser = user => dispatch => {
	dispatch({
		type: SET_USER,
		user: {
			id: user.uid,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			password: user.password,
			rePassword: user.rePassword
		}
	});
};

export const signUp = user => () => {
	auth
		.createUserWithEmailAndPassword(user.email, user.password)
		.then(data => {
			db.collection('users')
				.doc(data.user.uid)
				.set({ ...user });
		})
		.catch(err => toastr.error('Sign up error', err.message));
};

export const signOut = () => dispatch => {
	auth.signOut().then(() =>
		dispatch({
			type: LOG_OUT
		})
	);
	toastr.info('Sign out', 'You have successfully signed out', {
		timeOut: 1000
	});
};

export const signInWithGoogle = () => dispatch => {
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
		.catch(err => toastr.error('Login error', 'Invalid credentials'));
};

export const resetPassword = email => () => {
	auth
		.sendPasswordResetEmail(email)
		.then(() =>
			toastr.success('Password reset', 'Your password was sent to your email')
		)
		.catch(err => toastr.error('Error', err.message));
};

export const getUserById = id => () => {
	return db
		.collection('users')
		.doc(id)
		.get();
};

export const getUsersByName = name => {
	return db
		.collection('users')
		.where('firstName', '==', name)
		.get();
};
