import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import {
  Anchor,
  Checkbox,
  Divider,
  Form,
  Layout,
  message,
  Typography,
} from 'antd'
import { Image } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import { Col, Row } from 'react-flexbox-grid'
import { BiLogIn } from 'react-icons/bi'

import { getCursos } from '../../../services/cursos'
import { postUsuario, getEmailDominios } from '../../../services/usuario'

import Button from '../../common/button'
import Input, { Password } from '../../common/input'
import Select from '../../common/select'
import UploadImage from '../../common/upload-image'

import {
  error,
  sendEmailTemplateDefault,
  sendVerificationEmail,
  valideTokenEmailVerification,
} from '../../../utils/functions'
import {
  RULES_USER_AGREEMENT,
  RULES_USER_CURSO,
  RULES_USER_EMAIL,
  RULES_USER_NAME,
  RULES_USER_PASSWORD,
} from '../../../utils/rules'
import '../../auth/index.css'
import Termos from 'components/termos'
import { contentEmailVerification } from 'utils/constants'

const { Title, Paragraph } = Typography

// const ALUNO = '@aluno.ifsp.edu.br'
// const GERAL = '@ifsp.edu.br'

const Cadastro = () => {
  const navigate = useNavigate()
  const { Item } = Form
  const [campos, setCampos] = useState({ email: '@aluno.ifsp.edu.br' })
  const [dominios, setDominios] = useState({})
  const [optionsCurso, setOptionsCurso] = useState([])
  const { t } = useTranslation()

  const alteraCampoTipo = (valor, campo) => {
    setCampos({
      ...campos,
      [campo]: valor,
    })
  }

  const getDominios = () => {
    getEmailDominios()
      .then((response) => {
        setDominios({
          aluno: response.data[0].dominio,
          geral: response.data[1].dominio,
        })
      })
      .catch(error)
  }

  useEffect(() => {
    getCursos()
      .then((response) => {
        const lista = response.data.map((curso) => {
          return {
            value: curso.sigla,
            label: curso.sigla + ' - ' + curso.nome,
          }
        })
        setOptionsCurso(lista)
      })
      .catch(error)
    getDominios()
  }, [])

  const optionsEmail = [
    { value: dominios.aluno, label: dominios.aluno },
    { value: dominios.geral, label: dominios.geral },
  ]

  const validacaoEmail = (values) => {
    const { apelido, email, codigo } = values

    const objDataEmail = {
      to_email: email,
      title: 'Confirmação de email - IFriends',
      content: contentEmailVerification({
        nome: apelido,
        email,
        codigo: valideTokenEmailVerification(codigo),
      }),
    }

    sendEmailTemplateDefault(objDataEmail)
      .then(() => {
        message.success(t('sinup-email-validate-verify'))
        navigate('/login')
      })
      .catch(error)
  }

  const enviarDados = (values) => {
    const usuario = {
      ...values,
      email: `${values.email}${campos.email}`,
      imagem: campos.imagem,
      ano: 0,
    }

    postUsuario(usuario)
      .then((request) => {
        message.success(
          t('sinup-user') +
            request.data.apelido +
            t('sinup-user-created-success')
        )
        validacaoEmail(request.data)
      })
      .catch(error)
  }

  const selectAfter = (
    <Select
      name="email"
      value={campos.email}
      options={optionsEmail}
      onChange={alteraCampoTipo}
    />
  )

  return (
    <Layout.Content>
      <Container>
        <Paragraph className="text-center">
          <Row className="content">
            <Col xs={12} sm={12} lg={6} className="col">
              <Container style={{ marginTop: '1.5rem' }}>
                <Title level={2} style={{ color: 'var(--purple)' }}>
                  {t('btn-signup')}
                </Title>
                <Title level={5}>{t('signup-label')}</Title>

                {/* <Button
                  onClick={() =>
                    sendVerificationEmail({
                      toName: 'Zé',
                      toEmail: 'jose.roberto@aluno.ifsp.edu.br',
                      codigo: 'a',
                    })
                  }
                >
                  enviar
                </Button> */}
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
                    label={t('input-nickname')}
                    name="apelido"
                    tooltip={t('signup-tooltip-nickname')}
                    validateFirst={true}
                    rules={RULES_USER_NAME()}
                    hasFeedback
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder={t('input-nickname')}
                      name="apelido"
                    />
                  </Item>
                  <Item
                    name="email"
                    // tooltip={t('signup-tooltip-email')}
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
                  <Item
                    name="curso"
                    label={t('input-course')}
                    tooltip={t('signup-tooltip-password')}
                    rules={RULES_USER_CURSO()}
                    validateFirst={true}
                    hasFeedback
                  >
                    <Select
                      name="curso"
                      placeholder={t('input-course')}
                      options={optionsCurso}
                      allowClear
                    />
                  </Item>
                  <Item
                    name="imagem"
                    label={t('input-image')}
                    className="d-flex text-left"
                  >
                    <UploadImage
                      alteraCampoTipo={alteraCampoTipo}
                      renderWithDragger={false}
                    />
                  </Item>
                  <Item
                    name="agreement"
                    valuePropName="checked"
                    rules={RULES_USER_AGREEMENT()}
                  >
                    <Checkbox name="agreement">
                      {t('sinup-agreement')}
                      <Termos />
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
              </Container>
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
      </Container>
    </Layout.Content>
  )
}

export default Cadastro
