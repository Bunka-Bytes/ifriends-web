import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Form, Checkbox, message, Typography, Divider } from "antd";
import { Row, Col } from "react-flexbox-grid";
import { Image } from "react-bootstrap";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { BiLogIn } from 'react-icons/bi';


import { postUsuario } from "../../../services/usuario";
import { getCursos } from '../../../services/cursos';

import Input, { Password } from '../../common/input';
import Select from '../../common/select';
import Button from '../../common/button';
import UploadImage from '../../common/upload-image';


import '../../auth/index.css';
import {
  RULES_USER_AGREEMENT,
  RULES_USER_EMAIL,
  RULES_USER_NAME,
  RULES_USER_PASSWORD,
} from "../../../utils/rules";

const { Title, Paragraph } = Typography;

const ALUNO = "@aluno.ifsp.edu.br";
const GERAL = "@ifsp.edu.br";

const Cadastro = () => {
  const navigate = useNavigate();
  const { Item } = Form;
  const [campos, setCampos] = useState({ email: ALUNO });
  const [optionsCurso, setOptionsCurso] = useState([]);
  const { t } = useTranslation();
	

  const alteraCampoTipo = (valor, campo) => {
    setCampos({
      ...campos,
      [campo]: valor,
    });
  };

  const enviarDados = (values) => {
    const usuario = {
      ...values,
      email: `${values.email}${campos.email}`,
      imagem: campos.imagem,
    };

    postUsuario(usuario)
			.then(request => {
				message.success(`Usuário ${request.data.nome} criado com sucesso!`);
				navigate('/login');
			})
			.catch(error => {
				console.log(error);
				return message.error(
					error.response.data + ' - ' + error.code + ' ' + error.response.status
				);
			});
  };

  const optionsEmail = [
    { value: ALUNO, label: ALUNO },
    { value: GERAL, label: GERAL },
  ];

//   const optionsCurso = [
//     { value: "INF", label: "INF - Informática" },
//     { value: "ADS", label: "ADS - Análise e Desenvolvimento de Sistemas" },
//     { value: "OUTROS", label: "OUTROS" },
// 	];
	useEffect(() => {
		getCursos()
			.then(response => {
				let lista = response.data.map(curso => {
					return {
						value: curso.sigla,
						label: curso.sigla + " - " + curso.nome
					};
				});
				setOptionsCurso(lista);
			})
			.catch(error => {
				console.log(error);
				return message.error(
					error.response.data + ' - ' + error.code + ' ' + error.response.status
				);
			});
	}, []);

  const selectAfter = (
    <Select
      name="email"
      value={campos.email}
      options={optionsEmail}
      onChange={alteraCampoTipo}
    />
  );

  return (
		<Typography>
			<Paragraph className="text-center">
				<Row className="content">
					<Col xs={12} sm={12} lg={6} className="col">
						<Title level={2} style={{ color: 'var(--purple)' }}>
							{t('btn-signup')}
						</Title>
						<Title level={5}>{t('signup-label')}</Title>

						<Form
							name="cadastro"
							initialValues={{
								remember: true
							}}
							onFinish={enviarDados}
							layout="vertical"
							colon={false}
							scrollToFirstError
						>
							<Item
								label={t('input-name')}
								name="nome"
								tooltip={t('signup-tooltip-user-name')}
								validateFirst={true}
								rules={RULES_USER_NAME()}
								hasFeedback
							>
								<Input
									prefix={<UserOutlined />}
									placeholder={t('input-name')}
									name="nome"
								/>
							</Item>
							<Item
								name="email"
								tooltip={t('signup-tooltip-email')}
								rules={RULES_USER_EMAIL()}
								validateFirst={true}
								label="Email"
								hasFeedback
							>
								<Input
									prefix={<MailOutlined />}
									placeholder="Email"
									name="email"
									addonAfter={selectAfter}
								/>
							</Item>
							<Item
								name="senha"
								label={t('input-password')}
								tooltip={t('signup-tooltip-password')}
								rules={RULES_USER_PASSWORD()}
								validateFirst={true}
								hasFeedback
							>
								<Password
									prefix={<LockOutlined />}
									type="password"
									placeholder={t('input-password')}
									name="senha"
								/>
							</Item>
							<Item name="curso" label={t('input-course')} validateFirst={true}>
								<Select
									name="curso"
									placeholder={t('input-course')}
									options={optionsCurso}
									allowClear
								/>
							</Item>
							<Item name="imagem">
								<UploadImage alteraCampoTipo={alteraCampoTipo} />
							</Item>
							<Item
								name="agreement"
								valuePropName="checked"
								rules={RULES_USER_AGREEMENT()}
							>
								<Checkbox name="agreement">
									{t('sinup-agreement')}
									<Link to="">{t('terms-of-use-label')}</Link>
								</Checkbox>
							</Item>
							<Item>
								<Row>
									<Col xs={0} sm={3} md={3} lg={4} />
									<Col xs={12} sm={6} md={6} lg={4}>
										<Button
											type="primary"
											block
											htmlType="submit"
											icon={<BiLogIn size={20} />}
										>
											{t('btn-signup')}
										</Button>
									</Col>
									<Col xs={0} sm={3} md={3} lg={4} />
								</Row>
								<Divider plain>{t('or-divider')}</Divider>
								<Row>
									<Col xs={0} sm={3} md={3} lg={4} />
									<Col xs={12} sm={6} md={6} lg={4}>
										<Button block onClick={() => navigate('/login')}>
											{t('btn-login')}
										</Button>
									</Col>
									<Col xs={0} sm={3} md={3} lg={4} />
								</Row>
							</Item>
						</Form>
					</Col>
					<Col
						xs={0}
						sm={0}
						lg={6}
						className="d-flex align-items-center justify-content-center banner"
					>
						<Image fluid src="./imgs/cadastro/img-login.svg" />
					</Col>
				</Row>
			</Paragraph>
		</Typography>
	);
};

export default Cadastro;
