import React from 'react';
import './style/style.css';
import Header from './components/common/Header.js';
import ContentWrapper from './components/common/ContentWrapper.js';

class App extends React.Component {
	render() {
		return (
			<div class="site">
				<Header/>
				<ContentWrapper/>
			</div>
		)
	}
}

export default App;
