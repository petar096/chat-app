// import { auth, app, db } from '../../firebase/config';
// import { toastr } from 'react-redux-toastr';
// import { LOG_OUT, SET_USER } from '../types/authConstants';

// export const signIn = (email, password) => {
// 	auth
// 		.signInWithEmailAndPassword(email, password)
// 		.then(data => {
// 			// let user = data.user;
// 			// setUser(user.uid);
// 			// getUserById(user.uid).then(data => {
// 			// 	console.log(data.data());
// 			setUser(data.data().id);

// 			toastr.success('Log in', 'You have signed in successfull');
// 			// });
// 		})
// 		.catch(err => toastr.error('Login error', err.message));
// };

// export const setUser = id => dispatch => {
// 	return getUserById(id).then(doc => {
// 		dispatch({
// 			type: SET_USER,
// 			user: {
// 				id: id,
// 				email: doc.data().email,
// 				firstName: doc.data().firstName,
// 				lastName: doc.data().lastName
// 			}
// 		});
// 	});
// };

// export const signUp = user => () => {
// 	auth
// 		.createUserWithEmailAndPassword(user.email, user.password)
// 		.then(data => {
// 			db.collection('users')
// 				.doc(data.user.uid)
// 				.set({ ...user });
// 		})
// 		.catch(err => toastr.error('Sign up error', err.message));
// };

// export const signOut = () => dispatch => {
// 	auth.signOut().then(() =>
// 		dispatch({
// 			type: LOG_OUT
// 		})
// 	);
// 	toastr.info('Sign out', 'You have successfully signed out', {
// 		timeOut: 1000
// 	});
// };

// export const signInWithGoogle = () => dispatch => {
// 	auth
// 		.signInWithPopup(new app.auth.GoogleAuthProvider())
// 		.then(data => {
// 			const { email, displayName } = googleUser.user;
// 			const fullName = displayName.split(' ');

// 			const user = {
// 				id: data.uid,
// 				email,
// 				firstName: fullName[0],
// 				lastName: fullName[1]
// 			};

// 			dispatch({
// 				type: SET_USER,
// 				user
// 			});
// 			// firebase.saveUser(googleUser.user.uid, user);
// 			// setUser(data.uid)
// 			toastr.success('Log in', 'You have signed in successfull');
// 		})
// 		.catch(err => toastr.error('Login error', err.message));
// };

// export const resetPassword = email => () => {
// 	auth
// 		.sendPasswordResetEmail(email)
// 		.then(() =>
// 			toastr.success('Password reset', 'Your password was sent to your email')
// 		)
// 		.catch(err => toastr.error('Error', err.message));
// };

// export const getUserById = id => {
// 	return db
// 		.collection('users')
// 		.doc(id)
// 		.get();
// };

// export const getUsersByName = name => {
// 	return db
// 		.collection('users')
// 		.where('firstName', '==', name)
// 		.get();
// };

// export const getUserReference = id => {
// 	return db.collection('users').doc(id);
// };
import { auth, app, db } from '../../firebase/config';
import { toastr } from 'react-redux-toastr';
import { LOG_OUT, SET_USER } from '../types/authConstants';
import { finishLoading } from '@actions/loadingActions';

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

// export const setUser = id => dispatch => {
// 	return getUserById(id).then(doc => {
// 		dispatch({
// 			type: SET_USER,
// 			user: {
// 				id: id,
// 				email: doc.data().email,
// 				firstName: doc.data().firstName,
// 				lastName: doc.data().lastName
// 			}
// 		});
// 	});
// };

export const setUser = user => dispatch => {
	dispatch({
		type: SET_USER,
		user
	});
	dispatch(finishLoading());
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
			const displayName = data.user.displayName.split(' ');
			console.log(data);
			const user = {
				email: data.user.email,
				firstName: displayName[0].toLowerCase(),
				lastName: displayName[1].toLowerCase(),
				avatar: data.additionalUserInfo.profile.picture
			};

			db.collection('users')
				.doc(data.user.uid)
				.set({ ...user });
			dispatch(setUser(user));

			toastr.success('Log in', 'You have signed in successfull');
		})
		.catch(() => toastr.error('Login error', 'Invalid credentials'));
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
