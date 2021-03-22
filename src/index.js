import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers/index.js';
import firebase from 'firebase';

const store = createStore(rootReducer);

const firebaseConfig = {
    apiKey: "AIzaSyD4ZOaQgincn4u2ohZbafA0KebyN68JE9E",
    authDomain: "project-pfa-e4c83.firebaseapp.com",
    databaseURL: "https://project-pfa-e4c83-default-rtdb.firebaseio.com",
    projectId: "project-pfa-e4c83",
    storageBucket: "project-pfa-e4c83.appspot.com",
    messagingSenderId: "964044908564",
    appId: "1:964044908564:web:56963fd7a04f0d8bafdf01"
  };

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,document.getElementById('root')
		
);

reportWebVitals();

