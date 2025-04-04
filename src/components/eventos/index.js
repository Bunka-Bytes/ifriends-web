import React, { Fragment, Suspense, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
// ------- STYLES -----
import 'bootstrap/dist/css/bootstrap.min.css'

// ------- COMPONENTS -----

// Antd and Bootstrap
import { Empty, List, Typography } from 'antd'
import Container from 'react-bootstrap/Container'
import { Grid } from 'react-flexbox-grid'
import Button from '../common/button'
import CardEvento from './card-evento'

// ------ ICONS -----
import { IoIosUndo } from 'react-icons/io'

// Services
import { connect } from 'react-redux'
import { selecionarBusca } from '../../redux/modules/filtro'
import { getEventos } from '../../services/evento'

// ------ FUNCTIONS ------
import Loading from 'components/Loading'
import { useTranslation } from 'react-i18next'
import {
  concatenando,
  error,
  getBeetweenDateWithTextForApiDate,
  toMonthName,
} from '../../utils/functions'
import { FaListAlt } from 'react-icons/fa'

const Eventos = (props) => {
  const [listData, setListData] = useState([])
  const navigate = useNavigate()
  const { Title } = Typography
  const { filtro, selecionarBusca } = props
  const { t } = useTranslation()

  useEffect(() => {
    return () => selecionarBusca({})
  }, [selecionarBusca])

  useEffect(() => {
    getEventos(filtro)
      .then((request) => {
        const lista = request.data.map((evento) => {
          const { dataEmissao } = evento
          const mes = toMonthName(evento?.dataEvento[1])
          const dia = evento?.dataEvento[2]
          return {
            key: evento.id,
            id: evento.id,
            nome: evento.nome,
            dataEvento: evento.dataEvento,
            descricao: evento.descricao,
            local: evento.local,
            mes: mes,
            dia: dia,
            diaComMes: concatenando([dia, mes]),
            presencial: evento.presencial,
            imagens: evento.imagens,
            autor: evento.usuario.apelido,
            idAutor: evento.usuario.id,
            imgPerfil: evento.usuario.imagem,
            data: getBeetweenDateWithTextForApiDate(dataEmissao),
            curtidas: evento.qtdFavorito,
            comentarios: evento.qtdResposta,
            visualizacoes: Math.ceil(Math.random() * 1000),
            nomeCategoria: evento.categoria.nome,
            tags: evento.tags,
          }
        })
        const dataAtual = new Date()
        const listaFiltrada = lista.filter(
          (evento) => evento.dataEvento[1] - 1 >= dataAtual.getMonth()
        )
        setListData(listaFiltrada)
      })
      .catch(error)
  }, [filtro])

  return (
    <Container>
      <Grid fluid className="content-margin">
        {listData.length > 0 ? (
          <Fragment>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page)
                },
                pageSize: 8,
              }}
              dataSource={listData}
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 3,
                xxl: 4,
              }}
              renderItem={(item) => (
                <List.Item>
                  <CardEvento item={item} />
                </List.Item>
              )}
            />
            <Suspense fallback={<Loading />} />
            <Outlet />
          </Fragment>
        ) : (
          <Empty
            description={
              <Title level={5}>{t('dashboard-eventos-not-found')}</Title>
            }
          >
            <Button
              icon={<IoIosUndo color="white" />}
              type="primary"
              onClick={() => navigate('/criar-evento')}
              label={t('dashboard-criar-evento')}
            />
          </Empty>
        )}
      </Grid>
    </Container>
  )
}

const mapStateToProps = (state) => {
  const { filtro } = state.filtroReducer
  return {
    filtro,
  }
}

const mapDispatchToProps = {
  selecionarBusca,
}

export default connect(mapStateToProps, mapDispatchToProps)(Eventos)
