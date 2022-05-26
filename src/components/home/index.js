import React, { useEffect, useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
// ------- STYLES -----
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'

// ------- COMPONENTS -----
import DetalhesPergunta from '../detalhes-pergunta';


// Antd and Bootstrap
import { Grid } from 'react-flexbox-grid'
import { Col, Row } from 'react-bootstrap';
import {
	Tooltip,
	Skeleton,
	Switch,
	Card,
	Avatar,
	Divider,
	Tag,
	Button,
	Typography,
	Menu,
	Dropdown,
	Space,
	List,
	Empty
} from 'antd';

// Created
import Banner from './banner';


// ------ ICONS -----
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
	MessageOutlined,
	LikeOutlined,
	StarOutlined
} from '@ant-design/icons';
import { FaRegThumbsUp, FaRegComment, FaRegEye } from 'react-icons/fa'
import { IoIosUndo } from 'react-icons/io'
import { FiMoreVertical, FiTrash2 } from 'react-icons/fi'
import { GoMegaphone } from 'react-icons/go'
import { UserOutlined } from '@ant-design/icons';

// Services
import { getPerguntas } from '../../services/perguntas';

// Destructuring
const { Meta } = Card;
const { Title, Paragraph, Text, Link } = Typography;


const Home = props => {

	const [listData, setListData] = useState([])
	const navigate = useNavigate();

	useEffect(() => {
		console.log('GETzin')
		getPerguntas('?').then(request => {
			let lista = request.data.map(pergunta => ({
				key: pergunta.id, id: pergunta.id, titulo: pergunta.titulo, descricao: pergunta.texto, imgPerfil: pergunta.usuario.imagem, data: `${Math.ceil(Math.random() * 12)} dias atrás`, curtidas: Math.ceil(Math.random() * 100), comentarios: Math.ceil(Math.random() * 50), visualizacoes: Math.ceil(Math.random() * 1000), nomeCategoria: pergunta.categoria.nome
			}));

			setListData(lista)
		})
	}, []);

	const menu = (
		<Menu
			items={[
				{
					label: (
						<a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
							Deletar
						</a>
					),
					icon: <FiTrash2 />
				},

				{
					danger: true,
					label: 'Reportar',
					icon: <GoMegaphone />
				},
			]}
		/>
	);

	// for (let i = 0; i < 23; i++) {
	// 	listData.push({
	// 		key: i,
	// 		id: i,
	// 		href: '#',
	// 		titulo: `Pergunta - ${i}`,
	// 		imgPerfil: 'https://joeschmoe.io/api/v1/random',
	// 		data:
	// 			`${Math.ceil(Math.random() * 12)} dias atrás`,
	// 		descricao:
	// 			'Então com um probleminha aqui ...',
	// 		curtidas: Math.ceil(Math.random() * 100),
	// 		comentarios: Math.ceil(Math.random() * 50),
	// 		visualizacoes: Math.ceil(Math.random() * 1000)
	// 	});
	// }

	const IconText = ({ icon, text }) => (
		<Space>
			{React.createElement(icon)}
			{text}
		</Space>
	);


	return (
		<Fragment>
			<Banner />

			<Grid fluid style={{ marginTop: '2rem' }}>
				{listData.length > 0 ? (
					<Fragment>
						<Title level={3}>Últimas Perguntas:</Title>

						<List
							itemLayout="vertical"
							size="large"
							pagination={{
								onChange: page => {
									console.log(page);
								},
								pageSize: 8
							}}
							dataSource={listData}
							// footer={
							//   <div>
							//     <b>antd</b> footerzinho
							//   </div>
							// }
							renderItem={item => (
								<List.Item>
									<Skeleton loading={false} avatar active>
										<Card
											className="card-box"
											title={
												<Fragment>
													<Row>
														<Col
															xs={12}
															sm={12}
															style={{ marginBottom: '0.75rem' }}
														>
															<Tag color={'var(--purple)'}>
																{item.nomeCategoria}
															</Tag>
														</Col>
													</Row>
													<Row>
														<Col xs={2} sm={2} md={1}>
															<Avatar
																src={item.imgPerfil || null}
																icon={<UserOutlined />}
																size="large"
															/>
														</Col>
														<Col xs={8} sm={8} md={10}>
															<Col xs={12} sm={12}>
																{item.titulo}
															</Col>
															<Col xs={12} sm={12}>
																<Meta
																	description={<small>{item.data}</small>}
																/>
															</Col>
														</Col>
														<Col xs={2} sm={2} md={1}>
															<GoMegaphone color={'var(--red-medium)'} />
															{/* <Dropdown overlay={menu}>
															<a onClick={e => e.preventDefault()}>
															<FiMoreVertical />
															</a>
														</Dropdown> */}
														</Col>
													</Row>
												</Fragment>
											}
											onClick={() => alert('Cliquei')}
											hoverable
											// extra={}
										>
											{item.descricao}
											<Meta
												description={
													<Fragment>
														<br />
														<Row className="align-items-center justify-content-between gy-3">
															<Col xs={4} sm={4} md={2} xl={1}>
																<Tooltip title={'Curtidas'}>
																	<FaRegThumbsUp /> {item.curtidas}{' '}
																</Tooltip>
															</Col>
															<Col xs={4} sm={4} md={2} xl={1}>
																<Tooltip title={'Comentários'}>
																	<FaRegComment /> {item.comentarios}
																</Tooltip>
															</Col>
															<Col xs={4} sm={4} md={2} xl={1}>
																<Tooltip title={'Visualizações'}>
																	<FaRegEye /> {item.visualizacoes}{' '}
																</Tooltip>
															</Col>
															<Col
																xs={12}
																sm={12}
																md={6}
																xl={9}
																className="d-flex justify-content-center button-right"
															>
																<Row>
																	<Col>
																		<Button
																			type="primary"
																			icon={<IoIosUndo color="white" />}
																			className="button-right"
																			onClick={e => {
																				e.stopPropagation();
																				navigate(`/pergunta/${item.key}`);
																			}}
																			style={{
																				background: 'var(--green)',
																				borderColor: 'var(--green-medium)'
																			}}

																		>
																			&nbsp;&nbsp; Responder
																		</Button>
																	</Col>
																</Row>
															</Col>
														</Row>
													</Fragment>
												}
											/>
										</Card>
									</Skeleton>
									{/* <List.Item.Meta
										avatar={<Avatar src={item.avatar} />}
										title={<a href={item.href}>{item.title}</a>}
										description={item.description}
									/>
									{item.content} */}
								</List.Item>
							)}
						/>
					</Fragment>
				) : (
					<Empty
						// image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
						// imageStyle={{
						//   height: 240,
						// }}
						// description={
						//   <span>
						//     Customize <a href="#API">Description</a>
						//   </span>
						// }
						description={
							<Title level={5}>Não foram encontradas perguntas</Title>
						}
					>
						<Button type="primary" onClick={() => navigate('/criar-pergunta')}>
							<IoIosUndo color="white" /> &nbsp;&nbsp; Crie sua pergunta
						</Button>
					</Empty>
				)}
			</Grid>
		</Fragment>
	);
}

export default Home
