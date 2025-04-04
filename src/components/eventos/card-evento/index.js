import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Antd and Bootstrap
import {
  Avatar,
  Card,
  Divider,
  message,
  Skeleton,
  Tooltip,
  Typography,
} from 'antd'
import { Col, Row } from 'react-flexbox-grid'
import Button from '../../common/button'

// ------ ICONS -----
import { LikeFilled, LikeOutlined, UserOutlined } from '@ant-design/icons'
import { FaRegComment, FaRegEye } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'
import { IoIosUndo } from 'react-icons/io'
import { isAuthenticated } from '../../../services/auth'
import { getCurtidasUsuario } from '../../../services/usuario'

// ------ COMMONS ------
import { t } from 'i18next'
import ListTags from '../../common/list-tags'
import { Image } from 'react-bootstrap'

import './index.css'
import { hex2rgba, stringToColour } from 'utils/functions'
import { error } from '../../../utils/functions'

// Destructuring
const { Meta } = Card
const { Paragraph, Title } = Typography

const CardEvento = (props) => {
  const navigate = useNavigate()
  const { item, loading = false } = props

  const hexCardDateColor = stringToColour(item.diaComMes)
  const rgbaCardDivColor = hex2rgba(hexCardDateColor, 0.65)
  let imagemCard
  if (Array.isArray(item.imagens) && item.imagens.length) {
    imagemCard = item.imagens[0].link
  }

  return (
    <Skeleton loading={loading} avatar active>
      <Paragraph>
        <Card
          className="card-box"
          onClick={() => navigate(`/evento/${item.key}`)}
          hoverable
          cover={
            <div
              className="event-card-div"
              style={{
                backgroundColor: rgbaCardDivColor,
              }}
            >
              <img src={imagemCard} className="event-card-div-img" />
              <div
                className="event-card-div-date"
                style={{ backgroundColor: hexCardDateColor }}
              >
                <Title level={2} style={{ color: '#fff' }}>
                  {item?.dia.toString().padStart(2, '0')}
                  <Title level={4} style={{ color: '#fff' }}>
                    {item.mes}
                  </Title>
                </Title>
              </div>
            </div>

            // <div style={{ overflow: 'hidden', height: '10rem' }}>
            //   <img
            //     src={item.imgPerfil}
            //     style={{ height: '100%', minWidth: '100%' }}
            //   />
            // </div>
          }
        >
          <Paragraph strong>
            <Fragment>
              <Row style={{ marginBottom: '0.75rem' }}>
                <Col xs={12} sm={12}>
                  <Title level={5} className="text-center">
                    {item.nome}
                  </Title>
                </Col>
              </Row>
              {/* <Row style={{ marginBottom: '0.75rem' }}>
                <Col xs={12} sm={12}>
                  <ListTags tags={item.tags} />
                </Col>
              </Row> */}
              <Row
                middle="xs"
                style={{ marginBottom: '0.75rem' }}
                className="gy-3"
              >
                <Col xs={2} sm={3} md={2}>
                  <Avatar
                    src={item.imgPerfil || null}
                    className="icons"
                    icon={<UserOutlined size={30} />}
                    size="large"
                  />
                </Col>
                <Col xs={5} sm={9} md={5}>
                  {item.autor}
                  <Meta description={item.data} />
                </Col>
                <Col xs={5} sm={12} md={5}>
                  <Row middle="xs" between="md">
                    <Col xs={6} sm={6}>
                      <Tooltip title={t('label-likes')}>
                        <AiOutlineHeart /> {item.curtidas || 0}
                      </Tooltip>
                    </Col>
                    {/* <Col xs={6} sm={6}>
                      <Tooltip title={t('label-views')}>
                        <FaRegEye /> {item.visualizacoes}
                      </Tooltip>
                    </Col> */}
                  </Row>
                </Col>
              </Row>
            </Fragment>
          </Paragraph>
        </Card>
      </Paragraph>
    </Skeleton>
  )
}

export default CardEvento
