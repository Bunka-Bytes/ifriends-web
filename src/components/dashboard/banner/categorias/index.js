import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MdClear } from 'react-icons/md'

// ------- STYLES -----

// ------- COMPONENTS -----

// Antd and Bootstrap
import {
  Card,
  Col,
  Image,
  List,
  Row,
  Carousel,
  Typography,
  Button,
  Space,
} from 'antd'
import { getCategorias } from 'services/categorias'
import { error } from 'utils/functions'
import { Container } from 'react-bootstrap'

// Created

// ------ ICONS -----

// Services

// ------ FUNCTIONS ------
import { connect } from 'react-redux'
import { selecionarBusca, limparFiltros } from 'redux/modules/filtro'

const Categorias = (props) => {
  const { t } = useTranslation()
  const [categorias, setCategorias] = useState([])
  const [active, setActive] = useState(false)
  const [selectedItem, setSelectedItem] = useState(0)
  const { selecionarBusca, limparFiltros } = props

  useEffect(() => {
    return () => {
      selecionarBusca({})
      limparFiltros({})
    }
  }, [selecionarBusca, limparFiltros])

  useEffect(() => {
    getCategorias()
      .then((response) => {
        setCategorias(response.data)
      })
      .catch(error)
  }, [])

  const settings = {
    // arrows: true,
    dots: true,
    infinite: true,
    swipeToSlide: true,
    centerPadding: '60px',
    speed: 500,
    slidesToShow: categorias.length,
    slidesToScroll: categorias.length,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
    ],
  }

  return (
    <Container style={{ marginBottom: '1.5rem' }}>
      <Carousel {...settings} className="carousel">
        {categorias.map((item) => (
          <div key={item.id}>
            <Card
              size="small"
              onClick={() => {
                selecionarBusca({ categoria: item.id })
                setActive(true)
                setSelectedItem(item.id)
              }}
              className={
                active === true && item.id === selectedItem
                  ? 'ant-card-active'
                  : null
              }
            >
              <Row
                style={{
                  display: 'grid',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Col style={{ marginTop: '0.5rem' }}>
                  <Image
                    width={35}
                    height={35}
                    preview={false}
                    src={`/imgs/categorias/${item.nome.toLowerCase()}.svg`}
                  />
                </Col>
                <Col style={{ marginTop: '0.25rem' }}>
                  <Typography.Paragraph>{item.nome}</Typography.Paragraph>
                </Col>
              </Row>
            </Card>
          </div>
        ))}
      </Carousel>
      {active === true && (
        <Row align="middle" justify="end" style={{ marginTop: '0.5rem' }}>
          <Button
            onClick={() => {
              selecionarBusca({})
              limparFiltros({})
              setActive(false)
            }}
          >
            <Space>
              <MdClear />
              {t('menu-clear-filter')}
            </Space>
          </Button>
        </Row>
      )}
    </Container>
  )
}

const mapDispatchToProps = {
  selecionarBusca,
  limparFiltros,
}

export default connect(null, mapDispatchToProps)(Categorias)
