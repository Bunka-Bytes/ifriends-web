import React, {useEffect, useState,} from 'react';
// ------- STYLES -----
import './styles.css'
// ------- COMPONENTS -----
// Antd and Bootstrap
import Container from 'react-bootstrap/Container';
import { Card, Col, Row, Avatar, Tag, Dropdown, Menu, Tooltip } from 'antd';


// Created
import { getPerguntas } from '../../../services/perguntas';

// ------ ICONS -----
import {
	EditOutlined,
	LikeOutlined,
	StarOutlined
} from '@ant-design/icons';
import { FaRegThumbsUp, FaRegComment, FaRegEye } from 'react-icons/fa';
import { IoIosUndo } from 'react-icons/io';
import { FiMoreVertical, FiTrash2 } from 'react-icons/fi';
import { GoMegaphone } from 'react-icons/go';
import { AiOutlineUser } from 'react-icons/ai';


// Destructuring
const { Meta } = Card;

const menu = (
		<Menu
			items={[
				{
					label: (
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.antgroup.com"
						>
							Remover da visualização
						</a>
					),
					icon: <FiTrash2 />
				},

				{
					danger: true,
					label: 'Reportar',
					icon: <GoMegaphone />
				}
			]}
		/>
 );


const Pergunta = props => {
	const [perguntaData, setPerguntaData] = useState([]);

	useEffect(() => {
		console.log('GETzin');
		getPerguntas('?').then(request => {
			let pergunta = request.data(p => ({
				key: props.idPergunta,
				id: pergunta.id,
				titulo: pergunta.titulo,
				descricao: pergunta.texto,
				imgPerfil: pergunta.usuario.imagem,
				data: `${Math.ceil(Math.random() * 12)} dias atrás`,
				curtidas: Math.ceil(Math.random() * 100),
				comentarios: Math.ceil(Math.random() * 50),
				visualizacoes: Math.ceil(Math.random() * 1000),
				nomeCategoria: pergunta.categoria.nome
			}));

			setPerguntaData(pergunta);
		});
	}, []);
	return (
		<Card className="card-box">
			<Container>
				<Row justify="space-between" align="middle">
					<Col style={{ marginBottom: '0.75rem' }}>
						<Tag color={'var(--purple)'}>{perguntaData.nomeCategoria}</Tag>
						<Tag color={'var(--red-medium)'}>Erro</Tag>
					</Col>
					<Col>
						<Dropdown overlay={menu}>
							<a onClick={e => e.preventDefault()}>
								<FiMoreVertical />
							</a>
						</Dropdown>
					</Col>
				</Row>
				<Row justify="start" align="middle">
					<Col>
						<Avatar
							breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
							icon={<AiOutlineUser />}
							className="icons"
							style={{ marginRight: '1rem' }}
						/>
					</Col>
					<Col>
						<Col>{perguntaData.titulo}</Col>
						<Col>
							<Meta description={<small>data</small>} />
						</Col>
					</Col>
				</Row>
				<Row justify="space-between">
					<Col xs={4} sm={4} md={2} xl={1}>
						<Tooltip title={'Curtidas'}>
							<FaRegThumbsUp /> {1}{' '}
						</Tooltip>
					</Col>
				</Row>
			</Container>
		</Card>
	);
};

export default Pergunta;