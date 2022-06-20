import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


import {
	Form,
	Button,
	Checkbox,
	message,
	Typography,
	Row,
	Col,
	Divider,
	Space
} from 'antd';
import { Image } from 'react-bootstrap';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

import { BiLogIn, BiArrowToRight } from 'react-icons/bi';


import { loginPostUsuario } from '../../../services/usuario';
import { salvarToken } from '../../../services/auth';

import Input, { Password } from '../../common/input';
import {
	RULES_USER_EMAIL,
	RULES_USER_PASSWORD
} from '../../../utils/rules';

import '../../auth/index.css';


const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { Item } = Form;
	const [form] = Form.useForm();
  	const { t } = useTranslation();


	const enviarDados = values => {
		console.log(values);
        
		loginPostUsuario(values)
			.then(request => {
				salvarToken(request.data);
				sessionStorage.setItem('login-time', Date.now());
				message.success(
					`${t('log-message-login-success')} ${request.data.nome} `
				);
				let anterior = location.pathname - 1;
				console.log(location.pathname - 1);
				if (anterior !== '/cadastro') {
					navigate(-1);
				}
				navigate('/');
			})
			.catch(error => {
				console.log(error);
				return message.error(
					error.response.data + ' - ' + error.code + " " + error.response.status
				);
			});
        
	};

	return (
		<Typography>
			<Typography.Paragraph className="text-center">
				<Row className="content">
					<Col
						xs={0}
						sm={0}
						lg={10}
						className="d-flex align-items-center justify-content-center banner"
					>
						<Image fluid src="./imgs/cadastro/img-cadastro.svg" />
					</Col>
					<Col
						className="col"
						xs={24}
						sm={24}
						lg={14}
						style={{ padding: '3rem' }}
					>
						<Space
							direction="vertical"
							size="middle"
							style={{
								display: 'flex'
							}}
						>
							<Typography.Title level={2} style={{ color: 'var(--purple)' }}>
								{t('btn-login')}
							</Typography.Title>
							<Typography.Title level={5}>{t('login-label')}</Typography.Title>
							<Form
								name="login"
								className="login-form"
								initialValues={{
									remember: true
								}}
								onFinish={enviarDados}
								layout="vertical"
								colon={false}
								scrollToFirstError
							>
								<Item
									name="email"
									validateFirst={true}
									label="Email"
									rules={[
										{
											required: true,
											message: t('login-email-required')
										}
									]}
									hasFeedback
								>
									<Input
										prefix={<MailOutlined />}
										placeholder="Email"
										name="email"
									/>
								</Item>
								<Item
									name="senha"
									label={t('input-password')}
									validateFirst={true}
									rules={RULES_USER_PASSWORD()}
									style={{marginBottom: '1.5rem'}}
									hasFeedback
								>
									<Password
										prefix={<LockOutlined />}
										type="password"
										placeholder={t('input-password')}
										name="senha"
									/>
								</Item>

								<Space
									direction="vertical"
									size={2}
									style={{
										display: 'flex',
										flexWrap: 'wrap'
									}}
								>
									<Row align="center">
										<Col xs={12} sm={10} md={6} lg={8}>
											<Button
												type="primary"
												htmlType="submit"
												className="login-form-button"
												block
												icon={<BiLogIn size={20} />}
											>
												{t('btn-login')}
											</Button>
										</Col>
									</Row>

									<Divider plain>{t('or-divider')}</Divider>
									<Row align="center">
										<Col xs={12} sm={10} md={6} lg={8}>
											<Button block onClick={() => navigate('/cadastro')}>
												{t('btn-signup')}
											</Button>
										</Col>
									</Row>

									<Link to="/" className="custom-link">
										<Space>
											<small>{t('login-continue')}</small>
											<BiArrowToRight size={15} />
										</Space>
									</Link>
								</Space>
							</Form>
						</Space>
					</Col>
				</Row>
			</Typography.Paragraph>
		</Typography>
	);
};

export default Login;
