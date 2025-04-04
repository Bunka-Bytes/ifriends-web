import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Button, Layout, message, Space, Typography } from 'antd'
import { Col, Row } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import { Grid } from 'react-flexbox-grid'
import { FiChevronDown, FiTag } from 'react-icons/fi'
import { IoIosCalendar } from 'react-icons/io'
import { BiTimeFive, BiMap } from 'react-icons/bi'
import { AiOutlineLink } from 'react-icons/ai'
import { GoPencil } from 'react-icons/go'
import { ImNewspaper } from 'react-icons/im'

import 'bootstrap/dist/css/bootstrap.min.css'
import TagGroup from '../common/tag-group'

import { error } from 'utils/functions'
import { getCategorias } from '../../services/categorias'
import { postEvento } from '../../services/evento'
import CardCadastro from '../common/card-cadastro'
import Select from '../common/select'
import UploadImage from 'components/common/upload-image'
import Input, { TextArea } from 'components/common/input'
import DatePicker from 'components/common/date-picker'

const { Content } = Layout

const CriaEvento = (props) => {
  const { Title } = Typography

  const navigate = useNavigate()
  const { t } = useTranslation()

  const [campos, setCampos] = useState({
    tags: [],
  })
  const [listData, setListData] = useState([])
  const optionsTipoEvento = [
    { value: false, label: t('criar-evento-online') },
    { value: true, label: t('criar-evento-presencial') },
  ]

  const alteraCampoTipo = (valor, campo) => {
    setCampos({
      ...campos,
      [campo]: valor,
    })
  }

  const salvar = (evento) => {
    //   criar dados para categorias
    // const eventoObjCorrigido = {...evento,eventoData:}

    postEvento(evento)
      .then((request) => {
        message.success(t('log-message-event-sent'))
        navigate(`/evento/${request.data.id}`)
      })
      .catch(error)
  }

  useEffect(() => {
    getCategorias()
      .then((request) => {
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
            {t('criar-evento-title')}
          </Title>
          <Row between="xs" top="xs" className="g-4">
            <Space direction="vertical" size="middle">
              <Col xs={12} sm={12}>
                {CardCadastro({
                  icone: <GoPencil />,
                  titulo: t('criar-evento-label-title'),
                  descricao: t('criar-evento-label-title-descp'),
                  children: (
                    <Input
                      placeholder={t('criar-evento-placeholder-write')}
                      bordered={false}
                      allowClear={true}
                      showCount
                      maxLength={50}
                      name={'nome'}
                      onChange={alteraCampoTipo}
                      value={campos.nome}
                    />
                  ),
                })}
              </Col>
              <Col xs={12} sm={12}>
                <CardCadastro
                  icone={<ImNewspaper />}
                  titulo={t('criar-evento-label-problem')}
                  descricao={t('criar-evento-label-problem-descp')}
                >
                  <TextArea
                    placeholder={t('criar-evento-placeholder-write')}
                    bordered={false}
                    allowClear={true}
                    showCount
                    maxLength={2500}
                    name={'descricao'}
                    autoSize={{ minRows: 5, maxRows: 25 }}
                    value={campos.descricao}
                    onChange={(e) =>
                      alteraCampoTipo(e.target.value, e.target.name)
                    }
                  />
                </CardCadastro>
              </Col>
              <Col xs={12} sm={12}>
                <UploadImage alteraCampoTipo={alteraCampoTipo} maxFiles={5} />
              </Col>
              {
                //
              }
              <Col xs={12} sm={12}>
                <CardCadastro
                  icone={<FiChevronDown />}
                  titulo={t('criar-evento-tipo')}
                  descricao={t('criar-evento-tipo-descp')}
                >
                  <Select
                    // showSearch
                    placeholder={t('criar-evento-tipo-select')}
                    optionFilterProp="label"
                    name={'presencial'}
                    onChange={alteraCampoTipo}
                    value={campos.presencial}
                    filterOption={(input, option) => {
                      // arrumar
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }}
                    bordered={false}
                    allowClear={true}
                    style={{ width: '100%' }}
                    options={optionsTipoEvento}
                  />
                </CardCadastro>
              </Col>
              <Col xs={12} sm={12}>
                <CardCadastro
                  icone={<IoIosCalendar />}
                  titulo={t('criar-evento-data')}
                  descricao={t('criar-evento-data-descp')}
                >
                  <DatePicker
                    showTime
                    name="dataEvento"
                    value={campos.dataEvento}
                    onChange={alteraCampoTipo}
                  />
                </CardCadastro>
              </Col>
              <Col xs={12} sm={12}>
                <CardCadastro
                  icone={<BiMap />}
                  titulo={t('criar-evento-local')}
                  descricao={t('criar-evento-local-descp')}
                >
                  <Input
                    placeholder={t('criar-evento-placeholder-write')}
                    name={'local'}
                    value={campos.local}
                    onChange={alteraCampoTipo}
                    showCount
                    maxLength={50}
                    bordered={false}
                    allowClear={true}
                  />
                </CardCadastro>
              </Col>
              <Col xs={12} sm={12}>
                <CardCadastro
                  icone={<AiOutlineLink />}
                  titulo={t('criar-evento-link')}
                  descricao={t('criar-evento-link-descp')}
                >
                  <Input
                    placeholder={t('criar-evento-placeholder-write')}
                    name={'link'}
                    value={campos.link}
                    onChange={alteraCampoTipo}
                    showCount
                    maxLength={50}
                    bordered={false}
                    allowClear={true}
                  />
                </CardCadastro>
              </Col>
              {
                //
              }
              <Col xs={12} sm={12}>
                {CardCadastro({
                  icone: <FiChevronDown />,
                  titulo: t('criar-evento-label-category'),
                  descricao: t('criar-evento-label-category-descp'),
                  children: (
                    <Select
                      // showSearch
                      placeholder={t('criar-evento-label-category-select')}
                      optionFilterProp="label"
                      name={'categoria'}
                      onChange={alteraCampoTipo}
                      value={campos.categoria}
                      filterOption={(input, option) => {
                        // arrumar
                        option.label.toLowerCase().includes(input.toLowerCase())
                      }}
                      bordered={false}
                      allowClear={true}
                      style={{ width: '100%' }}
                      options={listData}
                    />
                  ),
                })}
              </Col>
              <Col xs={12} sm={12}>
                {CardCadastro({
                  icone: <FiTag />,
                  titulo: t('criar-evento-label-tag'),
                  descricao: t('criar-evento-label-tag-descp'),
                  children: (
                    <TagGroup
                      tags={campos.tags}
                      alteraCampoTipo={alteraCampoTipo}
                    />
                  ),
                })}
              </Col>
              <Col xs={12} sm={12} className="d-flex justify-content-between">
                <Button
                  type="primary"
                  danger
                  onClick={() => navigate('/dashboard/eventos')}
                >
                  {t('criar-evento-cancel')}
                </Button>
                <Button type="primary" onClick={() => salvar(campos)}>
                  {t('criar-evento-confirm')}
                </Button>
              </Col>
            </Space>
          </Row>
        </Container>
      </Grid>
    </Content>
  )
}

export default CriaEvento
