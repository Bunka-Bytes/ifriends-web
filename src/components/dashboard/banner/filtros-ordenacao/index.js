import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// ------- STYLES -----

// ------- COMPONENTS -----

// Antd and Bootstrap
import { Dropdown, Menu, Space, Col, Row, Button } from 'antd'
import { Container } from 'react-bootstrap'
import Search from '../../../common/search'
// Created

// ------ ICONS -----
import { IoOptionsOutline, IoFilterOutline } from 'react-icons/io5'
import { connect } from 'react-redux'
import {
  selecionarBusca,
  limparFiltros,
} from '../../../../redux/modules/filtro'

// Services

// ------ FUNCTIONS -----

const FiltrosOrdenacao = (props) => {
  const { t } = useTranslation()
  const [orderBy, setOrderBy] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filterBy, setFilterBy] = useState('')
  const { selecionarBusca, exibeFiltroPergunta, limparFiltros } = props
  const [campos, setCampos] = useState({
    Order: null,
    by: null,
    respondida: null,
    semResposta: null,
    tag: null,
  })

  useEffect(() => {
    return () => {
      selecionarBusca({})
      limparFiltros({})
    }
  }, [selecionarBusca, limparFiltros])

  const alteraCampoTipo = (value, campo) => {
    setCampos({
      ...campos,
      [campo]: value,
    })
  }

  const mudarFiltro = ({ key }) => {
    switch (key) {
      case '0':
        campos.respondida = null
        campos.semResposta = null
        setFilterBy('')
        break
      case '1':
        setFilterBy(t('menu-dropdown-filterby-q-replys'))
        campos.respondida = true
        campos.semResposta = null
        break
      case '2':
        setFilterBy(t('menu-dropdown-filterby-q-no-replys'))
        campos.semResposta = true
        campos.respondida = null
        break
      default:
        console.log(key)
        break
    }
    selecionarBusca(campos)
  }

  const mudarOrdenacao = ({ key }) => {
    switch (key) {
      case '0':
        campos.Order = null
        campos.by = null
        setOrderBy('')
        break
      case '2':
        setOrderBy(t('menu-dropdown-orderby-q-mostrecent'))
        campos.Order = false
        campos.by = null
        break
      case '3':
        setOrderBy(t('menu-dropdown-orderby-q-views'))
        campos.Order = true
        campos.by = 'visualizacao'
        break
      case '4':
        setOrderBy(t('menu-dropdown-orderby-q-curtida'))
        campos.Order = true
        campos.by = 'qtdCurtida'
        break
      case '5':
        setOrderBy('A-Z')
        campos.Order = true
        campos.by = 'titulo'
        break
      case '6':
        setOrderBy('Z-A')
        campos.Order = false
        campos.by = 'titulo'
        break
      default:
        console.log(key)
        break
    }
    selecionarBusca(campos)
  }

  const orderbyMenu = (
    <Menu
      onClick={mudarOrdenacao}
      items={[
        {
          label: '----:----',
          key: '0',
        },
        {
          label: t('menu-dropdown-orderby-q-mostrecent'),
          key: '2',
        },
        {
          label: t('menu-dropdown-orderby-q-views'),
          key: '3',
        },
        {
          label: t('menu-dropdown-orderby-q-curtida'),
          key: '4',
        },
        {
          label: 'A-Z',
          key: '5',
        },
        {
          label: 'Z-A',
          key: '6',
        },
      ]}
    />
  )

  const SelectDropdownOptions = (props) => {
    const { menuOptions, label, labelOption, icon } = props
    return (
      <Dropdown overlay={menuOptions} trigger={['click']}>
        <Button>
          <Space>
            {icon}
            {label}
            <b>{labelOption}</b>
          </Space>
        </Button>
      </Dropdown>
    )
  }

  const filterMenu = (
    <Menu
      onClick={mudarFiltro}
      items={[
        {
          label: '----:----',
          key: '0',
        },
        {
          label: t('menu-dropdown-filterby-q-replys'),
          key: '1',
        },
        {
          label: t('menu-dropdown-filterby-q-no-replys'),
          key: '2',
        },
      ]}
    />
  )

  const FilterButton = (props) => {
    return (
      <Col>
        <Button
          onClick={() => {
            setShowFilters((current) => !current)
          }}
        >
          <Space>
            <IoFilterOutline />
            {t('menu-dropdown-filter')}
          </Space>
        </Button>
      </Col>
    )
  }

  return (
    <Container>
      <Row align="middle" justify="space-between" style={{ height: '10vh' }}>
        {exibeFiltroPergunta && (
          // Ordenação Perguntas
          <Col>
            <SelectDropdownOptions
              menuOptions={orderbyMenu}
              label={t('menu-dropdown-orderby')}
              icon={<IoOptionsOutline />}
              labelOption={orderBy}
            />
          </Col>
        )}
        <FilterButton />
      </Row>
      {showFilters && (
        <Container>
          <Row align="middle" style={{ marginBottom: '1rem' }}>
            {/* Pesquisa por Tag - Filtro */}
            <Col xs={24} sm={14} md={12} lg={12} xl={12}>
              <Space direction="vertical">
                <strong>Tags</strong>
                <Search
                  placeholder={t('menu-dropdown-filterby-tags-placeholder')}
                  value={campos.tag == null ? undefined : campos.tag}
                  name="tag"
                  onChange={alteraCampoTipo}
                  allowClear
                  onSearch={(e, f) => {
                    selecionarBusca({ tag: e })
                  }}
                  enterButton
                  size="medium"
                />
              </Space>
            </Col>
            {/* Status da pergunta - Filtro */}
            {exibeFiltroPergunta && (
              <Col
                className="filter-margin"
                xs={24}
                sm={8}
                md={12}
                lg={12}
                xl={12}
              >
                <Space direction="vertical">
                  <strong>{t('menu-dropdown-filterby-q-replys-label')}</strong>
                  <SelectDropdownOptions
                    menuOptions={filterMenu}
                    label={t('menu-dropdown-filterby-type')}
                    labelOption={filterBy}
                  />
                </Space>
              </Col>
            )}
          </Row>
        </Container>
      )}
    </Container>
  )
}
const mapDispatchToProps = {
  selecionarBusca,
  limparFiltros,
}

export default connect(null, mapDispatchToProps)(FiltrosOrdenacao)
