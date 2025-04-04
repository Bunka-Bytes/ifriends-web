import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Col, Form, Layout, message, Row, Typography } from 'antd'
import {
  autenticaEmailUsuario,
  postEmailAlterarSenha,
} from '../../../services/usuario'
import { useTranslation } from 'react-i18next'
import { Container } from 'react-bootstrap'
import { Password } from 'components/common/input'
import { RULES_PASSWORD_CONFIRM, RULES_USER_PASSWORD } from 'utils/rules'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { error } from 'utils/functions'

const RecuperacaoSenha = () => {
  const navigate = useNavigate()
  const { codigoVerificador } = useParams()
  const { t } = useTranslation()
  const { Title, Paragraph } = Typography
  const { Item } = Form

  // useEffect(() => {
  //   autenticaEmailUsuario(codigoVerificador)
  //     .then((_) => {
  //       message.success(t('sinup-email-validate'))
  //       navigate('/login')
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       message.error(
  //         error.response.data + ' - ' + error.code + ' ' + error.response.status
  //       )
  //       navigate('/login')
  //     })
  // }, [])

  const enviarDados = (values) => {
    const { senha } = values
    console.log(values)
    postEmailAlterarSenha(codigoVerificador, { senha })
      .then((_) => {
        message.success(t('passord-successfuly-changed'))
        navigate('/login')
      })
      .catch(error)
  }

  return (
    <Layout.Content>
      <Container style={{ marginTop: '1.5rem' }}>
        <Card>
          <Title
            level={3}
            style={{ color: 'var(--purple)' }}
            className="text-center"
          >
            Recuperação de Senha
          </Title>
          <Form
            name="recuperacao-senha"
            initialValues={{
              remember: true,
            }}
            onFinish={enviarDados}
            layout="vertical"
            colon={false}
            scrollToFirstError
          >
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
              name="confirm_password"
              label={t('input-password-confirm')}
              dependencies={['senha']}
              hasFeedback
              rules={RULES_PASSWORD_CONFIRM()}
            >
              <Password
                prefix={<LockOutlined />}
                type="password"
                placeholder={t('input-password')}
                name="confirm_password"
              />
            </Item>
            <Item>
              <Row>
                <Col xs={7} sm={17} md={17} lg={19} />
                <Col xs={10} sm={7} md={7} lg={5}>
                  <Button
                    type="primary"
                    block
                    htmlType="submit"
                    // icon={<BiLogIn size={20} />}
                  >
                    Redefinir Senha
                  </Button>
                </Col>
                <Col xs={7} sm={0} md={0} lg={0} />
              </Row>
            </Item>
          </Form>
        </Card>
      </Container>
    </Layout.Content>
  )
}

export default RecuperacaoSenha
