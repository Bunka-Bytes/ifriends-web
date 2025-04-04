import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Anchor, Divider, Form, message, Typography } from 'antd'

import { salvarToken } from '../../../services/auth'
import { loginPostUsuario } from '../../../services/usuario'

import Input, { TextArea } from '../../common/input'

import { MEDIUM, SMALL_MEDIUM } from 'components/common/modal'
import ModalButton, { NORMAL } from 'components/common/modal-button'
import { contentEmailForgotPassword, contactFormContent } from 'utils/constants'
import { concatenando, error, sendEmailTemplateDefault } from 'utils/functions'
import '../../auth/index.css'
import { RULES_USER_NAME } from 'utils/rules'

import { Col, Container, Row } from 'react-bootstrap'
import Button from 'components/common/button'

import { BsLinkedin, BsGithub, BsYoutube } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { ImBlogger } from 'react-icons/im'
import './styles.css'

const ContatoFormulario = () => {
  const { Item } = Form
  const { t } = useTranslation()
  const modalRef = useRef(null)
  const { Title, Paragraph } = Typography

  const enviarDados = (values) => {
    const { email, nome, conteudo, title } = values
    const objDataEmail = {
      from_email: email,
      to_email: 'bunkabytes@gmail.com',
      title: concatenando([title, nome, email], ' - '),
      content: contactFormContent({ conteudo, nome, email }),
    }

    sendEmailTemplateDefault(objDataEmail)
      .then(() => {
        modalRef.current.fechaModal()
        message.success(t('email-send-with-sucess'))
      })
      .catch(error)
  }

  return (
    <ModalButton
      ref={modalRef}
      size={MEDIUM}
      modalTitle={t('footer-contact-link')}
      tipoBotao={NORMAL}
      label={t('footer-contact-link')}
      // icon={<FaEdit />}
      type="text"
      ghost
      // disabled={disabled}
      // onOpen={() => carregaDados()}
      // onCancel={setaPerfil}
      // onOpen={setaPerfil}
    >
      <Paragraph>
        Caso queira entrar em contato para tirar qualquer dúvida, dar alguma
        opinião ou crítica construtiva sobre o IFriends ou o nosso trabalho,
        pode nos encontrar nas seguintes plataformas:
      </Paragraph>
      <Divider style={{ marginBottom: '0.75rem' }} />
      <Row>
        <Col md={3} />
        <Col
          md={2}
          className=" d-flex align-items-center justify-content-center"
        >
          <a
            className="icon-link"
            href="https://github.com/Bunka-Bytes"
            target="_blank"
          >
            <BsGithub size={28} />
          </a>
        </Col>
        <Col
          md={2}
          className=" d-flex align-items-center justify-content-center"
        >
          <a
            className=" icon-link"
            href="https://bunkabytes.blogspot.com/"
            target="_blank"
          >
            <ImBlogger size={28} />
          </a>
        </Col>
        <Col
          md={2}
          className=" d-flex align-items-center justify-content-center"
        >
          <a
            className=" d-flex align-items-center justify-content-center icon-link"
            rel="noreferrer"
            href="https://www.youtube.com/@bunkabytes"
            target="_blank"
          >
            <BsYoutube size={28} />
          </a>
        </Col>
        <Col md={3} />
      </Row>
      <Divider style={{ marginTop: '0.75rem' }} />
      <Form
        name="contato-form"
        onFinish={enviarDados}
        layout="vertical"
        colon={false}
        scrollToFirstError
      >
        <Row>
          <Col md={6}>
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
          </Col>
          <Col md={6}>
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
          </Col>
        </Row>
        <Item
          name="conteudo"
          tooltip={t('content-email-tooltip')}
          // rules={RULES_USER_EMAIL()}
          rules={[
            {
              required: true,
              message: t('content-email-required'),
            },
          ]}
          validateFirst={true}
          label={t('content')}
          hasFeedback
        >
          <TextArea
            placeholder={t('content')}
            name="conteudo"
            // bordered={false}
            // allowClear={true}
            showCount
            maxLength={750}
            autoSize={{ minRows: 3, maxRows: 5 }}
            // onChange={alteraCampoTipo}
            // value={campos.bio}
            // value={campos.texto}
            // onChange={(e) =>
            //   alteraCampoTipo(e.target.value, e.target.name)
            // }
          />
        </Item>

        <Item>
          <Row style={{ marginTop: '0.75rem' }}>
            <Col xs={3} sm={8} lg={9} />
            <Col xs={6} sm={4} lg={3}>
              <Button
                type="primary"
                block
                htmlType="submit"
                // icon={<BiLogIn size={20} />}
              >
                Enviar
              </Button>
            </Col>
            <Col xs={3} sm={0} md={0} lg={0} />
          </Row>
        </Item>
      </Form>
    </ModalButton>
  )
}

export default ContatoFormulario
