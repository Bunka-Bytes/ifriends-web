import React, { useEffect, useState, createElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

// ------- STYLES -----
import './index.css'
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
import { FiMoreVertical, FiTrash2, FiAlertCircle } from 'react-icons/fi';
import { AiOutlineUser, AiOutlineEdit } from 'react-icons/ai';

// ------ COMMONS ------
import ListTags from "../../common/list-tags";
import Button from "../../common/button";

// Services
import { getPergunta } from '../../../services/pergunta'; 
import { getCurtidasUsuario } from '../../../services/usuario'; 
import { postCurtidaPergunta } from '../../../services/curtidas-pergunta';


// ------ FUNCTIONS ------
import { getBeetweenDateWithTextForApiDate } from '../../../utils/functions';
import { isAuthenticated } from '../../../services/auth';

// Destructuring
const { Meta } = Card;

const onClick = ({ key }) => {
	if (key === '1') {
		// chamar aqui o metodo de deleção
	}
	// pensar num lugar pra colocar as perguntas deletadas
 };



const Pergunta = props => {
	const { idPergunta } = props;
	const [likes, setLikes] = useState(0);
	const [action, setAction] = useState('unliked');
	const [perguntaData, setPerguntaData] = useState({});
	const [curtidasUsuario, setCurtidasUsuario] = useState([]);
	const { t } = useTranslation();

	const menu = (
		<Menu
			align="start"
			onClick={onClick}
			items={[
				{
					key: '1',
					label: t('label-remove-view'),
					icon: <FiTrash2 />
				},

				{
					key: '2',
					label: t('label-edit'),
					icon: <AiOutlineEdit />
				}
			]}
		/>
	);

	useEffect(() => {
		console.log('Busca por id', idPergunta);
		getPergunta(idPergunta)
			.then(request => {
				console.log('dadosPergunta', request.data);
				let dadosPergunta = request.data;
				const { dataEmissao } = dadosPergunta;

				let pergunta = {
					key: dadosPergunta.id,
					id: dadosPergunta.id,
					titulo: dadosPergunta.titulo,
					descricao: dadosPergunta.texto,
					autor: dadosPergunta.usuario.nome,
					autorEmail: dadosPergunta.usuario.email,
					imgPerfil: dadosPergunta.usuario.imagem,
					data: getBeetweenDateWithTextForApiDate(dataEmissao),
					curtidas: dadosPergunta.qtdCurtida,
					comentarios: dadosPergunta.qtdResposta,
					visualizacoes: Math.ceil(Math.random() * 1000),
					nomeCategoria: dadosPergunta.categoria.nome,
					tags: dadosPergunta.tags
				};

				setPerguntaData(pergunta);
			})
			.catch(error => {
				console.log(error);
				return message.error(
					error.response.data + ' - ' + error.code + ' ' + error.response.status
				);
			});
	}, []);

	useEffect(() => {
		if (isAuthenticated()) {
			getCurtidasUsuario()
				.then(response => {
					let curtidas = response.data;
					console.log('Curtidas:', curtidas);
					setCurtidasUsuario(curtidas);

				})
				.catch(error => {
					console.log(error);
					return message.error(
						error.response.data + ' - ' + error.code + ' ' + error.response.status
					);
				});
		}
		return;
	}, [])
	

	const like = () => {
		if (isAuthenticated()) {
			postCurtidaPergunta(perguntaData.id).then(
				response => {
					console.log(response.data);
					if (response.data === true ) {
						setAction('liked');
						setLikes(perguntaData.curtidas);
					}
					else {
						setAction('unliked');
						setLikes(perguntaData.curtidas);
					}
				},
				error => {
					console.log(error);
					return message.error(
						error.response.data +
							' - ' +
							error.code +
							' ' +
							error.response.status
					);
				}
			);
		} else {
			message.info(t('label-authenticate'));
		}
	};
	

	const verifyLike = () => {
		let verify = curtidasUsuario.filter(
			curtida => curtida.pergunta.id === perguntaData.id
		);
		if (verify.length !== 0) return true;
		return false;
	}

	return (
		<Card className="card-box" style={{ marginBottom: '2rem' }}>
			<Container>
				<Row justify="space-between" align="middle">
					<Col style={{ marginBottom: '0.75rem' }}>
						<ListTags tags={perguntaData.tags} />
					</Col>
					<Col>
						{isAuthenticated() &&
						sessionStorage.getItem('@user-email') ===
							perguntaData.autorEmail ? (
							<Dropdown overlay={menu} placement="bottomRight" arrow>
								<a onClick={e => e.preventDefault()}>
									<FiMoreVertical />
								</a>
							</Dropdown>
						) : (
							<></>
						)}
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

				<Row style={{ marginTop: '1rem' }}>
					<Typography.Title level={4}>{perguntaData.titulo}</Typography.Title>
				</Row>

				<Row>
					<Typography.Paragraph>{perguntaData.descricao}</Typography.Paragraph>
				</Row>

				<Row
					justify="space-between"
					align="middle"
					style={{ marginTop: '1rem' }}
				>
					<Col xs={4} sm={4} md={2} xl={1}>
						<Button
							type="primary"
							icon={createElement(
								verifyLike() === true || action === 'liked' ? LikeFilled : LikeOutlined
							)}
							onClick={like}
							label={t('label-like')}
							ghost
						/>
					</Col>
					<Col>
						<Button
							type="primary"
							icon={
								<FiAlertCircle
									color="white"
									style={{ marginRight: '0.25rem' }}
								/>
							}
							onClick={e => e.preventDefault()}
							label={t('label-report')}
							danger
						/>
					</Col>
				</Row>
			</Container>
		</Card>
	);
};

export default Pergunta;