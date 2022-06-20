import React from 'react';
// ------- STYLES -----
// ------- COMPONENTS -----
import { useParams } from 'react-router-dom';
// Antd and Bootstrap



// Created 
import Pergunta from './pergunta';
import Resposta from './resposta';

const DetalhesPergunta = (props) => {
	const { id } = useParams();
	return (
		<>
			<Pergunta idPergunta={id} {...props} />
			<Resposta idPergunta={id} {...props} />
		</>
	);
};

export default DetalhesPergunta;