import React, { Fragment, Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

import {
  Avatar,
  Card,
  Divider,
  Empty,
  List,
  message,
  Steps,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import { Container } from 'react-bootstrap'
import { Col, Row } from 'react-flexbox-grid'

import 'bootstrap/dist/css/bootstrap.min.css'

import { getPerguntasUsuario } from '../../services/pergunta'

import { UserOutlined } from '@ant-design/icons'
import { CommentList } from 'components/detalhes-pergunta/resposta/escrever-resposta'
import Loading from 'components/Loading'
import CardPergunta from 'components/perguntas/cardPergunta'
import 'ordinal-pt-br'
import Image from 'react-bootstrap/Image'
import { AiFillTrophy, AiOutlineUser } from 'react-icons/ai'
import { IoIosAdd, IoIosUndo } from 'react-icons/io'
import { isAuthenticated } from 'services/auth'
import { getRespostasUsuario } from 'services/resposta'
import { getUsuario } from '../../services/usuario'
import {
  calculatePercentageTrophys,
  concatenando,
  error,
  getBeetweenDateWithTextForApiDate,
  getTrophy,
  toMonthName,
} from '../../utils/functions'
import Button from '../common/button'
import EditarPerfil from './editar'
import { getEventosUsuario } from 'services/evento'
import { getCurtidasUsuarioEvento } from 'services/usuario'
import CardEvento from 'components/eventos/card-evento'

const { Step } = Steps
const { TabPane } = Tabs

const Perfil = (props) => {
  const [perfil, setPerfil] = useState({})
  const [perguntasUsuario, setPerguntasUsuario] = useState({})
  const [respostasUsuario, setRespostasUsuario] = useState({})
  const [eventosUsuario, setEventosUsuario] = useState({})
  const { idPerfil } = useParams()
  const [idUsuario, setIdUsuario] = useState(idPerfil)

  const [tab, setTab] = useState('1')
  //
  const { Title, Paragraph } = Typography

  const navigate = useNavigate()
  const { t } = useTranslation()

  // Caso o item esteja marcado como removido
  // só será permitida a visualizacao pelo criador
  const verficaItemRemovido = (items) => {
    const listaFiltrada = []
    items.map((item) => {
      if (
        item.deletado === true &&
        sessionStorage.getItem('@user-email') !== item.usuario.email
      ) {
        return {}
      } else {
        return listaFiltrada.push(item)
      }
    })
    return listaFiltrada
  }

  useEffect(() => {
    setIdUsuario(idPerfil)
    getUsuario(idUsuario)
      .then((request) => {
        console.log(request.data)
        setPerfil(request.data)
      })
      .catch(error)
    getPerguntasUsuario(idUsuario)
      .then((request) => {
        console.log(request.data)
        const visualizacaoPerguntasRemovidas = verficaItemRemovido(request.data)
        const lista = visualizacaoPerguntasRemovidas.map((pergunta, key) => {
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
            deletado: pergunta.deletado,
            nomeCategoria: pergunta.categoria.nome,
            tags: pergunta.tags,
          }
        })
        setPerguntasUsuario(lista)
      })
      .catch(error)

    getRespostasUsuario(idUsuario)
      .then((request) => {
        console.log('dadosResposta', request.data)
        const visualizacaoRespostasRemovidas = verficaItemRemovido(request.data)

        const comments = visualizacaoRespostasRemovidas.map((resposta) => {
          const { dataEmissao } = resposta

          return {
            key: resposta.id,
            content: resposta.texto,
            author: resposta.usuario.nome,
            perguntaId: resposta.pergunta.id,
            avatar: (
              <Avatar
                src={resposta.usuario.imagem || null}
                className="icons"
                icon={<UserOutlined size={30} /> || null}
                size={30}
              />
            ),
            datetime: getBeetweenDateWithTextForApiDate(dataEmissao),
          }
        })
        setRespostasUsuario(comments)
      })
      .catch(error)

    getEventosUsuario(idUsuario)
      .then((request) => {
        console.log('dados:', request.data)

        const lista = request.data.map((evento) => {
          const { dataEmissao } = evento
          const mes = toMonthName(evento?.dataEvento[1])
          const dia = evento?.dataEvento[2]
          return {
            key: evento.id,
            id: evento.id,
            nome: evento.nome,
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
            curtidas: evento.qtdCurtida,
            comentarios: evento.qtdResposta,
            visualizacoes: Math.ceil(Math.random() * 1000),
            nomeCategoria: evento.categoria.nome,
            tags: evento.tags,
          }
        })
        setEventosUsuario(lista)
      })
      .catch(error)
  }, [idPerfil, idUsuario])

  const trophySteps = getTrophy(perfil.reputacao)
  const percentStep = Math.round(calculatePercentageTrophys(perfil.reputacao))

  const geraTooltipStep = (children, thophy) => (
    <Tooltip
      title={
        trophySteps >= thophy - 1
          ? trophySteps === thophy - 1
            ? `${percentStep}% concluído`
            : 'Desbloqueado'
          : 'Bloqueado'
      }
    >
      {children}
    </Tooltip>
  )

  return (
    <Container>
      <Card>
        <Paragraph>
          <Row
            className="justify-content-center"
            style={{ marginBottom: '0.75rem' }}
          >
            <Col
              xs={8}
              sm={4}
              lg={3}
              xl={2}
              className="d-flex justify-content-between align-items-center"
            >
              <Avatar
                src={perfil.imagem || 'https://i.ibb.co/KKdsCZt/user.png'}
                className="icons avatar"
                icon={<Image src="https://i.ibb.co/KKdsCZt/user.png" />}
              />
              {/* <Image
                  width={250}
                  fluid
                  src={perfil.imagem}
                  style={{ fontSize: '100%', borderRadius: '100%' }}
                /> */}
            </Col>
            <Col xs={12} sm={8} md={8}>
              <Col
                xs={12}
                sm={12}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  {perfil.curso && (
                    <Tag color="#84C2C2" style={{ textAlign: 'center' }}>
                      {perfil.curso?.nome}
                    </Tag>
                  )}
                  {perfil.ano && (
                    <Tag color="#84C2C2">
                      {perfil.ano.toOrdinal({ maiuscula: true })}{' '}
                      {perfil.tipoCurso || 'TEC' === 'TEC'
                        ? t('input-year')
                        : t('input-semester')}
                    </Tag>
                  )}
                </div>
                {isAuthenticated() &&
                idPerfil === sessionStorage.getItem('@user-id')
                  ? perfil && (
                      <EditarPerfil perfil={perfil} setPerfil={setPerfil} />
                    )
                  : null}
              </Col>
              <Col xs={12} sm={12}>
                <Row start="xs" middle="xs">
                  <Col xs={12} sm={12}>
                    <Paragraph>
                      <Title level={5} style={{ margin: '0.15rem 0' }}>
                        {perfil.apelido
                          ? `@${perfil.apelido}`
                          : `@
                        ${
                          perfil.email
                            ? perfil.email.substring(
                                0,
                                perfil.email.indexOf('@')
                              )
                            : ''
                        }`}
                      </Title>
                      {/* <small>{perfil.autor}</small> */}
                      {/* <Meta
                        description={` */}
                      {perfil.nome}
                    </Paragraph>
                    {/* `}
                      /> */}
                  </Col>
                </Row>
                <Row start="xs" middle="xs">
                  <Col xs={12} sm={12}>
                    <Title level={5} style={{ marginBottom: '0.15rem' }}>
                      {t('perfil-label-sobre')}
                    </Title>
                    {perfil.bio}
                  </Col>
                </Row>
              </Col>
            </Col>
          </Row>
        </Paragraph>
      </Card>
      <br />
      <br />
      <Title level={4}>{t('perfil-label-progresso')}</Title>
      <Divider />
      <Card>
        <Container>
          <Paragraph
            strong
            type="secondary"
            level={5}
            style={{ marginBottom: '' }}
          >
            {`${t('perfil-label-qtd-pontos')}:`} {perfil.reputacao}{' '}
            {t('perfil-label-pontos')}
          </Paragraph>
          <Steps
            current={trophySteps}
            percent={percentStep}
            className="thophys"
            // progressDot={customDot}
            // progressDot={true}
            // type="navigation"
            // size="large"
          >
            <Step
              title={t('perfil-label-iniciante')}
              description={`20 ${t('perfil-label-pontos')}`}
              disabled={trophySteps < 1}
              icon={geraTooltipStep(
                trophySteps < 1 ? (
                  <AiOutlineUser
                    style={{ color: 'dimGray', fontSize: 30 }}
                    className="step-icon"
                  />
                ) : (
                  <AiOutlineUser
                    style={{ color: 'gray', fontSize: 26 }}
                    className="step-icon"
                  />
                ),
                1
              )}
            />
            <Step
              title={t('perfil-label-bronze')}
              description={`80 ${t('perfil-label-pontos')}`}
              disabled={trophySteps < 2}
              icon={geraTooltipStep(
                trophySteps < 2 ? (
                  <AiFillTrophy
                    style={{
                      color: 'dimGray',
                      fontSize: 30,
                    }}
                    className="step-icon"
                  />
                ) : (
                  <AiFillTrophy
                    style={{
                      color: '#CD7F32',
                      fontSize: 30,
                    }}
                    className="step-icon"
                  />
                ),
                2
              )}
            />
            <Step
              title={t('perfil-label-prata')}
              description={`160 ${t('perfil-label-pontos')}`}
              disabled={trophySteps < 3}
              icon={geraTooltipStep(
                trophySteps < 3 ? (
                  <AiFillTrophy
                    style={{ color: 'dimGray', fontSize: 30 }}
                    className="step-icon"
                  />
                ) : (
                  <AiFillTrophy
                    style={{ color: '#A3A2A0', fontSize: 30 }}
                    className="step-icon"
                  />
                ),
                3
              )}
            />
            <Step
              title={t('perfil-label-ouro')}
              description={`300 ${t('perfil-label-pontos')}`}
              disabled={trophySteps < 4}
              icon={geraTooltipStep(
                trophySteps < 4 ? (
                  <AiFillTrophy
                    style={{ color: 'dimGray', fontSize: 30 }}
                    className="step-icon"
                  />
                ) : (
                  <AiFillTrophy
                    style={{ color: '#FFD700', fontSize: 30 }}
                    className="step-icon"
                  />
                ),
                4
              )}
            />
          </Steps>
        </Container>
      </Card>
      <br />
      <Card>
        <Tabs
          activeKey={tab}
          onChange={setTab}
          tabBarExtraContent={
            tab === '1' && (
              <Button
                type="primary"
                icon={<IoIosAdd size={20} />}
                onClick={() =>
                  navigate(tab === '1' ? '/criar-pergunta' : '/dashboard')
                }
              >
                {t('label-adicionar')}
              </Button>
            )
          }

          // animated={true}
          // forceRender={true}
          // renderTabBar={(props, DefaultTabBar) => (
          //   <>
          //     <DefaultTabBar {...props} />
          //     <Divider />
          //   </>
          // )}
        >
          <TabPane
            tab={`${t('menu-tabs-label-perguntas')} ${
              perguntasUsuario.length || 0
            }`}
            key="1"
          >
            {perguntasUsuario.length > 0 ? (
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
                  dataSource={perguntasUsuario}
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
          </TabPane>
          <TabPane
            tab={`${t('menu-tabs-label-eventos')} ${
              eventosUsuario.length || 0
            }`}
            key="2"
          >
            {eventosUsuario.length > 0 ? (
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  pageSize: 8,
                }}
                dataSource={eventosUsuario}
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 1,
                  md: 2,
                  lg: 2,
                  xl: 3,
                  xxl: 4,
                }}
                renderItem={(item) => (
                  <List.Item>
                    <CardEvento item={item} />
                  </List.Item>
                )}
              />
            ) : (
              <Empty
                description={
                  <Title level={5}>{t('dashboard-eventos-not-found')}</Title>
                }
              />
            )}
          </TabPane>
          <TabPane
            tab={`${t('menu-tabs-label-respostas')} ${
              respostasUsuario.length || 0
            }`}
            key="3"
          >
            {respostasUsuario.length > 0 ? (
              <CommentList
                comments={respostasUsuario}
                indTitle={false}
                id={null}
                callbackReload={undefined}
              />
            ) : (
              <Empty
                description={
                  <Title level={5}>{t('respostas-not-found')}</Title>
                }
              />
            )}
          </TabPane>
        </Tabs>
      </Card>
    </Container>
  )
}

export default Perfil
