import React from 'react';
// ------- STYLES -----
// ------- COMPONENTS -----
import { useParams } from 'react-router-dom';
// Antd and Bootstrap



// Created 
import Pergunta from './pergunta';
import Resposta from './resposta';

const DetalhesPergunta = () => {
	const { id } = useParams();
	return (
		<>
			<Pergunta idPergunta={id} />
			<Resposta idPergunta={id} />
		</>
	);
};

export default DetalhesPergunta;