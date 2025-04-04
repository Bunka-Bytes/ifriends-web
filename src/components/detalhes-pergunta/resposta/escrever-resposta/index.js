import React, { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Comment,
  Avatar,
  Form,
  Button,
  List,
  Input,
  Row,
  Col,
  Tooltip,
  Typography,
  message,
  Card,
  Menu,
  Space,
  Image,
  Divider,
} from 'antd'
import {
  AiOutlineCheckCircle,
  AiFillCheckCircle,
  AiOutlineEdit,
} from 'react-icons/ai'
import { IoIosUndo, IoIosRemoveCircleOutline } from 'react-icons/io'
import { UserOutlined } from '@ant-design/icons'
import { FiTrash2 } from 'react-icons/fi'
import './index.css'

// ------ SERVICES -----
import {
  getRespostas,
  postResposta,
  patchAceitarResposta,
} from '../../../../services/resposta'
import { isAuthenticated } from '../../../../services/auth'
import ButtonLike from '../../../common/button-like'
import DropdownAcoesUsuario from '../../../common/dropdown-acoes'

// ------ FUNCTIONS ------
import {
  error,
  getBeetweenDateWithTextForApiDate,
} from '../../../../utils/functions'

import CardCadastro from '../../../common/card-cadastro'
import { useNavigate } from 'react-router-dom'
import UploadImage from 'components/common/upload-image'
const { TextArea } = Input

const CommentList = ({ comments, indTitle = true, id, callbackReload }) => {
  const [aceita, setAceita] = useState(false)
  const { t } = useTranslation()
  const menu = (id) => {
    return (
      <Menu
        items={[
          {
            key: '1',
            label: t('label-remove-view'),
            icon: <FiTrash2 />,
          },

          {
            key: '2',
            label: t('label-edit'),
            icon: <AiOutlineEdit />,
          },
        ]}
      />
    )
  }

  // verificar se a resposta foi aceita

  const ButtonAceitar = (props) => {
    const { data } = props
    const aceitarResposta = () => {
      // arrumar bug de apertar varias vezes
      callbackReload()
      patchAceitarResposta(data.id).then().catch(error)
      setAceita(true)
    }
    if (
      isAuthenticated() &&
      sessionStorage.getItem('@user-email') === data.authorPerguntaEmail &&
      data.autorEmail !== sessionStorage.getItem('@user-email')
    ) {
      return (
        <Col>
          {data.aceita === false ? (
            <Tooltip title={`${t('label-answer-accepted')}`}>
              <span
                id={data.key}
                className="aceitar-resposta"
                onClick={aceitarResposta}
              >
                {<AiOutlineCheckCircle onClick={aceitarResposta} size={25} />}
              </span>
            </Tooltip>
          ) : (
            <Tooltip title={`${t('label-answer-unaccepted')}`}>
              <span
                id={data.key}
                className="desaceitar-resposta"
                onClick={aceitarResposta}
              >
                {
                  <IoIosRemoveCircleOutline
                    onClick={aceitarResposta}
                    size={25}
                  />
                }
              </span>
            </Tooltip>
          )}
        </Col>
      )
    }
    return <></>
  }

  return (
    <List
      dataSource={comments}
      header={
        indTitle && (
          <Typography.Title level={5} style={{ marginLeft: '0.5rem' }}>
            {comments.length + ' '}
            {comments.length > 1 ? t('label-answers') : t('label-answer')}
          </Typography.Title>
        )
      }
      itemLayout="horizontal"
      renderItem={(props) => {
        setAceita(props.aceita)
        return (
          <Card style={{ marginBottom: '0.75rem' }} key={props.key}>
            {id !== null && (
              <Row
                justify={props.aceita === false ? 'end' : 'space-between'}
                align="middle"
              >
                {(id !== null && props.aceita) === true && (
                  <Col>
                    <Button className="melhor-resposta">
                      <AiFillCheckCircle size={20} className="icon" />
                      <span>{t('label-best-answer')}</span>
                    </Button>
                  </Col>
                )}
                <Col>
                  <DropdownAcoesUsuario
                    targetData={props}
                    targetAction="resposta"
                  />
                </Col>
              </Row>
            )}

            <Comment {...props} key={props.key} />
            {props.imagens && (
              <Row
                align="middle"
                justify="start"
                style={{ marginBottom: '0.75rem' }}
              >
                <Divider />
                <Space size={[8, 16]} wrap>
                  {props.imagens.map((image, index) => {
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
            )}
            <Row align="middle" justify="space-between">
              <Col>
                {id !== null && (
                  <Tooltip key="comment-basic-like" title="Like">
                    <ButtonLike targetData={props} targetLike="resposta" />
                  </Tooltip>
                )}
              </Col>
              <ButtonAceitar data={props} />
            </Row>
          </Card>
        )
      }}
    />
  )
}

const Editor = ({ onChange, onSubmit, submitting, value, setImagens }) => {
  const { t } = useTranslation()

  return (
    <>
      <CardCadastro
        titulo={t('label-your-answer')}
        descricao={t('label-your-answer-small')}
        children={
          <>
            <Form.Item>
              <TextArea
                placeholder={t('criar-pergunta-placeholder-write')}
                bordered={false}
                allowClear={true}
                showCount
                maxLength={25000}
                name={'texto'}
                autoSize={{ minRows: 5, maxRows: 25 }}
                onChange={onChange}
                value={value}
              />
              <Col>
                <UploadImage
                  alteraCampoTipo={(value, name) => setImagens(value)}
                  maxFiles={5}
                  renderWithDragger={false}
                  listType="picture"
                />
              </Col>
            </Form.Item>
            <Form.Item style={{ marginTop: '2rem' }}>
              <Row justify="end">
                <Col>
                  <Button
                    htmlType="submit"
                    loading={submitting}
                    onClick={onSubmit}
                    icon={
                      <IoIosUndo
                        color="white"
                        style={{ marginRight: '0.25rem' }}
                      />
                    }
                    type="primary"
                    style={{
                      background: 'var(--green)',
                      borderColor: 'var(--green-medium)',
                    }}
                  >
                    {t('btn-responder')}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </>
        }
      />
    </>
  )
}

const Comentario = (props) => {
  const [comments, setComments] = useState([])
  const [respondida, setRespondida] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')
  const [imagens, setImagens] = useState([])
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { idPergunta } = props

  const getInfosRespostas = useCallback(async () => {
    getRespostas(idPergunta)
      .then((request) => {
        console.log('dadosResposta', request.data)
        const respostasNaoDeletadas = request.data.filter(
          (resposta) => resposta.deletado !== true
        )

        const comments = respostasNaoDeletadas.map((resposta) => {
          const { dataEmissao, dataAlteracao } = resposta

          setRespondida(resposta.pergunta.respondida)
          return {
            id: resposta.id,
            idPergunta: resposta.pergunta.id,
            content: resposta.texto,
            author: resposta.usuario.apelido,
            authorPerguntaEmail: resposta.pergunta.usuario.email,
            name: resposta.usuario.nome,
            autorEmail: resposta.usuario.email,
            deletada: resposta.deletado,
            curtidas: resposta.qtdCurtida,
            imagens: resposta.imagens,
            aceita: resposta.aceita,
            avatar: (
              <Avatar
                src={resposta.usuario.imagem || null}
                onClick={() => navigate(`/perfil/${resposta.usuario.id}`)}
                className="icons"
                icon={<UserOutlined size={30} /> || null}
                size={30}
              />
            ),
            datetime: getBeetweenDateWithTextForApiDate(dataEmissao),
            dateedit: getBeetweenDateWithTextForApiDate(dataAlteracao),
          }
        })
        setComments(comments.sort((a, b) => b.curtidas - a.curtidas))
      })
      .catch(error)
  }, [idPergunta])

  useEffect(() => {
    getInfosRespostas()
    comments.sort((a, b) => b.curtidas - a.curtidas)
  }, [getInfosRespostas, comments])

  const handleSubmit = () => {
    if (isAuthenticated() && value && !respondida) {
      setSubmitting(true)
      setTimeout(() => {
        setSubmitting(false)
        setValue('')
        const resposta = {
          texto: value,
          pergunta: idPergunta,
          imagens,
        }
        postResposta(resposta)
          .then((request) => {
            message.success(t('label-answers-thks'))
            getInfosRespostas()
            console.log('dadosResposta', request.data)
            const { dataEmissao, dataAlteracao } = request.data
            setRespondida(request.data.pergunta.respondida)

            setComments([
              ...comments,
              {
                id: resposta.id,
                idPergunta: resposta.pergunta.id,
                author: resposta.usuario.apelido,
                authorPerguntaEmail: resposta.pergunta.usuario.email,
                name: resposta.usuario.nome,
                autorEmail: resposta.usuario.email,
                deletada: resposta.deletado,
                curtidas: resposta.qtdCurtida,
                imagens: resposta.imagens,
                aceita: resposta.aceita,
                avatar: (
                  <Avatar
                    src={request.data.usuario.imagem || null}
                    className="icons"
                    onClick={() => navigate(`/perfil/${resposta.usuario.id}`)}
                    icon={<UserOutlined size={30} /> || null}
                    size={30}
                  />
                ),
                content: <span>{request.data.texto}</span>,
                datetime: getBeetweenDateWithTextForApiDate(dataEmissao),
                dateedit: getBeetweenDateWithTextForApiDate(dataAlteracao),
              },
            ])
          })
          .catch(error)
      }, 1000)
    }
    if (!value) return
    if (!isAuthenticated()) {
      message.info(t('label-authenticate'))
    }
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <>
      {comments.length > 0 && (
        <CommentList
          comments={comments}
          id={idPergunta}
          callbackReload={getInfosRespostas}
        />
      )}
      {respondida !== true && (
        <Comment
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
              setImagens={setImagens}
            />
          }
        />
      )}
    </>
  )
}

export { CommentList }
export default Comentario
