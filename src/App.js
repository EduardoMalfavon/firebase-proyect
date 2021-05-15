import React from 'react';
import Login from './security/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateUserByEmail from './Views/CreateUserByEmail';
import Prueba from './Views/Prueba';
import RegistrarUsuarios from './components/Seguridad/RegistrarUsuarios';
import RegistrarUsuariosByGoogle from './components/Seguridad/RegistrarUsuariosByGoogle';
import RegistrarUsuarioByFB from './components/Seguridad/RegistrarUsuarioByFB';

export default () => {
	return (
		<Router>
			<Route path='/' exact component={RegistrarUsuarios} />
			<Route
				path='/RegistroGoogle'
				exact
				component={RegistrarUsuariosByGoogle}
			/>
			<Route path='/RegistroFB' exact component={RegistrarUsuarioByFB} />
			<Route path='/login' exact component={Login} />
			<Route path='/prueba' component={Prueba} />
		</Router>
	);
};
