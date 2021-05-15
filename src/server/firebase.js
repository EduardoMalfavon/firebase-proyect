import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyBNJubxl7vS0ovW81mMUhnPE6NR995Ifjk',
	authDomain: 'salaunoapp.firebaseapp.com',
	databaseURL: 'https://salaunoapp.firebaseio.com',
	projectId: 'salaunoapp',
	storageBucket: 'salaunoapp.appspot.com',
	messagingSenderId: '446581281300',
	appId: '1:446581281300:web:5cb6af8d94b204ebb8cd01',
};

class Firebase {
	constructor() {
		app.initializeApp(config);
		this.db = app.database();
		this.auth = app.auth();
		this.authorization = app.auth;
	}
}

export default Firebase;
