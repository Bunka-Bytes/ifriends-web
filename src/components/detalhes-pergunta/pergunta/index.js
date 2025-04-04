import React, { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// ------- STYLES -----
import './index.css'
// ------- COMPONENTS -----
// Antd and Bootstrap
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import {
  Card,
  Col,
  Row,
  Avatar,
  Tooltip,
  Typography,
  Image,
  Divider,
  Space,
} from 'antd'

// Created

// ------ ICONS -----
import { AiOutlineUser, AiOutlineUnlock, AiOutlineLock } from 'react-icons/ai'
import { StopOutlined } from '@ant-design/icons'

// ------ COMMONS ------
import ListTags from '../../common/list-tags'
import ButtonLike from '../../common/button-like'
import DropdownAcoesUsuario from '../../common/dropdown-acoes'

// Services
import {
  getPergunta,
  postPerguntaVisualizacao,
  patchMarcarRespondida,
} from '../../../services/pergunta'

// ------ FUNCTIONS ------
import {
  error,
  getBeetweenDateWithTextForApiDate,
} from '../../../utils/functions'
import { isAuthenticated } from '../../../services/auth'

// Destructuring
const { Meta } = Card

const Pergunta = (props) => {
  const { idPergunta } = props
  const navigate = useNavigate()
  const [perguntaData, setPerguntaData] = useState({})
  const { t } = useTranslation()
  const verficaItemRemovido = (item) => {
    if (
      item.deletado === true &&
      sessionStorage.getItem('@user-email') !== item.usuario.email
    ) {
      navigate('/dashboard/')
      return []
    } else {
      return item
    }
  }

  const incrementaContadorVisualizacao = useCallback(async () => {
    if (isAuthenticated()) {
      try {
        const request = await postPerguntaVisualizacao(idPergunta)
        if (request.data === false) return
      } catch (err) {
        error()
      }
    }
  }, [idPergunta])

  const getInfosPergunta = useCallback(async () => {
    try {
      const request = await getPergunta(idPergunta)
      incrementaContadorVisualizacao()

      const dadosPergunta = verficaItemRemovido(request.data)
      const { dataEmissao, dataAlteracao } = dadosPergunta

      const pergunta = {
        key: dadosPergunta.id,
        id: dadosPergunta.id,
        titulo: dadosPergunta.titulo,
        descricao: dadosPergunta.texto,
        autor: dadosPergunta.usuario.apelido,
        autorId: dadosPergunta.usuario.id,
        autorEmail: dadosPergunta.usuario.email,
        imgPerfil: dadosPergunta.usuario.imagem,
        imagem:
          dadosPergunta.imagens.length !== 0 ? dadosPergunta.imagens : null,
        data: getBeetweenDateWithTextForApiDate(dataEmissao),
        dataEdicao: getBeetweenDateWithTextForApiDate(dataAlteracao),
        curtidas: dadosPergunta.qtdCurtida,
        comentarios: dadosPergunta.qtdResposta,
        visualizacoes: dadosPergunta.visualizacao,
        deletado: dadosPergunta.deletado,
        respondida: dadosPergunta.respondida,
        nomeCategoria: dadosPergunta.categoria.nome,
        tags: dadosPergunta.tags,
      }

      setPerguntaData(pergunta)
    } catch (err) {
      error()
    }
  }, [idPergunta, verficaItemRemovido, incrementaContadorVisualizacao])

  // Buscar dados da pergunta
  useEffect(() => {
    getInfosPergunta()
  }, [])

  const ButtonRespondida = (props) => {
    const { data } = props
    const marcarRespondida = () => {
      patchMarcarRespondida(data.id).then().catch(error)
      getInfosPergunta()
    }
    if (
      isAuthenticated() &&
      sessionStorage.getItem('@user-email') === data.autorEmail
    ) {
      return (
        <Col>
          {data.respondida === false ? (
            <Tooltip title={`${t('label-answered')}`}>
              <span
                id={data.key}
                className="aceitar-resposta"
                onClick={marcarRespondida}
              >
                {<AiOutlineUnlock onClick={marcarRespondida} size={25} />}
              </span>
            </Tooltip>
          ) : (
            <Tooltip title={`${t('label-not-answered')}`}>
              <span
                id={data.key}
                className="desaceitar-resposta"
                onClick={marcarRespondida}
              >
                {<AiOutlineLock onClick={marcarRespondida} size={25} />}
              </span>
            </Tooltip>
          )}
        </Col>
      )
    }
    return <></>
  }

  return (
    <>
      <Card className="card-box" style={{ marginBottom: '2rem' }}>
        <Container>
          <Row justify="space-between" align="middle">
            {/* Tags da pergunta */}
            <Col style={{ marginBottom: '0.75rem' }}>
              <ListTags tags={perguntaData.tags} />
            </Col>
            {/* Ações do usuário */}
            <Col>
              <DropdownAcoesUsuario
                targetData={perguntaData}
                targetAction="pergunta"
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
                src={perguntaData.imgPerfil || null}
                icon={<AiOutlineUser />}
                size="large"
                className="icons"
                style={{ marginRight: '1rem', cursor: 'pointer' }}
                onClick={() => {
                  navigate(`/perfil/${perguntaData.autorId}`)
                }}
              />
            </Col>
            <Col>
              {/* Autor */}
              <Col>
                <Link
                  to={`/perfil/${perguntaData.autorId}`}
                  style={{ cursor: 'pointer' }}
                >
                  <strong>{perguntaData.autor}</strong>
                </Link>
              </Col>
              {/* Data de criação da pergunta */}
              <Col>
                <Meta description={<small>{perguntaData.data}</small>} />
                {perguntaData.dataEdicao !== perguntaData.data ? (
                  <Tooltip
                    title={`${t('label-edited-last')} ${
                      perguntaData.dataEdicao
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

          {/* Informações da pergunta */}
          <Row style={{ marginTop: '1rem' }}>
            <Typography.Title level={4}>{perguntaData.titulo}</Typography.Title>
          </Row>

          {/* Texto da pergunta */}
          <Row>
            <Typography.Paragraph>
              {perguntaData.descricao}
            </Typography.Paragraph>
          </Row>
          {/* Texto da imagens - Trocar para lista de imagens */}
          {perguntaData.imagem ? (
            <>
              <Divider />
              <Row align="middle" justify="start">
                <Space size={[8, 16]} wrap>
                  {perguntaData.imagem.map((image, index) => {
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
                </Space>
              </Row>
              <Divider />
            </>
          ) : (
            <> </>
          )}
          {/* Curtir */}
          <Row
            justify="space-between"
            align="middle"
            style={{ marginTop: '1rem' }}
          >
            <Col xs={4} sm={4} md={2} xl={1}>
              <ButtonLike targetData={perguntaData} targetLike="pergunta" />
            </Col>
            <Col>
              <ButtonRespondida data={perguntaData} />
            </Col>
            {/* Inserir coluna para pergunta exculída */}
            {perguntaData.deletado === true && (
              <Col>
                <Alert variant="danger">
                  <StopOutlined style={{ marginRight: '0.5rem' }} />
                  {t('label-question-removed')}
                </Alert>
              </Col>
            )}
          </Row>
        </Container>
      </Card>
    </>
  )
}

export default Pergunta
