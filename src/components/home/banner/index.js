import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
// ------- COMPONENTS -----
// Antd and Bootstrap
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import { Card, Typography, Col, Row, Space, Button } from 'antd';
import { Link } from 'react-router-dom';

import './index.css';

// ------ ICONS -----
import {
	IoCalendarClearOutline,
	IoCreateOutline,
	IoFilter
} from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

const Banner = props => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<>
			<Card>
				<Container>
					<Row
						justify="space-between"
						align="middle"
						style={{ textAlign: 'center' }}
					>
						<Col xs={12} sm={5} lg={6}>
							<Image
								className="banner-img"
								width={180}
								fluid
								src="/imgs/banner/Curtida.png"
							/>
						</Col>
						<Col xs={24} sm={24} md={24} lg={12}>
							<Stack>
								<Typography>
									<Typography.Title level={2}>
										{t('home-banner-title')}
									</Typography.Title>
									<Typography.Paragraph>
										<small>{t('home-banner-descricao')}</small>
									</Typography.Paragraph>
									<Space>
										<Button
											icon={
												<IoCalendarClearOutline
													style={{ marginRight: '0.25rem' }}
												/>
											}
											onClick={() => navigate('/criar-pergunta')}
											className="layout-background"
										>
											{t('btn-perguntar')}
										</Button>

										<Button
											icon={
												<IoCreateOutline style={{ marginRight: '0.25rem' }} />
											}
											onClick={() => navigate('/eventos')}
											className="layout-background"
										>
											{t('btn-ver-eventos')}
										</Button>
									</Space>
								</Typography>
							</Stack>
						</Col>
						<Col xs={12} sm={5} lg={6}>
							<Image
								className="banner-img"
								width={125}
								fluid
								src="/imgs/banner/Duvida.png"
							/>
						</Col>
					</Row>
				</Container>
			</Card>
			<Card>
				<Container>
					<Button
						icon={<IoFilter style={{ marginRight: '0.25rem' }} />}
						style={{ color: 'var(--white)', background: 'var(--purple)' }}
						disabled
					>
						{t('btn-filtros')}
					</Button>
				</Container>
			</Card>
		</>
	);
};


export default Banner;
