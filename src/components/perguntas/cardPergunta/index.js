import React, { Fragment, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles.css'

// Antd and Bootstrap
import { Col, Row } from 'react-flexbox-grid'
import {
  Tooltip,
  Skeleton,
  Card,
  Avatar,
  Typography,
  Divider,
  message,
} from 'antd'
import Button from '../../common/button'
import Alert from 'react-bootstrap/Alert'

// ------ ICONS -----
import { FaRegComment, FaRegEye } from 'react-icons/fa'
import { IoIosUndo } from 'react-icons/io'
import { UserOutlined, StopOutlined, LikeOutlined } from '@ant-design/icons'
import { getCurtidasUsuarioPergunta } from '../../../services/usuario'
import { isAuthenticated } from '../../../services/auth'

// ------ COMMONS ------
import ListTags from '../../common/list-tags'
import { t } from 'i18next'
import { error } from 'utils/functions'

// Destructuring
const { Meta } = Card
const { Paragraph } = Typography

const CardPergunta = (props) => {
  const navigate = useNavigate()
  const { item, loading = false } = props
  const [action, setAction] = useState('unliked')
  const [curtidasUsuario, setCurtidasUsuario] = useState([])

  const getCurtidasUsuario = useCallback(async () => {
    if (isAuthenticated()) {
      await getCurtidasUsuarioPergunta()
        .then((response) => {
          const curtidas = response.data
          setCurtidasUsuario(curtidas)
          setAction('liked')
        })
        .catch(error)
    }
  }, [])

  useEffect(() => {
    getCurtidasUsuario()
  }, [])

  return (
    <Skeleton loading={loading} avatar active>
      <Paragraph>
        <Card
          className="card-box"
          onClick={() => navigate(`/pergunta/${item.key}`)}
          hoverable
        >
          <Paragraph strong>
            <Fragment>
              <Row style={{ marginBottom: '0.75rem' }}>
                <Col xs={12} sm={12}>
                  <ListTags tags={item.tags} />
                </Col>
              </Row>
              <Row middle="xs" evenly="xs" style={{ marginBottom: '0.75rem' }}>
                <Col xs={2} sm={2} md={1}>
                  <Avatar
                    src={item.imgPerfil || null}
                    className="icons"
                    icon={<UserOutlined size={30} />}
                    size="large"
                  />
                </Col>
                <Col xs={8} sm={8} md={10}>
                  <Col xs={12} sm={12}>
                    {item.titulo}
                    <Row start="xs" middle="xs">
                      <Col xs={12} sm={12}>
                        <small>{item.autor}</small>
                        <Meta description={<small>{item.data}</small>} />
                      </Col>
                    </Row>
                  </Col>
                </Col>
              </Row>
            </Fragment>
          </Paragraph>
          <Divider />
          <Paragraph
            ellipsis={{
              rows: 3,
              expandable: true,
              symbol: `${t('label-elipsis')}`,
            }}
          >
            {item.descricao}
          </Paragraph>
          <Paragraph type="secondary">
            <Row middle="xs" className="gy-3">
              <Col xs={12} sm={6} md={6} lg={6}>
                <Row middle="xs" between="md">
                  <Col xs={4} sm={4} md={4} lg={4}>
                    <Tooltip title={t('label-likes')}>
                      <span>
                        <LikeOutlined /> {' ' + item.curtidas}
                      </span>
                    </Tooltip>
                  </Col>
                  <Col xs={4} sm={4} md={4} lg={4}>
                    <Tooltip title={t('label-answers')}>
                      <FaRegComment /> {item.comentarios}
                    </Tooltip>
                  </Col>
                  <Col xs={4} sm={4} md={4} lg={4}>
                    <Tooltip title={t('label-views')}>
                      <FaRegEye /> {item.visualizacoes}{' '}
                    </Tooltip>
                  </Col>
                </Row>
              </Col>

              <Col xs={12} sm={6} md={6} lg={6}>
                <Row middle="xs" center="xs">
                  <Col xs={12} className="d-flex justify-content-center">
                    <Button
                      type="primary"
                      icon={
                        <IoIosUndo
                          color="white"
                          style={{ marginRight: '0.25rem' }}
                        />
                      }
                      className="button-right"
                      onClick={() => {
                        navigate(`/pergunta/${item.id}`)
                      }}
                      style={{
                        background: 'var(--green)',
                        borderColor: 'var(--green-medium)',
                      }}
                      label={t('btn-responder')}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            {item.deletado === true ? (
              <Row style={{ marginTop: '1rem' }}>
                <Typography.Text type="danger">
                  <>
                    <StopOutlined style={{ marginRight: '0.5rem' }} />
                    {t('label-question-removed')}
                  </>
                </Typography.Text>
              </Row>
            ) : (
              <></>
            )}
          </Paragraph>
        </Card>
      </Paragraph>
    </Skeleton>
  )
}

export default CardPergunta
