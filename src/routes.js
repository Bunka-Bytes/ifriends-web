import React, { Fragment} from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { message } from 'antd';

import Home from './components/home'
import DetalhesPergunta from './components/detalhes-pergunta';
import CriaPergunta from './components/cria-pergunta';
import Login from './components/auth/login';
import Cadastro from './components/auth/cadastro';

import NotFound from './components/common/not-found';
import Working from './components/common/working';
import { isAuthenticated } from './services/auth';

const PrivateRoutes = () => {
	return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />
};

const FormsRedirect = () => {
	return isAuthenticated() ? (
		<>
			<Navigate to="/" />
		</>
	) : (
		<Outlet />
	);
}

export default function Routing() {
	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/eventos" element={<Working />} />
			<Route exact path="/categorias" element={<Working />} />
			<Route exact path="/ajuda" element={<Working />} />
			<Route exact path="/config" element={<Working />} />
			<Route path="/pergunta/:id" element={<DetalhesPergunta />} />

			<Route element={<FormsRedirect />}>
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/cadastro" element={<Cadastro />} />
			</Route>

			<Route element={<PrivateRoutes />}>
				<Route path="/criar-pergunta/" element={<CriaPergunta />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);

}


