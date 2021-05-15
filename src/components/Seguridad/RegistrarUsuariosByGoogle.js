import React, { useState, useEffect } from 'react';
import { Avatar, Button, Container, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { consumerFirebase } from '../../server';

const RegistrarUsuariosByGoogle = ({ firebase, history }) => {
	const [state, setState] = useState({ firebase: null, token: '' });
	useEffect(() => {
		setState({ firebase });
	}, []);
	const style = {
		paper: {
			marginTop: 8,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		avatar: {
			margin: 8,
			backgroundColor: '#e53935',
		},
		submit: {
			marginTop: 15,
			marginBottom: 20,
		},
	};
	console.log(firebase);
	const loginWithGoogle = () => {
		const provider = new firebase.authorization.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
		firebase
			.authorization()
			.signInWithPopup(provider)
			.then(function (result) {
				console.log(result);
				// let token = result.credential.accessToken;
				// let user = result.user;
				// console.log(token, user);
			})
			.catch(function (error) {
				console.log('error:', error);
			});
	};
	const logoutWithGoogle = () => {
		firebase
			.authorization()
			.signOut()
			.then(function () {
				// Redirect to google sign out.
				// window.location.assign('https://accounts.google.com/logout');
				console.log('logout satisfactorio');
			})
			.catch(function (error) {
				// Error occurred.
				console.log(error);
			});
	};
	return (
		<Container maxWidth='md'>
			<div style={style.paper}>
				<Avatar style={style.avatar}>
					<LockOutlined />
				</Avatar>
				<Typography>Regstrate con google</Typography>
				<Button
					variant='contained'
					zise='large'
					color='primary'
					style={style.submit}
					onClick={loginWithGoogle}>
					Login with google
				</Button>
			</div>
			<div style={style.paper}>
				<Avatar style={style.avatar}>
					<LockOutlined />
				</Avatar>
				<Typography>Regstrate con google</Typography>
				<Button
					variant='contained'
					zise='large'
					color='primary'
					style={style.submit}
					onClick={logoutWithGoogle}>
					Logout
				</Button>
			</div>
		</Container>
	);
};

export default withRouter(compose(consumerFirebase)(RegistrarUsuariosByGoogle));
