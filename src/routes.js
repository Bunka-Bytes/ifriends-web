import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/home'
import DetalhesPergunta from './components/detalhes-pergunta';
import CriaPergunta from './components/cria-pergunta';


export default function Routing() {
    return (
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/eventos" element={<h1>Eventos </h1>} />
				<Route exact path="/categorias" element={<h1>Categorias</h1>} />
				<Route exact path="/ajuda" element={<h1>Ajuda</h1>} />
				<Route exact path="/config" element={<h1>Config</h1>} />

				<Route path="/pergunta/:id" element={<DetalhesPergunta />} />
				<Route path="/criar-pergunta/" element={<CriaPergunta />} />

				<Route path="*" element={<h1>Not Found </h1>} />
			</Routes>
		);

}


