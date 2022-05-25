import React, { Fragment } from 'react';
// ------- COMPONENTS -----
// Antd and Bootstrap
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import { Card, Typography, Col, Row, Space, Button } from 'antd';
import { Link } from 'react-router-dom';

// ------ ICONS -----
import {
	IoCalendarClearOutline,
	IoCreateOutline,
	IoFilter
} from 'react-icons/io5';


const Banner = props => {
	return (
		<>
			<Card style={{}}>
				<Container>
					<Row
						justify="space-between"
						align="middle"
						gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
						style={{ textAlign: 'center' }}
					>
						<Col>
							<Image width={180} fluid src="/imgs/banner/Curtida.png" />{' '}
						</Col>
						<Col span={14}>
							<Stack>
								<Typography>
									<Typography.Title level={2}>
										Está com dúvidas ou quer compartilhar o que sabe? Navegue
										pelo IFriends!
									</Typography.Title>
									<Typography.Paragraph>
										Aqui você pode ser perguntar, responder e ainda participar
										ou dar mentorias <br /> sobre um assunto que ache legal!
									</Typography.Paragraph>
									<Space>
										<Button
											icon={
												<IoCalendarClearOutline
													style={{ marginRight: '0.25rem' }}
												/>
											}
											className="layout-background"
										>
											Perguntar
										</Button>

										<Button
											icon={
												<IoCreateOutline style={{ marginRight: '0.25rem' }} />
											}
											className="layout-background"
										>
											Ver eventos
										</Button>
									</Space>
								</Typography>
							</Stack>
						</Col>
						<Col>
							<Image width={125} fluid src="/imgs/banner/Duvida.png" />{' '}
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
						Filtros
					</Button>
				</Container>
			</Card>
		</>
	);
};


export default Banner;
