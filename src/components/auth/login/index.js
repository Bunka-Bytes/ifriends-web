import React, { useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
  Form,
  Button,
  Checkbox,
  message,
  Typography,
  Row,
  Col,
  Divider,
  Space,
  Layout,
} from 'antd'
import { Image } from 'react-bootstrap'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import Container from 'react-bootstrap/Container'

import { BiLogIn, BiArrowToRight } from 'react-icons/bi'

import {
  getEmailAlterarSenha,
  loginPostUsuario,
} from '../../../services/usuario'
import { salvarToken } from '../../../services/auth'

import Input, { Password } from '../../common/input'
import { RULES_USER_EMAIL, RULES_USER_PASSWORD } from '../../../utils/rules'

import '../../auth/index.css'
import {
  error,
  sendEmailTemplateDefault,
  sendVerificationEmail,
  valideTokenEmailVerification,
} from 'utils/functions'
import { MEDIUM, SMALL_MEDIUM } from 'components/common/modal'
import ModalButton, { NORMAL } from 'components/common/modal-button'
import { contentEmailForgotPassword } from 'utils/constants'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { Item } = Form
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const modalRef = useRef(null)

  const enviarDados = (values) => {
    loginPostUsuario(values)
      .then((request) => {
        salvarToken(request.data)
        sessionStorage.setItem('login-time', Date.now())
        message.success(
          `${t('log-message-login-success')} ${request.data.nome} `
        )
        const anterior = location.pathname - 1
        console.log('anterior?', anterior)
        if (anterior !== '/cadastro' && !isNaN(anterior)) {
          navigate(-1)
        }
        navigate('/dashboard')
      })
      .catch(error)
  }

  const recuperacaoSenha = (values) => {
    const { email } = values

    getEmailAlterarSenha(email)
      .then((response) => {
        const { data } = response
        console.log(data)
        const objDataEmail = {
          to_email: email,
          title: 'Recuperação de Senha',
          content: contentEmailForgotPassword({
            codigo: valideTokenEmailVerification(data.codVerificador),
          }),
        }

        sendEmailTemplateDefault(objDataEmail)
          .then(() => {
            modalRef.current.fechaModal()
            message.success(t('recover-password-email-send'))
          })
          .catch(error)
      })
      .catch(error)
  }

  return (
    <Layout.Content>
      <Container>
        <Typography.Paragraph className="text-center">
          <Row className="content" style={{ height: '100vh' }}>
            <Col
              xs={0}
              sm={0}
              lg={12}
              className="d-flex align-items-center justify-content-center banner"
            >
              <Image fluid src="./imgs/cadastro/img-cadastro.svg" />
            </Col>
            <Col
              className="col d-flex align-items-center justify-content-center"
              xs={24}
              sm={24}
              lg={12}
            >
              <Container style={{ marginTop: '1.5rem' }}>
                <Space
                  direction="vertical"
                  size="middle"
                  style={{
                    display: 'flex',
                  }}
                >
                  <Typography.Title
                    level={2}
                    style={{ color: 'var(--purple)' }}
                  >
                    {t('btn-login')}
                  </Typography.Title>
                  <Typography.Title level={5}>
                    {t('login-label')}
                  </Typography.Title>
                  <Form
                    name="login"
                    className="login-form"
                    initialValues={{
                      remember: true,
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
                          message: t('login-email-required'),
                        },
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
                      style={{ marginBottom: '1.5rem' }}
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
                        flexWrap: 'wrap',
                      }}
                    >
                      <Row align="center" style={{ marginTop: '0.5rem' }}>
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

                      <ModalButton
                        ref={modalRef}
                        size={SMALL_MEDIUM}
                        modalTitle={t('login-forgot-password')}
                        tipoBotao={NORMAL}
                        label={<small>{t('login-forgot-password')}</small>}
                        // icon={<FaEdit />}
                        type="text"
                        ghost
                        // disabled={disabled}
                        // onOpen={() => carregaDados()}
                        // onCancel={setaPerfil}
                        // onOpen={setaPerfil}
                      >
                        <Form
                          name="cadastro"
                          initialValues={{
                            remember: true,
                          }}
                          onFinish={recuperacaoSenha}
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
                                message: t('login-email-required'),
                              },
                              {
                                pattern:
                                  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                                message: 'E-mail inválido.',
                              },
                            ]}
                            hasFeedback
                            // tooltip={t('signup-tooltip-email')}
                          >
                            <Input
                              prefix={<MailOutlined />}
                              placeholder="Email"
                              name="email"
                            />
                          </Item>
                          <Item>
                            <Row>
                              <Col xs={6} sm={15} md={15} lg={17} />
                              <Col xs={12} sm={9} md={9} lg={7}>
                                <Button
                                  type="primary"
                                  block
                                  htmlType="submit"
                                  // icon={<BiLogIn size={20} />}
                                >
                                  Redefinir Senha
                                </Button>
                              </Col>
                              <Col xs={6} sm={0} md={0} lg={0} />
                            </Row>
                          </Item>
                        </Form>
                      </ModalButton>

                      <Divider
                        plain
                        style={{
                          marginTop: '0.25rem',
                        }}
                      >
                        {t('or-divider')}
                      </Divider>
                      <Row align="center">
                        <Col xs={12} sm={10} md={6} lg={8}>
                          <Button block onClick={() => navigate('/cadastro')}>
                            {t('btn-signup')}
                          </Button>
                        </Col>
                      </Row>

                      <Link to="/dashboard" className="custom-link">
                        <Space>
                          <small>{t('login-continue')}</small>
                          <BiArrowToRight size={15} />
                        </Space>
                      </Link>
                    </Space>
                  </Form>
                </Space>
              </Container>
            </Col>
          </Row>
        </Typography.Paragraph>
      </Container>
    </Layout.Content>
  )
}

export default Login
