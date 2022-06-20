import React from 'react';
// import { Link } from 'react-router-dom';
import { Layout, Divider, Row, Col, Anchor, Typography, Space } from 'antd';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

const { Link } = Anchor;
const { Title } = Typography;


const Contato = () => {
    return (
			<Layout.Footer
				style={{
					background: 'var(--white)',
					minHeight: '40vh',
					marginTop: '3.5rem'
				}}
			>
				<Container>
					<Row justify="space-around" align="middle">
						<Col>
							<Image width={250} fluid src="/logo.png" />
							{/* incluir aqui o botão de internacionalização */}
						</Col>
						<Col>
							<Anchor affix={false}>
								<Title level={5} style={{ marginLeft: '0.5rem' }}>
									Atendimento
								</Title>
								<Link href="#" title="FAQ" />
								<Link href="#" title="Entrar em contato" />
								<Link href="#" title="Políticas da comunidade" />
								<Link href="#" title="Termos de uso e condições" />
							</Anchor>
						</Col>
						<Col>
							<Anchor affix={false}>
								<Title level={5} style={{ marginLeft: '0.5rem' }}>
									Mapa da aplicação
								</Title>
								<Link to="/home" title="Página Inicial" />
								<Link href="/home" title="Eventos" />
								<Link href="/home" title="Categorias" />
								<Link href="/home" title="Configurações" />
								<Link href="/home" title="Contato" />
							</Anchor>
						</Col>
					</Row>
					<Divider style={{ color: 'var(--blue-dark)', width: '1rem' }} />
                    <Row justify="space-between" align="middle"> 
                        <Col> 
                            <Space> 
                                <> @2022 Bunka Bytes </>
                                <> Todos os direitos reservados </>
                            </Space>

                         </Col>
                        <Col> bunkabytes@gmail.com </Col>
                    </Row>
				</Container>
			</Layout.Footer>
		);
};

export default Contato;
