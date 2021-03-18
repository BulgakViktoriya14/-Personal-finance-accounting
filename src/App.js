import React from 'react';
import './style/scss/index.scss';
import Header from './components/common/Header.js';
import ContentWrapper from './components/common/ContentWrapper.js';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

class App extends React.Component {
	render() {
		return (
			<div className="site">
				<Router>
					<Header/>
					<ContentWrapper/>
				</Router>
			</div>
		)
	}
}

export default App;
