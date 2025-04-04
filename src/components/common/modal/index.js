import { Modal as ModalAntd } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

export const [LARGE, SMALL, SMALL_MEDIUM, MEDIUM] = [
  'large',
  'small',
  'small_medium',
  'medium',
]

const Modal = (props) => {
  const {
    visible,
    size,
    children,
    onCancel,
    conteudos = [],
    idConteudo = 0,
    titleComponente = undefined,
    footer = null,
  } = props
  const title = titleComponente || (props.title || '').toUpperCase()

  const defineWidth = () => {
    if (size === 'large') {
      return '1000px'
    }
    if (size === 'small_medium') {
      return '550px'
    }
    if (size === 'small') {
      return '400px'
    }
    return '700px'
  }

  const onCancelComponent = (event) => {
    if (onCancel) {
      onCancel(event)
    }
  }

  const getConteudo = () => {
    if (conteudos.length > 0 && idConteudo) {
      return conteudos.filter((c) => c.props.id === idConteudo)[0] || children
    }
    return children
  }

  return (
    <ModalAntd
      visible={visible}
      title={title}
      closable={title}
      maskClosable={false}
      mask={true}
      width={defineWidth()}
      onCancel={onCancelComponent}
      footer={footer}
      style={{ maxWidth: '100%' }}
    >
      {getConteudo()}
    </ModalAntd>
  )
}

Modal.propTypes = {
  visible: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'small', 'medium']),
  onCancel: PropTypes.func,
  conteudos: PropTypes.arrayOf(PropTypes.node),
  idConteudo: PropTypes.number,
  title: PropTypes.string,
}

export default Modal
export { Modal }
