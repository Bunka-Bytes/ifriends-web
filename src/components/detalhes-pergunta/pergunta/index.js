import React, { useEffect, useState, createElement } from 'react';
import { useNavigate } from 'react-router-dom';
// ------- STYLES -----
import './styles.css'
// ------- COMPONENTS -----
// Antd and Bootstrap
import Container from 'react-bootstrap/Container';
import {
	Card,
	Col,
	Row,
	Avatar,
	Tag,
	Dropdown,
	Menu,
	Tooltip,
	Typography,
	message
} from 'antd';


// Created
import CardPergunta from '../../home/cardPergunta';

// ------ ICONS -----
import {
	EditOutlined,
	LikeFilled,
	LikeOutlined,
	StarOutlined
} from '@ant-design/icons';
import { FaRegThumbsUp, FaRegComment, FaRegEye } from 'react-icons/fa';
import { IoIosUndo } from 'react-icons/io';
import { FiMoreVertical, FiTrash2 } from 'react-icons/fi';
import { GoMegaphone } from 'react-icons/go';
import { AiOutlineUser } from 'react-icons/ai';

// ------ COMMONS ------
import ListTags from "../../common/list-tags";

// Services
import { getPergunta } from '../../../services/pergunta'; 
import { postCurtidaPergunta } from '../../../services/curtidas-pergunta';
import { removeTokenOnLogout } from '../../../services/auth';


// ------ FUNCTIONS ------
import { dateDifferenceInDays } from "../../../utils/functions";

// Destructuring
const { Meta } = Card;

const menu = (
	<Menu
		items={[
			{
				label: (
					// exibir label se o perguntaData.usuario == usuario logado
					// função para o delete
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
	const { idPergunta } = props;
	const [perguntaData, setPerguntaData] = useState({});


	useEffect(() => {
		console.log('Busca por id', idPergunta);
		getPergunta(idPergunta).then(request => {
			console.log('dadosPergunta', request.data)
			let dadosPergunta = request.data;
			const { dataEmissao } = dadosPergunta;
			const newDataEmissao = new Date(
				`${dataEmissao[0]}-${dataEmissao[1]}-${dataEmissao[2]}`
			);
			const dateToday = new Date();

			const differDatesInDays = dateDifferenceInDays(
				newDataEmissao,
				dateToday
			);

			let pergunta = {
				key: dadosPergunta.id,
				id: dadosPergunta.id,
				titulo: dadosPergunta.titulo,
				descricao: dadosPergunta.texto,
				autor: dadosPergunta.usuario.nome,
				imgPerfil: dadosPergunta.usuario.imagem,
				data: `${differDatesInDays} dias atrás`,
				curtidas: dadosPergunta.qtdCurtida,
				comentarios: dadosPergunta.qtdResposta,
				visualizacoes: Math.ceil(Math.random() * 1000),
				nomeCategoria: dadosPergunta.categoria.nome,
				tags: dadosPergunta.tags
			};
			setPerguntaData(pergunta);
		});
	}, []);

	const [likes, setLikes] = useState(perguntaData.curtidas);
	const [action, setAction] = useState(null);
	return (
		<Card className="card-box">
			<Container>
				<Row justify="space-between" align="middle">
					<Col style={{ marginBottom: '0.75rem' }}>
						<ListTags tags={perguntaData.tags} />
					</Col>
					<Col>
						<Dropdown overlay={menu}>
							<a onClick={e => e.preventDefault()}>
								<FiMoreVertical />
							</a>
						</Dropdown>
					</Col>
				</Row>
				<Row justify="start" align="middle" style={{ marginBottom: '0.75rem' }}>
					<Col>
						<Avatar
							src={perguntaData.imgPerfil || null}
							icon={<AiOutlineUser />}
							size="large"
							className="icons"
							style={{ marginRight: '1rem' }}
						/>
					</Col>
					<Col>
						<Col>
							<strong>{perguntaData.autor}</strong>
						</Col>
						<Col>
							<Meta description={<small>{perguntaData.data}</small>} />
						</Col>
					</Col>
				</Row>

				<Row>
					<h4>{perguntaData.titulo}</h4>
				</Row>

				<Row>
					<Typography.Paragraph>{perguntaData.descricao}</Typography.Paragraph>
				</Row>

				<Row justify="space-between">
					<Col xs={4} sm={4} md={2} xl={1}>
						<span onClick={e => e.preventDefault()}>
							<Tooltip title={'Curtir'}>
								{createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
								{likes}{' '}
							</Tooltip>
						</span>
					</Col>
				</Row>
			</Container>
		</Card>
	);
};

export default Pergunta;