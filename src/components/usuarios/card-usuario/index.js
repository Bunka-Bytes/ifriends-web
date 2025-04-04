import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// Antd and Bootstrap
import {
  Avatar,
  Card,
  Skeleton,
  Typography,
  Row,
  Col,
  Divider,
  Tag,
} from 'antd'

// ------ ICONS -----
import { AiOutlineUser } from 'react-icons/ai'

// ------ COMMONS ------

// Destructuring
const { Meta } = Card
const { Paragraph, Title, Text } = Typography

const CardUsuario = (props) => {
  const navigate = useNavigate()
  const { item, loading = false } = props
  const { t } = useTranslation()

  return (
    <Skeleton loading={loading} avatar active>
      <Paragraph>
        <Card
          className="card-box"
          onClick={() => navigate(`/perfil/${item.id}`)}
          hoverable
          style={{ padding: '0 1.5rem' }}
          cover={
            <>
              <Row
                justify="center"
                align="middle"
                className="text-center"
                style={{ marginTop: '1.5rem' }}
              >
                <Col>
                  <Avatar
                    src={item.imgPerfil || null}
                    icon={<AiOutlineUser />}
                    size={{
                      xs: 48,
                      sm: 64,
                      md: 76,
                      lg: 76,
                      xl: 80,
                      xxl: 100,
                    }}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      navigate(`/perfil/${item.id}`)
                    }}
                  />
                </Col>
              </Row>
              <Divider style={{ margin: '1rem 0' }} />
              <Row justify="center" align="middle" className="text-center">
                <Col>
                  <Tag color="#84C2C2" style={{ textAlign: 'center' }}>
                    {item.cursoSigla}
                  </Tag>
                </Col>
                {item.ano !== 0 && (
                  <Col>
                    <Tag color="#84C2C2">
                      {item.ano}{' '}
                      {item.tipoCurso || 'TEC' === 'TEC'
                        ? t('input-year')
                        : t('input-semester')}
                    </Tag>
                  </Col>
                )}
              </Row>
            </>
          }
        >
          <Paragraph strong>
            <Fragment>
              <Row align="middle" justify="center">
                <Title level={5}>
                  {'\u0040'}
                  {item.apelido}
                </Title>
              </Row>
              <Row align="middle" justify="center">
                <Text disabled>{item.nome}</Text>
              </Row>
            </Fragment>
          </Paragraph>
        </Card>
      </Paragraph>
    </Skeleton>
  )
}

export default CardUsuario
