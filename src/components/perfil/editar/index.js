import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, message, Radio, Typography } from 'antd'
import { Col, Container, Row } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'

import 'bootstrap/dist/css/bootstrap.min.css'

import { getCursos } from '../../../services/cursos'
import { putUsuario } from '../../../services/usuario'

import Input, { Password, TextArea } from '../../common/input'
import Select from '../../common/select'
import UploadImage from '../../common/upload-image'

import {
  RULES_PASSWORD_CONFIRM,
  RULES_USER_NAME,
  RULES_USER_PASSWORD,
} from '../../../utils/rules'
import '../../auth/index.css'

import { MEDIUM } from 'components/common/modal'
import ModalButton, { NORMAL } from 'components/common/modal-button'
import 'ordinal-pt-br'
import { ordinalSuffixOfInternalization } from 'utils/functions'

const { Paragraph } = Typography
const ALUNO = '@aluno.ifsp.edu.br'
const GERAL = '@ifsp.edu.br'
const { Item } = Form
const optionsEmail = [
  { value: ALUNO, label: ALUNO },
  { value: GERAL, label: GERAL },
]

const EditarPerfil = (props) => {
  const { perfil, setPerfil } = props
  const [campos, setCampos] = useState({
    dominioEmail: ALUNO,
    tags: [],
    tipoCurso: 'TEC',
    imagem: 'CARREGANDO',
  })
  const [optionsCurso, setOptionsCurso] = useState([])
  const [cursos, setCursos] = useState([])
  const { t } = useTranslation()
  const { idPerfil } = useParams()
  const modalRef = useRef(null)

  const [form] = Form.useForm()

  let formData = form.getFieldsValue(true)

  const alteraCampoTipo = (valor, campo) => {
    setCampos({
      ...campos,
      [campo]: valor,
    })
  }

  const enviarDados = (values) => {
    const usuario = {
      ...values,
      email: `${values.email}${campos.dominioEmail}`,
      imagem: campos.imagem,
    }

    putUsuario(idPerfil, usuario)
      .then((request) => {
        message.success(`Usuário ${request.data.nome} editado com sucesso!`)
        setPerfil(request.data)
        modalRef.current.fechaModal()
      })
      .catch((error) => {
        console.log(error)
        return message.error(
          error.response.data + ' - ' + error.code + ' ' + error.response.status
        )
      })
  }

  useEffect(() => {
    // getUsuario(idPerfil)
    //   .then((response) => {
    //     const data = response.data
    //     setCampos({
    //       ...data,
    //       email: data.email?.substring(0, data.email.indexOf('@')),
    //       tipoCurso: data.tipoCurso || 'TEC',
    //       dominioEmail: data.email?.substring(data.email.indexOf('@')) || ALUNO,
    //       curso: data.curso?.sigla,
    //     })
    //     form.setFieldsValue({
    //       ...data,
    //       email: data.email?.substring(0, data.email.indexOf('@')),
    //       tipoCurso: data.tipoCurso || 'TEC',
    //       dominioEmail: data.email?.substring(data.email.indexOf('@')) || ALUNO,
    //       curso: data.curso?.sigla,
    //     })
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     return message.error(
    //       error.response.data + ' - ' + error.code + ' ' + error.response.status
    //     )
    //   })
    getCursos()
      .then((response) => {
        const lista = response.data.map((curso) => {
          return {
            value: curso.sigla,
            label: curso.sigla + ' - ' + curso.nome,
          }
        })
        setCursos(response.data)
        setOptionsCurso(lista)
      })
      .catch((error) => {
        console.log(error)
        return message.error(
          error.response.data + ' - ' + error.code + ' ' + error.response.status
        )
      })
  }, [])

  const selectAfter = (
    <Select
      name="dominioEmail"
      value={campos.dominioEmail}
      options={optionsEmail}
      onChange={
        alteraCampoTipo
        //   (value) => {
        //   console.log(value)
        //   console.log(formData)
        //   form.setFieldsValue({
        //     ...formData,
        //     dominioEmail: value,
        //   })
        // }
      }
    />
  )

  const optionsAnoSemestre = () => {
    const arrayAnoSemestre = []
    for (let i = 1; i <= 6; i++) {
      arrayAnoSemestre.push({
        value: i,
        label: `${ordinalSuffixOfInternalization(i)} ${
          cursos.find((curso) => curso.sigla == campos?.curso)?.tipoCurso
            .tipo == 'TÉCNICO'
            ? t('input-year')
            : t('input-semester')
        }`,
      })
    }

    return arrayAnoSemestre
  }

  const geraFileList = (url) => [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url,
    },
  ]
  // console.log(
  //   cursos.find((curso) => {
  //     console.log(curso)
  //     console.log(campos.curso)
  //     return curso.sigla == campos.curso
  //   })
  // )

  console.log(
    cursos.find((curso) => curso.sigla == campos?.curso)?.tipoCurso.tipo
  )

  console.log(
    cursos.find((curso) => curso.sigla == campos?.curso)?.tipoCurso.tipo ==
      'TÉCNICO'
      ? t('input-year')
      : t('input-semester')
  )
  const setaPerfil = () => {
    setCampos({
      ...perfil,
      email: perfil.email?.substring(0, perfil.email.indexOf('@')),
      tipoCurso: perfil.tipoCurso || 'TEC',
      dominioEmail: perfil.email?.substring(perfil.email.indexOf('@')) || ALUNO,
      curso: perfil.curso?.sigla,
    })
    form.setFieldsValue({
      ...perfil,
      email: perfil.email?.substring(0, perfil.email.indexOf('@')),
      tipoCurso: perfil.tipoCurso || 'TEC',
      dominioEmail: perfil.email?.substring(perfil.email.indexOf('@')) || ALUNO,
      curso: perfil.curso?.sigla,
    })
  }
  return (
    <ModalButton
      ref={modalRef}
      size={MEDIUM}
      modalTitle={t('perfil-label-editar-perfil')}
      tipoBotao={NORMAL}
      label={t('perfil-label-editar')}
      icon={<FaEdit />}
      // type="primary"
      ghost
      // disabled={disabled}
      // onOpen={() => carregaDados()}
      onCancel={setaPerfil}
      onOpen={setaPerfil}
    >
      <Container>
        <Typography>
          <Paragraph>
            <Form
              name="atualizacao"
              onFinish={enviarDados}
              layout="vertical"
              colon={false}
              scrollToFirstError
              form={form}
              initialValues={{
                dominioEmail: ALUNO,
                tags: [],
                tipoCurso: 'TEC',
                imagem: 'CARREGANDO',
              }}
              // fields={campos}
              // initialValues={[('nome': { value: 'a' })]}
              // fields={[('nome': { value: 'a' })]}
              // onValuesChange={(a, b) =>
              //   console.log(
              //     Object.entries(a).forEach(([key, value]) =>
              //       alteraCampoTipo(value, key)
              //     )
              //   )
              // }
              onValuesChange={(a, b) => {
                formData = form.getFieldsValue(true)
              }}
            >
              <Row>
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
                      // onChange={alteraCampoTipo}
                      // value={campos.nome}
                    />
                  </Item>
                </Col>
                <Col md={6}>
                  <Item
                    label={t('input-nickname')}
                    name="apelido"
                    tooltip={t('perfil-label-editar-nickname')}
                    validateFirst={true}
                    rules={RULES_USER_NAME()}
                    hasFeedback
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder={t('input-nickname')}
                      name="apelido"
                      // onChange={alteraCampoTipo}
                      // value={campos.apelido}
                    />
                  </Item>
                </Col>
                <Col md={12}>
                  <Item
                    name="bio"
                    tooltip={t('perfil-label-editar-sobre')}
                    // rules={RULES_USER_EMAIL()}
                    validateFirst={true}
                    label={t('perfil-label-sobre')}
                    hasFeedback
                  >
                    <TextArea
                      prefix={<MailOutlined />}
                      placeholder={t('perfil-label-sobre')}
                      name="bio"
                      // bordered={false}
                      // allowClear={true}
                      showCount
                      maxLength={1000}
                      autoSize={{ minRows: 3, maxRows: 5 }}
                      // onChange={alteraCampoTipo}
                      // value={campos.bio}
                      // value={campos.texto}
                      // onChange={(e) =>
                      //   alteraCampoTipo(e.target.value, e.target.name)
                      // }
                    />
                  </Item>
                </Col>
                <Col md={12}>
                  <Item
                    name="imagem"
                    label={t('perfil-label-editar-img')}
                    tooltip={t('perfil-label-editar-img')}
                  >
                    {formData.imagem !== 'CARREGANDO' && (
                      <UploadImage
                        alteraCampoTipo={alteraCampoTipo}
                        fileList={geraFileList(campos.imagem)}
                        renderWithDragger={false}
                      />
                    )}
                  </Item>
                </Col>
                {/* <Col md={12}>
                  <Form.Item label="Curso">
                    <Radio.Group
                      onChange={(e) => {
                        const value = e.target.value
                        const name = e.target.name
                        alteraCampoTipo(value, name)
                      }}
                      // value={campos.tipoCurso}
                      name="tipoCurso"
                      value={campos.tipoCurso}
                      // optionType="button"
                      options={[
                        { value: 'TEC', label: 'Técnico' },
                        { value: 'SUP', label: 'Superior' },
                      ]}
                    />
                  </Form.Item>
                </Col> */}
                <Col md={8}>
                  <Item
                    name="curso"
                    // label={t('input-course')}
                    validateFirst={true}
                  >
                    <Select
                      name="curso"
                      placeholder={t('input-course')}
                      options={optionsCurso}
                      onChange={alteraCampoTipo}
                      allowClear
                    />
                  </Item>
                </Col>
                <Col md={4}>
                  <Item
                    name="ano"
                    // label={t('input-course')}
                    validateFirst={true}
                  >
                    <Select
                      name="ano"
                      placeholder={
                        cursos.find((curso) => curso.sigla == campos?.curso)
                          ?.tipoCurso.tipo == 'TÉCNICO'
                          ? t('input-year')
                          : t('input-semester')
                      }
                      options={optionsAnoSemestre()}
                      // onChange={alteraCampoTipo}
                      allowClear
                    />
                  </Item>
                </Col>
                <Col md={6}>
                  <Item
                    name="senha"
                    label={t('input-password')}
                    tooltip={t('signup-tooltip-password')}
                    rules={RULES_USER_PASSWORD(false)}
                    validateFirst={true}
                    hasFeedback
                  >
                    <Password
                      prefix={<LockOutlined />}
                      type="password"
                      placeholder={t('input-password')}
                      // onChange={alteraCampoTipo}
                      name="senha"
                    />
                  </Item>
                </Col>
                <Col md={6}>
                  <Item
                    name="confirm_password"
                    label={t('input-password-confirm')}
                    dependencies={['senha']}
                    hasFeedback
                    rules={RULES_PASSWORD_CONFIRM(false)}
                  >
                    <Password
                      prefix={<LockOutlined />}
                      type="password"
                      placeholder={t('input-password')}
                      name="confirm_password"
                    />
                  </Item>
                </Col>
                <Col md={12}>
                  <Item>
                    <Row>
                      <Col
                        xs={12}
                        sm={12}
                        className="d-flex justify-content-between"
                      >
                        <Button
                          type="primary"
                          danger
                          onClick={() => {
                            modalRef.current.fechaModal()
                          }}
                        >
                          {t('criar-pergunta-cancel')}
                        </Button>
                        <Button type="primary" htmlType="submit">
                          {t('criar-pergunta-confirm')}
                        </Button>
                      </Col>
                    </Row>
                  </Item>
                </Col>
              </Row>
            </Form>
          </Paragraph>
        </Typography>
      </Container>
    </ModalButton>
  )
}

export default EditarPerfil
