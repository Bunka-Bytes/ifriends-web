import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { InboxOutlined } from '@ant-design/icons'
import {
  Button,
  Divider,
  Input,
  Layout,
  message,
  Modal,
  Space,
  Typography,
  Upload,
} from 'antd'
import ImgCrop from 'antd-img-crop'
import { Col, Row } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import { Grid } from 'react-flexbox-grid'
import { FiChevronDown, FiTag } from 'react-icons/fi'
import { GoPencil } from 'react-icons/go'
import { ImCheckboxChecked, ImNewspaper } from 'react-icons/im'

import 'bootstrap/dist/css/bootstrap.min.css'
import TagGroup from '../common/tag-group'

import { getCategorias } from '../../services/categorias'
import { postPergunta } from '../../services/pergunta'
import CardCadastro from '../common/card-cadastro'
import Select from '../common/select'
import { error } from 'utils/functions'
import UploadImage from 'components/common/upload-image'

const { Content } = Layout

const CriaPergunta = (props) => {
  const { Title, Paragraph } = Typography
  const { TextArea } = Input

  const navigate = useNavigate()
  const { t } = useTranslation()

  const [campos, setCampos] = useState({
    tags: [],
  })
  const [listData, setListData] = useState([])

  const alteraCampoTipo = (valor, campo) => {
    console.log(valor, campo)
    setCampos({
      ...campos,
      [campo]: valor,
    })
  }

  const salvar = (pergunta) => {
    //   criar dados para categorias
    postPergunta(pergunta)
      .then((request) => {
        console.log(request.data)
        message.success(t('log-message-question-sent'))
        navigate(`/pergunta/${request.data.id}`)
      })
      .catch(error)
  }

  useEffect(() => {
    getCategorias()
      .then((request) => {
        console.log(request.data)
        const lista = request.data.map((categoria, id) => {
          return {
            value: categoria.id,
            label: categoria.nome,
          }
        })
        setListData(lista)
      })
      .catch(error)
  }, [])

  return (
    <Content className="content-margin">
      <Grid fluid>
        <Container>
          <Title level={3} title>
            {t('criar-pergunta-title')}
          </Title>
          <Row between="xs" top="xs" className="g-4">
            <Col xs={12} sm={12} xl={8}>
              <Row between="xs" top="xs">
                <Space direction="vertical" size="middle">
                  <Col xs={12} sm={12}>
                    {CardCadastro({
                      icone: <GoPencil />,
                      titulo: t('criar-pergunta-label-title'),
                      descricao: t('criar-pergunta-label-title-descp'),
                      children: (
                        <Input
                          placeholder={t('criar-pergunta-placeholder-write')}
                          bordered={false}
                          allowClear={true}
                          showCount
                          maxLength={50}
                          name={'titulo'}
                          onChange={(e) =>
                            alteraCampoTipo(e.target.value, e.target.name)
                          }
                          value={campos.titulo}
                        />
                      ),
                    })}
                  </Col>

                  <Col xs={12} sm={12}>
                    <CardCadastro
                      icone={<ImNewspaper />}
                      titulo={t('criar-pergunta-label-problem')}
                      descricao={t('criar-pergunta-label-problem-descp')}
                      children={
                        <TextArea
                          placeholder={t('criar-pergunta-placeholder-write')}
                          bordered={false}
                          allowClear={true}
                          showCount
                          maxLength={25000}
                          name={'texto'}
                          autoSize={{ minRows: 5, maxRows: 25 }}
                          value={campos.texto}
                          onChange={(e) =>
                            alteraCampoTipo(e.target.value, e.target.name)
                          }
                        />
                      }
                    />
                  </Col>
                  <Col xs={12} sm={12}>
                    <UploadImage
                      alteraCampoTipo={alteraCampoTipo}
                      maxFiles={5}
                    />
                  </Col>
                  <Col xs={12} sm={12}>
                    {CardCadastro({
                      icone: <FiChevronDown />,
                      titulo: t('criar-pergunta-label-category'),
                      descricao: t('criar-pergunta-label-category-descp'),
                      children: (
                        <Select
                          placeholder={t(
                            'criar-pergunta-label-category-select'
                          )}
                          name="categoria"
                          value={campos.categoria}
                          onChange={alteraCampoTipo}
                          bordered={false}
                          allowClear={true}
                          options={listData}
                        />
                      ),
                    })}
                  </Col>
                  <Col xs={12} sm={12}>
                    {CardCadastro({
                      icone: <FiTag />,
                      titulo: t('criar-pergunta-label-tag'),
                      descricao: t('criar-pergunta-label-tag-descp'),
                      children: (
                        <TagGroup
                          tags={campos.tags}
                          alteraCampoTipo={alteraCampoTipo}
                        />
                      ),
                    })}
                  </Col>

                  <Col
                    xs={12}
                    sm={12}
                    className="d-flex justify-content-between"
                  >
                    <Button
                      type="primary"
                      danger
                      onClick={() => navigate('/dashboard/perguntas')}
                    >
                      {t('criar-pergunta-cancel')}
                    </Button>
                    <Button type="primary" onClick={() => salvar(campos)}>
                      {t('criar-pergunta-confirm')}
                    </Button>
                  </Col>
                </Space>
              </Row>
            </Col>
            <Col xs={12} sm={12} xl={4}>
              <Typography>
                <Paragraph>
                  <pre style={{ padding: '1.25rem', margin: '0' }}>
                    <Title level={4} className="text-center">
                      <ImCheckboxChecked /> &nbsp;{t('good-question-title')}
                    </Title>
                    <Divider />
                    <Title level={5}>{t('good-question-1')}</Title>
                    <Paragraph>
                      <ul>
                        <li>{t('good-question-1-descp')}</li>
                        <li>{t('good-question-1-descp-2')}</li>
                        <li>{t('good-question-1-descp-3')}</li>
                      </ul>
                    </Paragraph>
                    <Title level={5}>{t('good-question-2')}</Title>
                    <Paragraph>
                      <ul>
                        <li>{t('good-question-2-descp')}</li>
                        <li>{t('good-question-2-descp-2')}</li>
                        <li>{t('good-question-2-descp-3')}</li>
                      </ul>
                    </Paragraph>
                    <Title level={5}>{t('good-question-3')}</Title>
                    <Paragraph>
                      <ul>
                        <li>{t('good-question-3-descp')}</li>
                      </ul>
                    </Paragraph>
                  </pre>
                </Paragraph>
              </Typography>
            </Col>
          </Row>
        </Container>
      </Grid>
    </Content>
  )
}

export default CriaPergunta
