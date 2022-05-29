import React from 'react';
// ------- STYLES -----
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import './main.css';


// ------- COMPONENTS -----
// Antd and Bootstrap
import Container from 'react-bootstrap/Container';
import { Layout } from 'antd';

import { BrowserRouter as Router } from 'react-router-dom';


// Created 
import MenuSup from './components/menus/menu-sup';
import MenuSide from './components/menus/menu-side';
import Contato from './components/contato'
import Routing from './routes';



// ------ LOCALE -------


// Destructuring
const { Content } = Layout;



function App() {
	// ------- STATES ------

	// ------- VARIABLES ------


	// ------- FUNCTIONS ------
	

	return (
		<Router>
			<Layout style={{ minHeight: '100vh' }}>
				<MenuSide/>
				<Layout>
					<MenuSup />
					<Container>
						<Content>
							<Routing />
						</Content>
					</Container>
					<Contato />
				</Layout>
			</Layout>
		</Router>
	);
}

export default App;
