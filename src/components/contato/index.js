import React from 'react';
// import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


import { Layout, Divider, Row, Col, Anchor, Typography, Space } from 'antd';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

const { Link } = Anchor;
const { Title } = Typography;


const Contato = () => {
   const { t } = useTranslation();
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
						</Col>
						<Col>
							<Anchor affix={false}>
								<Title level={5} style={{ marginLeft: '0.5rem' }}>
									{t('footer-contact-list-label')}
								</Title>
								<Link href="#" title="FAQ" />
								<Link href="#" title={t('footer-contact-link')} />
								<Link href="#" title={t('footer-contact-politics-link')} />
								<Link href="#" title={t('terms-of-use-label')} />
							</Anchor>
						</Col>
						<Col>
							<Anchor affix={false}>
								<Title level={5} style={{ marginLeft: '0.5rem' }}>
									{t('footer-app-map-label')}
								</Title>
								<Link to="/home" title={t('footer-app-map-home')} />
								<Link href="/home" title={t('footer-app-map-events')} />
								<Link href="/home" title={t('footer-app-map-category')} />
								<Link href="/home" title={t('footer-app-map-config')} />
								<Link href="/home" title={t('footer-app-map-contact')} />
								<Link
									href="https://ifriends-api.herokuapp.com/swagger-ui/index.html"
									target="_blank"
									title={t('footer-app-map-api')}
								/>
							</Anchor>
						</Col>
					</Row>
					<Divider style={{ color: 'var(--blue-dark)', width: '1rem' }} />
					<Row justify="space-between" align="middle">
						<Col>
							<Space>
								<> @2022 Bunka Bytes </>
								<> {t('footer-author-rights')} </>
							</Space>
						</Col>
						<Col>
							<a href="malito:bunkabytes@gmail.com">bunkabytes@gmail.com</a>
						</Col>
					</Row>
				</Container>
			</Layout.Footer>
		);
};

export default Contato;
