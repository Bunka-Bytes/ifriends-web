import React, { useEffect, useState, Fragment, Suspense } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
// ------- STYLES -----
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'

// ------- COMPONENTS -----

// Antd and Bootstrap
import { Grid } from 'react-flexbox-grid'
import { Typography, List, Empty, BackTop, message } from 'antd'
import Button from '../common/button'
import CardPergunta from './cardPergunta'
import Container from 'react-bootstrap/Container'

// ------ ICONS -----
import { IoIosUndo } from 'react-icons/io'

// Services
import { getPerguntas } from '../../services/pergunta'
import { connect } from 'react-redux'
import { selecionarBusca } from '../../redux/modules/filtro'

// ------ FUNCTIONS ------
import { error, getBeetweenDateWithTextForApiDate } from '../../utils/functions'
import { useTranslation } from 'react-i18next'
import Loading from 'components/Loading'
import { FaRegListAlt } from 'react-icons/fa'

const Perguntas = (props) => {
  const [listData, setListData] = useState([])
  const navigate = useNavigate()
  const { Title } = Typography
  const { filtro, selecionarBusca } = props
  const { t } = useTranslation()

  useEffect(() => {
    return () => selecionarBusca({})
  }, [selecionarBusca])

  useEffect(() => {
    getPerguntas(filtro)
      .then((request) => {
        const lista = request.data.map((pergunta) => {
          const { dataEmissao } = pergunta

          return {
            key: pergunta.id,
            id: pergunta.id,
            titulo: pergunta.titulo,
            descricao: pergunta.texto,
            autor: pergunta.usuario.apelido,
            idAutor: pergunta.usuario.id,
            imgPerfil: pergunta.usuario.imagem,
            data: getBeetweenDateWithTextForApiDate(dataEmissao),
            curtidas: pergunta.qtdCurtida,
            comentarios: pergunta.qtdResposta,
            visualizacoes: pergunta.visualizacao,
            nomeCategoria: pergunta.categoria.nome,
            tags: pergunta.tags,
          }
        })
        setListData(lista)
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
              renderItem={(item) => (
                <List.Item>
                  <CardPergunta item={item} />
                </List.Item>
              )}
            />
            <Suspense fallback={<Loading />} />
            <Outlet />
          </Fragment>
        ) : (
          <Empty
            description={
              <Title level={5}>{t('dashboard-perguntas-not-found')}</Title>
            }
          >
            <Button
              icon={<IoIosUndo color="white" />}
              type="primary"
              onClick={() => navigate('/criar-pergunta')}
              label={t('dashboard-criar-pergunta')}
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
    ...state,
    filtro,
  }
}

const mapDispatchToProps = {
  selecionarBusca,
}

export default connect(mapStateToProps, mapDispatchToProps)(Perguntas)
