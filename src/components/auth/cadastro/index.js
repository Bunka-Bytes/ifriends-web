import React, { useState } from "react";

import { Form, Checkbox, message, Typography, Divider } from "antd";
import Select from "../../common/select";
import Button from "../../common/button";
import UploadImage from "../../common/upload-image";
import Input, { Password } from "../../common/input";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-flexbox-grid";
import { Image } from "react-bootstrap";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

import { postUsuario } from "../../../services/usuario";

import "./index.css";
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

    postUsuario(usuario).then((request) => {
      message.success(`Usuário ${request.data.nome} criado com sucesso!`);
      navigate("/login");
    });
  };

  const optionsEmail = [
    { value: ALUNO, label: ALUNO },
    { value: GERAL, label: GERAL },
  ];

  const optionsCurso = [
    { value: "INF", label: "INF - Informática" },
    { value: "ADS", label: "ADS - Análise e Desenvolvimento de Sistemas" },
    { value: "OUTROS", label: "OUTROS" },
  ];

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
            <Title level={3}>Cadastro</Title>
            <Title level={5}>Cadastre-se e faça parte da comunidade!</Title>

            <Form
              name="cadastro"
              initialValues={{
                remember: true,
              }}
              onFinish={enviarDados}
              layout="vertical"
              colon={false}
              scrollToFirstError
            >
              <Item
                label="Nome"
                name="nome"
                tooltip="Escreva seu nome completo neste campo."
                validateFirst={true}
                rules={RULES_USER_NAME}
                hasFeedback
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Nome"
                  name="nome"
                />
              </Item>
              <Item
                name="email"
                tooltip="Digite o email e escolha seu domínio ao lado."
                rules={RULES_USER_EMAIL}
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
                label="Senha"
                tooltip="Digite uma senha forte, entre 6-12 caracteres com maiúsculas, minusculas, caracteres especiais e números."
                rules={RULES_USER_PASSWORD}
                validateFirst={true}
                hasFeedback
              >
                <Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Senha"
                  name="senha"
                />
              </Item>
              <Item name="curso" label="Curso" validateFirst={true}>
                <Select
                  name="curso"
                  placeholder="Curso"
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
                rules={RULES_USER_AGREEMENT}
              >
                <Checkbox name="agreement">
                  Eu li e concordo com os <a href="">termos de uso.</a>
                </Checkbox>
              </Item>
              <Item>
                <Row>
                  <Col xs={0} sm={3} md={3} lg={4} />
                  <Col xs={12} sm={6} md={6} lg={4}>
                    <Button type="primary" block htmlType="submit">
                      Cadastrar
                    </Button>
                  </Col>
                  <Col xs={0} sm={3} md={3} lg={4} />
                </Row>
                <Divider plain>ou</Divider>
                <Row>
                  <Col xs={0} sm={3} md={3} lg={4} />
                  <Col xs={12} sm={6} md={6} lg={4}>
                    <Button type="primary" ghost block>
                      Entrar
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
            <Image fluid src="./imgs/cadastro/img-cadastro.svg" />
          </Col>
        </Row>
      </Paragraph>
    </Typography>
  );
};

export default Cadastro;
