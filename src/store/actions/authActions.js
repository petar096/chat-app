import { auth, app, db } from '../../firebase/config';
import { toastr } from 'react-redux-toastr';
import { LOG_OUT, SET_USER } from '../types/authConstants';
import { finishLoading, startLoading } from '@actions/loadingActions';

export const signIn = (email, password) => dispatch => {
	auth
		.signInWithEmailAndPassword(email, password)
		.then(data => {
			let user = data.user;
			getUserById(user.uid).then(data => {
				dispatch(
					setUser({
						id: user.uid,
						email: user.email,
						username: user.username,
						firstName: data.data().firstName,
						lastName: data.data().lastName
					})
				);
			});

			console.log(user);
			toastr.success('Log in', 'You have signed in successfull');
		})
		.catch(err => toastr.error('Login error', err.message));
};

export const setUser = user => ({
	type: SET_USER,
	user
});

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
		.then(googleUser => {
			getUserById(googleUser.user.uid).then(data => {
				if (!data.exists) {
					const displayName = googleUser.user.displayName.split(' ');
					const user = {
						email: googleUser.user.email,
						username: `${displayName[0].toLowerCase()} ${displayName[1].toLowerCase()}`,
						firstName: displayName[0].toLowerCase(),
						lastName: displayName[1].toLowerCase(),
						avatar: googleUser.additionalUserInfo.profile.picture
					};

					db.collection('users')
						.doc(googleUser.user.uid)
						.set({ ...user });
					dispatch(setUser(user));
				}
			});

			toastr.success('Log in', 'You have signed in successfull');
		})
		.catch(err => toastr.error('Login error', err.message));
};

export const resetPassword = email => () => {
	auth
		.sendPasswordResetEmail(email)
		.then(() =>
			toastr.success('Password reset', 'Your password was sent to your email')
		)
		.catch(err => toastr.error('Error', err.message));
};

export const getUserById = id => {
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

export const getUserReference = id => {
	return db.collection('users').doc(id);
};

export const updateUser = (id, data) => {
	return db
		.collection('users')
		.doc(id)
		.update(data);
};

export const updatePassword = password => {
	return auth.currentUser
		.updatePassword(password)
		.then(() =>
			toastr.success('Log in', 'You have successfully changed password')
		)
		.catch(err => toastr.error('Error', err.message));
};
