import React from 'react';
import Sidebar from './Sidebar.js';

class ContentWrapper extends React.Component {
	render() {
		return (
			<section class="content">
				<Sidebar/>
			</section>
		)
	}
}

export default ContentWrapper;