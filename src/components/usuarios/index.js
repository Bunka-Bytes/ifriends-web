import React, { useEffect, useState, Fragment, Suspense } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
// ------- STYLES -----
import 'bootstrap/dist/css/bootstrap.min.css'

// ------- COMPONENTS -----

// Antd and Bootstrap
import { Grid } from 'react-flexbox-grid'
import { Typography, List, Empty, BackTop, message, Row, Card, Col } from 'antd'
import Button from '../common/button'
import Container from 'react-bootstrap/Container'

// ------ ICONS -----
import { IoIosUndo } from 'react-icons/io'

// Services
import { getUsuarios } from '../../services/usuario'
import { connect } from 'react-redux'
import { selecionarBusca } from '../../redux/modules/filtro'

// ------ FUNCTIONS ------
import { error, getBeetweenDateWithTextForApiDate } from '../../utils/functions'
import { useTranslation } from 'react-i18next'
import Loading from 'components/Loading'
import CardUsuario from './card-usuario'

const Usuarios = (props) => {
  const [listData, setListData] = useState([])
  const navigate = useNavigate()
  const { Title } = Typography
  const { filtro, selecionarBusca } = props
  const { t } = useTranslation()

  useEffect(() => {
    return () => selecionarBusca({})
  }, [selecionarBusca])

  useEffect(() => {
    getUsuarios(filtro)
      .then((request) => {
        console.log('dados:', request.data)

        const lista = request.data.map((usuario) => {
          const { dataEmissao, dataAlteracao } = usuario

          return {
            key: usuario.id,
            id: usuario.id,
            nome: usuario.nome,
            apelido: usuario.apelido,
            idAutor: usuario.id,
            imgPerfil: usuario.imagem,
            curso: usuario.curso.nome,
            cursoSigla: usuario.curso.sigla,
            tipoCurso: usuario.curso.tipoCurso,
            ano: usuario.ano,
            criacao: getBeetweenDateWithTextForApiDate(dataEmissao),
            edicao: getBeetweenDateWithTextForApiDate(dataAlteracao),
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
            <BackTop />
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
                  <CardUsuario item={item} />
                </List.Item>
              )}
            />
            <Suspense fallback={<Loading />} />
            <Outlet />
          </Fragment>
        ) : (
          <Empty
            description={
              <Title level={5}>{t('dashboard-usuarios-not-found')}</Title>
            }
          >
            <Button
              icon={<IoIosUndo color="white" />}
              type="primary"
              onClick={() => navigate('/dashboard')}
              label={t('working-comming-soon-home')}
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

export default connect(mapStateToProps, mapDispatchToProps)(Usuarios)
