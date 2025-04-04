import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
// ------- STYLES -----
import './index.css'
import Typewriter from 'typewriter-effect'
import Container from 'react-bootstrap/Container'


// ------- COMPONENTS -----

// Antd and Bootstrap
import { Card, Col, Row, Space, Typography } from 'antd'

// Created
import BuscaItens from './busca-itens'
import Categorias from './categorias'
import FiltrosOrdenacao from './filtros-ordenacao'
import { pathsMenu } from 'utils/constants'


// ------ ICONS -----

// Services

// ------ FUNCTIONS ------

const BannerDashboard = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const [exibeFiltro, setExibeFiltro] = useState(true)
  const urlPath = location.pathname
  useEffect(() => {
    if (urlPath === pathsMenu.perguntas || urlPath === pathsMenu.dashboard) {
      setExibeFiltro(true)
    } else if (urlPath === pathsMenu.eventos) {
      setExibeFiltro(false)
    } else {
      setExibeFiltro(true)
    }
  }, [urlPath])

  return (
    <>
      <Card className="card-container-dashboard card-dashboard">
        <Space align="center" direction="vertical" size="middle">
          <Typography.Title className="card-title">
            <Typewriter
              options={{
                strings: [
                  t('dashboard-banner-title-1'),
                  t('dashboard-banner-title-2'),
                  t('dashboard-banner-title-3'),
                  t('dashboard-banner-title-4'),
                ],
                autoStart: true,
                loop: true,
                pauseFor: 1750,
                deleteSpeed: 75,
              }}
            />
          </Typography.Title>
        </Space>
      </Card>

      <Row className="search-box" justify="center" align="middle">
        <BuscaItens />
      </Row>
      {urlPath !== pathsMenu.usuarios ? (
        <>
          <Row>
            <Categorias />
            <FiltrosOrdenacao exibeFiltroPergunta={exibeFiltro} />
          </Row>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default BannerDashboard
