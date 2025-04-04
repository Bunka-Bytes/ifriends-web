import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// ------- STYLES -----
// ------- COMPONENTS -----

// Antd and Bootstrap

// Created
import Search from '../../../common/search'

// Redux
import { connect } from 'react-redux'
import {
  selecionarBusca,
  limparFiltros,
} from '../../../../redux/modules/filtro'
import { Select } from 'antd'

// ------ ICONS -----

// Services

// ------ FUNCTIONS ------

const BuscaItens = (props) => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  const { selecionarBusca, limparFiltros } = props
  const urlPath = location.pathname
  const currentUrlValue = urlPath.replace('/dashboard/', '')
  const [filtro, setFiltro] = useState(
    currentUrlValue !== '/dashboard' ? currentUrlValue : 'perguntas'
  )

  useEffect(() => {
    return () => {
      selecionarBusca({})
      limparFiltros({})
    }
  }, [selecionarBusca, limparFiltros])

  const [campos, setCampos] = useState({ filtro })

  const alteraCampoTipo = (value, campo) => {
    setCampos({
      ...campos,
      [campo]: value,
    })
  }

  const alteraFiltro = (value, campo) => {
    if (currentUrlValue === value) {
      setFiltro(value)
    }
    setFiltro(value)
    navigate(`/dashboard/${value}`)
  }

  const optionsBusca = [
    { value: 'perguntas', label: t('menu-tabs-label-perguntas') },
    { value: 'eventos', label: t('menu-tabs-label-eventos') },
    { value: 'usuarios', label: t('menu-tabs-label-usuarios') },
  ]

  const selectAfter = (
    <Select
      name="filtro"
      defaultValue={filtro}
      options={optionsBusca}
      onChange={alteraFiltro}
    />
  )
  return (
    <>
      <Search
        placeholder={t('menu-search-placeholder')}
        value={campos.titulo == null ? undefined : campos.titulo}
        name="titulo"
        onChange={alteraCampoTipo}
        allowClear
        onSearch={(e, f) => {
          navigate(`/dashboard/${filtro}`)
          selecionarBusca({ pesquisa: e })
        }}
        addonBefore={selectAfter}
        enterButton
        size="large"
        autoComplete="false"
      />
    </>
  )
}

const mapDispatchToProps = {
  selecionarBusca,
  limparFiltros,
}

export default connect(null, mapDispatchToProps)(BuscaItens)
