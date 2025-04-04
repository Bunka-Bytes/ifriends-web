import React, { useEffect, useState, createElement } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// ------- STYLES -----
import 'components/auth/index.css'
import './index.css'
// ------- COMPONENTS -----
// Antd and Bootstrap
import Container from 'react-bootstrap/Container'
import {
  Card,
  Col,
  Row,
  Avatar,
  Tag,
  Dropdown,
  Menu,
  Tooltip,
  Typography,
  message,
  Image,
  Modal,
  Divider,
  Descriptions,
} from 'antd'

// Created

// ------ ICONS -----
import { AiOutlineUser } from 'react-icons/ai'

// ------ COMMONS ------
import ListTags from '../../common/list-tags'
import ButtonLike from '../../common/button-like'
import DropdownAcoesUsuario from '../../common/dropdown-acoes'

// Services
import { getEvento } from '../../../services/evento'

// ------ FUNCTIONS ------
import {
  arrayToDate,
  concatenando,
  error,
  getBeetweenDateWithTextForApiDate,
  toMonthName,
} from '../../../utils/functions'
import { isAuthenticated } from '../../../services/auth'
import moment from 'moment'

// Destructuring
const { Meta } = Card

const Evento = (props) => {
  const { idEvento } = useParams()
  const navigate = useNavigate()
  const [eventoData, setEventoData] = useState({})
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  // Buscar dados da evento
  useEffect(() => {
    console.log('Busca por id', idEvento)
    getEvento(idEvento)
      .then((request) => {
        console.log('dadosEvento', request.data)
        const dadosEvento = request.data
        const { dataEmissao, dataAlteracao, dataEvento } = dadosEvento
        const mes = toMonthName(dadosEvento?.dataEvento[1])
        const dia = dadosEvento?.dataEvento[2]

        const evento = {
          ...dadosEvento,
          key: dadosEvento.id,
          id: dadosEvento.id,
          nome: dadosEvento.nome,
          descricao: dadosEvento.descricao,
          local: dadosEvento.local,
          mes,
          dia,
          diaComMes: concatenando([dia, mes]),
          presencial: dadosEvento.presencial,
          imagens: dadosEvento.imagens,
          autor: dadosEvento.usuario.apelido,
          idAutor: dadosEvento.usuario.id,
          imgPerfil: dadosEvento.usuario.imagem,
          autorEmail: dadosEvento.usuario.email,
          data: getBeetweenDateWithTextForApiDate(dataEmissao),
          dataEdicao: getBeetweenDateWithTextForApiDate(dataAlteracao),
          curtidas: dadosEvento.qtdFavorito || 0,
          comentarios: dadosEvento.qtdResposta,
          visualizacoes: Math.ceil(Math.random() * 1000),
          nomeCategoria: dadosEvento.categoria.nome,
          tags: dadosEvento.tags,
          dataEvento: arrayToDate(dataEvento),
          link: dadosEvento.link,
        }

        setEventoData(evento)
      })
      .catch(error)
  }, [idEvento])

  let imagemCard
  if (Array.isArray(eventoData.imagens) && eventoData.imagens.length) {
    imagemCard = eventoData.imagens[0].link
  }

  const march = moment()
  console.log(march.format('MMMM'))
  return (
    <>
      <Card className="card-box" style={{ marginBottom: '2rem' }}>
        <Container>
          <Row className="content">
            <Col
              xs={24}
              sm={8}
              className="d-flex align-items-center justify-content-center event-deta-div-images"
            >
              {imagemCard && (
                <Image
                  preview={{
                    visible: false,
                  }}
                  width="100%"
                  src={imagemCard}
                  className="event-deta-div-images"
                  onClick={() => setVisible(true)}
                />
              )}
              <div
                style={{
                  display: 'none',
                }}
              >
                <Image.PreviewGroup
                  preview={{
                    visible,
                    onVisibleChange: (vis) => setVisible(vis),
                  }}
                >
                  {eventoData.imagens &&
                    eventoData.imagens?.map((image, index) => {
                      return <Image key={index} src={image.link} />
                    })}
                </Image.PreviewGroup>
              </div>
            </Col>
            <Col xs={24} sm={16} className="col">
              <Row justify="space-between" align="middle">
                {/* Tags da evento */}
                <Col style={{ marginBottom: '0.75rem' }}>
                  <ListTags tags={eventoData.tags} />
                </Col>
                {/* Ações do usuário */}
                <Col>
                  <DropdownAcoesUsuario
                    targetData={eventoData}
                    targetAction="evento"
                  />
                </Col>
              </Row>
              {/* Informações do autor */}
              <Row
                justify="start"
                align="middle"
                style={{ marginBottom: '0.75rem' }}
              >
                {/* Imagem */}
                <Col>
                  <Avatar
                    src={eventoData.imgPerfil || null}
                    icon={<AiOutlineUser />}
                    size="large"
                    className="icons"
                    style={{ marginRight: '1rem', cursor: 'pointer' }}
                    onClick={() => {
                      navigate(`/perfil/${eventoData.idAutor}`)
                    }}
                  />
                </Col>
                <Col>
                  {/* Autor */}
                  <Col>
                    <Link
                      to={`/perfil/${eventoData.idAutor}`}
                      style={{ cursor: 'pointer' }}
                    >
                      <strong>{eventoData.autor}</strong>
                    </Link>
                  </Col>
                  {/* Data de criação da evento */}
                  <Col>
                    <Meta description={<small>{eventoData.data}</small>} />
                    {eventoData.dataEdicao !== eventoData.data ? (
                      <Tooltip
                        title={`${t('label-edited-last')} ${
                          eventoData.dataEdicao
                        }`}
                      >
                        <small>({t('label-edited')})</small>
                      </Tooltip>
                    ) : (
                      <></>
                    )}
                  </Col>
                </Col>
              </Row>

              {/* Informações da evento */}
              <Row style={{ marginTop: '1rem' }}>
                <Typography.Title level={4}>{eventoData.nome}</Typography.Title>
              </Row>

              {/* Texto da evento */}
              <Row>
                <Typography.Paragraph>
                  {eventoData.descricao}
                </Typography.Paragraph>
              </Row>
              {/* Texto da imagens - Trocar para lista de imagens */}
              {/* {eventoData.imagens && (
                <>
                  <Divider />
                  <Row align="middle" justify="start">
                    {eventoData.imagens.map((image, index) => {
                      return (
                        <Image
                          width={80}
                          height={80}
                          src={image.link}
                          placeholder={
                            <Image
                              preview={false}
                              src="/imgs/fallback/loading-image.gif"
                              width={80}
                              height={80}
                            />
                          }
                          key={index}
                          fallback="/imgs/fallback/not-found-image.jpeg"
                        />
                      )
                    })}
                  </Row>
                  <Divider />
                </>
              )} */}
              {/* Curtir */}
              <Row
                justify="space-between"
                align="middle"
                style={{ marginTop: '1rem' }}
              >
                <Col xs={4} sm={4} md={2} xl={1}>
                  <ButtonLike targetData={eventoData} targetLike="evento" />
                </Col>
                {/* Reportar */}
                {/* <Col>
            <Button
              type="primary"
              icon={
                <FiAlertCircle
                  color="white"
                  style={{ marginRight: '0.25rem' }}
                />
              }
              onClick={(e) => e.preventDefault()}
              label={t('label-report')}
              danger
            />
          </Col> */}
                {/* Inserir coluna para evento exculída */}
              </Row>
            </Col>
          </Row>
          <br />
          <br />
          <Typography.Title level={4}>
            {t('evento-detalhe-title')}
          </Typography.Title>
          <Divider />
          <Descriptions
            bordered
            column={{
              // xxl: 4,
              // xl: 3,
              // lg: 3,
              // md: 3,
              sm: 1,
              xs: 1,
            }}
            labelStyle={{ width: '25%' }}
          >
            <Descriptions.Item label={t('evento-detalhe-data')}>
              {eventoData && moment(eventoData.dataEvento).format('LL')}
            </Descriptions.Item>
            <Descriptions.Item label={t('evento-detalhe-horario')}>
              {eventoData && moment(eventoData.dataEvento).format('LTS')}
            </Descriptions.Item>
            <Descriptions.Item label={t('evento-detalhe-local')}>
              {eventoData.local}
            </Descriptions.Item>
            <Descriptions.Item label={t('evento-detalhe-presencial')}>
              {eventoData.presencial
                ? t('evento-detalhe-presencial-answer-true')
                : t('evento-detalhe-presencial-answer-false')}
            </Descriptions.Item>
            <Descriptions.Item label={t('evento-detalhe-link')}>
              {eventoData.link}
            </Descriptions.Item>
          </Descriptions>
        </Container>
      </Card>
    </>
  )
}

export default Evento
