import React, { useEffect, useState, createElement, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

// ------- STYLES -----
// ------- COMPONENTS -----

// Antd and Bootstrap
import {
  message,
} from 'antd'
import { LikeFilled, LikeOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons'

// Created
import Button from '../../common/button'

// ------ ICONS -----

// Services
import {
  getCurtidasUsuarioPergunta,
  getCurtidasUsuarioEvento,
  getCurtidasUsuarioResposta,
} from '../../../services/usuario'
import { postCurtidaPergunta } from '../../../services/curtidas-pergunta'
import { postCurtidaResposta } from '../../../services/curtidas-resposta'
import { postCurtidaEvento } from '../../../services/curtidas-evento'

// ------ FUNCTIONS ------
import { error } from 'utils/functions'

import { isAuthenticated } from 'services/auth'

const ButtonLike = (props) => {
  const { t } = useTranslation()

  const [action, setAction] = useState('unliked')
  const [curtidasUsuario, setCurtidasUsuario] = useState([])
  const { targetLike, targetData } = props
  const [likes, setLikes] = useState(targetData.curtidas)

  const getCurtidas = useCallback(async () => {
    if (isAuthenticated()) {
      switch (targetLike) {
        case 'pergunta':
          try {
            const response = await getCurtidasUsuarioPergunta()
            setCurtidasUsuario(response.data)
          } catch (err) {
            error()
          }
          break
        case 'resposta':
          try {
            const response = await getCurtidasUsuarioResposta()
            setCurtidasUsuario(response.data)
          } catch (err) {
            error()
          }
          break
        case 'evento':
          try {
            const response = await getCurtidasUsuarioEvento()
            setCurtidasUsuario(response.data)
          } catch (err) {
            error()
          }
          break
        default:
          break
      }
    }
  }, [targetLike])

  // Buscar curtidas do usuário logado
  useEffect(() => {
    getCurtidas()
  }, [getCurtidas])

  // Checar curtidas do usuario
  const verifyLike = (tipo) => {
    let verify = []
    switch (tipo) {
      case 'pergunta':
        verify = curtidasUsuario.filter(
          (curtida) => curtida.pergunta.id === targetData.id
        )
        break
      case 'resposta':
        verify = curtidasUsuario.filter(
          (curtida) => curtida.resposta.id === targetData.id
        )
        break
      case 'evento':
        verify = curtidasUsuario.filter(
          (curtida) => curtida.evento.id === targetData.id
        )
        break
      default:
        break
    }
    if (verify.length !== 0) return true
    return false
  }
  // Curtir
  const like = (e) => {
    e.preventDefault()
    if (isAuthenticated()) {
      switch (targetLike) {
        case 'pergunta':
          postCurtidaPergunta(targetData.id)
            .then((response) => {
              setCurtidasUsuario([])
              if (response.data === true) {
                setAction('liked')
                setLikes(targetData.curtidas + 1)
              } else {
                setAction('unliked')
                setLikes(targetData.curtidas - 1)
              }
            })
            .catch(error)
          break
        case 'resposta':
          postCurtidaResposta(targetData.id)
            .then((response) => {
              setCurtidasUsuario([])
              if (response.data === true) {
                setAction('liked')
                setLikes(likes + 1)
              } else {
                setAction('unliked')
                setLikes(likes - 1)
              }
            })
            .catch(error)
          break
        case 'evento':
          postCurtidaEvento(targetData.id)
            .then((response) => {
              setCurtidasUsuario([])
              if (response.data === true) {
                setAction('liked')
                setLikes(targetData.curtidas)
              } else {
                setAction('unliked')
                setLikes(targetData.curtidas)
              }
            })
            .catch(error)
          break
        default:
          break
      }
    } else {
      message.info(t('label-authenticate'))
    }
  }

  const LikeButtonFormat = () => {
    if (targetLike === 'pergunta') {
      return (
        <Button
          type="primary"
          icon={createElement(
            verifyLike(targetLike) === true || action === 'liked'
              ? LikeFilled
              : LikeOutlined
          )}
          onClick={like}
          label={t('label-like')}
          ghost
        />
      )
    } else if (targetLike === 'evento') {
      return (
        <Button
          type="primary"
          icon={createElement(
            verifyLike(targetLike) === true || action === 'liked'
              ? HeartFilled
              : HeartOutlined
          )}
          onClick={like}
          label={t('label-favoritar')}
          ghost
        />
      )
    } else {
      return (
        <span id={targetData.id} onClick={like} style={{ cursor: 'pointer' }}>
          {createElement(
            verifyLike(targetLike) === true || action === 'liked'
              ? LikeFilled
              : LikeOutlined
          )}
          <span className="comment-action"> {likes} </span>
        </span>
      )
    }
  }

  return (
    <>
      <LikeButtonFormat />
    </>
  )
}

export default ButtonLike
