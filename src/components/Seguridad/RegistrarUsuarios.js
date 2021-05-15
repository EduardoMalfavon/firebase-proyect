import React, { useState, useEffect } from 'react';
import {
	Avatar,
	Button,
	Container,
	Grid,
	TextField,
	Typography,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { consumerFirebase } from '../../server';

const usuarioInicial = {
	nombre: '',
	apellido: '',
	email: '',
	password: '',
};

const RegistrarUsuarios = ({ firebase, history }) => {
	const [state, setState] = useState({
		firebase: null,
		nombre: '',
		apellido: '',
		email: '',
		password: '',
		Expediente: '',
		uidUser: '',
	});
	useEffect(() => {
		setState({ ...state, firebase });
	}, []);
	console.log(firebase);
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
		form: {
			width: '100%',
			marginTop: 10,
		},
		submit: {
			marginTop: 15,
			marginBottom: 20,
		},
	};
	const handleChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const {
			firebase,
			nombre,
			apellido,
			email,
			password,
			Expediente,
			uidUser,
		} = state;
		firebase.auth
			.createUserWithEmailAndPassword(email, password)
			.then((user) => {
				firebase.db.ref('/Users/' + user.user.uid + '/Data/').set({
					nombre,
					apellido,
					email,
					password,
					Expediente,
				});
			})
			.catch((e) => {
				console.log(e);
			});
	};
	return (
		<Container maxWidth='md'>
			<div style={style.paper}>
				<Avatar style={style.avatar}>
					<LockOutlined />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Registre su cuenta
				</Typography>
				<form style={style.form} onSubmit={handleSubmit}>
					<Grid contaienr spacing={2}>
						<Grid item md={6} xs={12}>
							<TextField
								name='nombre'
								fullWidth
								label='Ingrese su nombre'
								onChange={handleChange}
								value={state.nombre}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								name='apellido'
								fullWidth
								label='Ingrese su apellido'
								onChange={handleChange}
								value={state.apellido}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								name='email'
								fullWidth
								label='Ingrese su email'
								onChange={handleChange}
								value={state.email}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								name='password'
								fullWidth
								label='Ingrese su password'
								onChange={handleChange}
								type='password'
								value={state.password}
							/>
						</Grid>
					</Grid>
					<Grid container justify='center'>
						<Grid item md={6} xs={12}>
							<Button
								type='submit'
								variant='contained'
								fullWidth
								zise='large'
								color='primary'
								style={style.submit}>
								Registrar
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default withRouter(compose(consumerFirebase)(RegistrarUsuarios));
