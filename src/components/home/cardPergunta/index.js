import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Antd and Bootstrap
import { Col, Row } from "react-flexbox-grid";
import { Tooltip, Skeleton, Card, Avatar, Typography, Divider, message } from "antd";
import Button from "../../common/button";

// ------ ICONS -----
import { FaRegThumbsUp, FaRegComment, FaRegEye } from "react-icons/fa";
import { IoIosUndo } from "react-icons/io";
import { GoMegaphone } from "react-icons/go";
import { UserOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { postCurtidaPergunta } from '../../../services/curtidas-pergunta';
import { getCurtidasUsuario } from '../../../services/usuario';
import { isAuthenticated } from '../../../services/auth';


// ------ COMMONS ------
import ListTags from "../../common/list-tags";
import { t } from "i18next";

// Destructuring
const { Meta } = Card;
const { Paragraph } = Typography;

const CardPergunta = (props) => {
  	const navigate = useNavigate();
	const { item, loading = false } = props;
	const [action, setAction] = useState('unliked');
	const [curtidasUsuario, setCurtidasUsuario] = useState([]);
	
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
						error.response.data +
							' - ' +
							error.code +
							' ' +
							error.response.status
					);
				});
		}
		return;
	}, []);


  	return (
			<Skeleton loading={loading} avatar active>
				<Paragraph>
					<Card
						className="card-box"
						onClick={() => navigate(`/pergunta/${item.key}`)}
						hoverable
					>
						<Paragraph strong>
							<Fragment>
								<Row style={{ marginBottom: '0.75rem' }}>
									<Col xs={12} sm={12}>
										<ListTags tags={item.tags} />
									</Col>
								</Row>
								<Row middle="xs" style={{ marginBottom: '0.75rem' }}>
									<Col xs={2} sm={2} md={1}>
										<Avatar
											src={item.imgPerfil || null}
											className="icons"
											icon={<UserOutlined size={30} />}
											size="large"
										/>
									</Col>
									<Col xs={8} sm={8} md={10}>
										<Col xs={12} sm={12}>
											{item.titulo}
											<Row start="xs" middle="xs">
												<Col xs={12} sm={12}>
													<small>{item.autor}</small>
													<Meta description={<small>{item.data}</small>} />
												</Col>
											</Row>
										</Col>
									</Col>
								</Row>
							</Fragment>
						</Paragraph>
						<Divider />
						{item.descricao}
						<Meta
							description={
								<Fragment>
									<br />
									<Row className="align-items-center justify-content-between gy-3">
										<Col xs={4} sm={4} md={2} xl={1}>
											<Tooltip title={t('label-likes')}>
												<span>
													{React.createElement(
														action === 'liked'
															? LikeFilled
															: LikeOutlined
													)}
													{item.curtidas}
												</span>
											</Tooltip>
										</Col>
										<Col xs={4} sm={4} md={2} xl={1}>
											<Tooltip title={t('label-answers')}>
												<FaRegComment /> {item.comentarios}
											</Tooltip>
										</Col>
										<Col xs={4} sm={4} md={2} xl={1}>
											<Tooltip title={t('label-views')}>
												<FaRegEye /> {item.visualizacoes}{' '}
											</Tooltip>
										</Col>
										<Col xs={12} sm={12} md={6} xl={9}>
											<Row>
												<Col className="d-flex justify-content-center">
													<Button
														type="primary"
														icon={
															<IoIosUndo
																color="white"
																style={{ marginRight: '0.25rem' }}
															/>
														}
														className="button-right"
														onClick={() => {
															navigate(`/pergunta/${item.id}`);
														}}
														style={{
															background: 'var(--green)',
															borderColor: 'var(--green-medium)'
														}}
														label={t('btn-responder')}
													/>
												</Col>
											</Row>
										</Col>
									</Row>
								</Fragment>
							}
						/>
					</Card>
				</Paragraph>
			</Skeleton>
		);
};

export default CardPergunta;
