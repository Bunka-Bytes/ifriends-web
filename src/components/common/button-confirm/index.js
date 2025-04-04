import React from 'react'
import { Modal } from 'antd'
import Button, {
  PRIMARY,
  GHOST,
  DASHED,
  LINK,
  TEXT,
  DEFAULT,
  DANGER,
} from 'components/common/button'
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import Draggable from 'react-draggable'

export const modalError = (title, onOk, onCancel) => {
  Modal.error({
    icon: <ExclamationCircleOutlined />,
    title,
    onOk() {
      if (onOk) {
        onOk()
      }
    },
    onCancel() {
      if (onCancel) {
        onCancel()
      }
    },
    modalRender: (modal) => (
      <Draggable>
        <div>{modal}</div>
      </Draggable>
    ),
  })
}

export const modalSuccess = (title, onOk) => {
  Modal.success({
    icon: <CheckCircleOutlined />,
    title,
    okText: 'Ok',
    onOk() {
      if (onOk) {
        onOk()
      }
    },
    modalRender: (modal) => (
      <Draggable>
        <div>{modal}</div>
      </Draggable>
    ),
  })
}

export const modalWarning = (title, onOk) => {
  Modal.warning({
    icon: <ExclamationCircleOutlined />,
    title,
    okText: 'Ok',
    onOk() {
      if (onOk) {
        onOk()
      }
    },
    modalRender: (modal) => (
      <Draggable>
        <div>{modal}</div>
      </Draggable>
    ),
  })
}

export const modalConfirm = (title, onOk, onCancel) => {
  Modal.confirm({
    icon: <ExclamationCircleOutlined />,
    title: (
      <Draggable>
        <div>{title}</div>
      </Draggable>
    ),
    okText: 'Sim',
    cancelText: 'Não',
    maskClosable: true,
    onOk() {
      if (onOk) {
        onOk()
      }
    },
    onCancel() {
      if (onCancel) {
        onCancel()
      }
    },
    modalRender: (modal) => (
      <Draggable>
        <div>{modal}</div>
      </Draggable>
    ),
  })
}
const ButtonConfirm = (props) => {
  const {
    type,
    label,
    title,
    onOk,
    onCancel,
    icon,
    ghost = false,
    block = false,
    stopPropagation,
    disabled = false,
    validaOnClick,
    tooltipEnabled,
    labelCompleta,
  } = props

  const mostraConfirmacao = (e) => {
    stopPropagation && e.stopPropagation()
    let abreModal = true
    if (validaOnClick) {
      abreModal = validaOnClick()
    }
    if (abreModal) {
      modalConfirm(title, onOk, onCancel)
    }
  }

  return (
    <Button
      {...props}
      tooltipEnabled={tooltipEnabled}
      labelCompleta={labelCompleta}
      type={type}
      icon={icon}
      label={label}
      ghost={ghost}
      block={block}
      onClick={mostraConfirmacao}
      disabled={disabled}
    />
  )
}

export { PRIMARY, GHOST, DASHED, LINK, TEXT, DEFAULT, DANGER }
export default ButtonConfirm
