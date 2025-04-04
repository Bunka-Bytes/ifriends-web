import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

// ------- STYLES -----
// ------- COMPONENTS -----

// Antd and Bootstrap
import {
  Dropdown,
  Menu,
  message,
  Modal,
  Typography,
  Divider,
  Select,
} from 'antd'
import { FiMoreVertical, FiTrash2, FiAlertCircle, FiFlag } from 'react-icons/fi'
import { AiOutlineEdit } from 'react-icons/ai'

// Created

// ------ ICONS -----

// Services
import { getEvento, deleteEvento } from '../../../../services/evento'

// ------ FUNCTIONS ------
import { error } from '../../../../utils/functions'

import { isAuthenticated } from '../../../../services/auth'
import Item from 'antd/lib/descriptions/Item'
import Input from 'antd/lib/input/Input'
import TextArea from 'antd/lib/input/TextArea'

const { confirm } = Modal
const { Title, Paragraph, Text, Link } = Typography
const listData = [
  {
    value: 1,
    label: 'teste',
  },
]
const DropdownAcoesEvento = (props) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { evento } = props

  const onClick = ({ key }) => {
    // Remover evento
    if (key === '1') {
      return confirm({
        title: t('label-confirm'),
        icon: (
          <FiAlertCircle style={{ color: 'var(--red)', fontSize: '1.25rem' }} />
        ),
        content: t('label-confirm-content'),
        okText: t('label-confirm-delete'),
        okType: 'danger',
        cancelText: t('label-confirm-cancel'),
        okButtonProps: {
          type: 'primary',
        },

        onOk() {
          deleteEvento(evento.id)
            .then((response) => {
              message.success(t('label-success-delete'))
              navigate('/dashboard/eventos')
            })
            .catch(error)
        },

        onCancel() {},
      })
    }
    if (key === '2') {
      return true
    }
    if (key === '3') {
      return confirm({
        title: t('label-report'),
        width: '500px',
        content: (
          <Typography>
            <Paragraph>{t('label-confirm-content-report')}</Paragraph>
            <Divider />
            <label style={{ fontWeight: 800 }}>{t('label-reason') + ':'}</label>
            <Select
              placeholder={t('label-reason-select')}
              style={{ width: '100%' }}
              options={listData}
              allowClear
            />
            <label style={{ marginTop: '10px', fontWeight: 800 }}>
              {t('label-description') + ':'}
            </label>
            <TextArea
              placeholder={t('criar-evento-placeholder-write')}
              allowClear={true}
              showCount
              maxLength={500}
              name={'descricao'}
            />
          </Typography>
        ),
        okText: t('label-report'),
        okType: 'danger',
        cancelText: t('label-confirm-cancel'),
        okButtonProps: {
          type: 'primary',
        },

        onOk() {
          deleteEvento(evento.id)
            .then((response) => {
              message.success(t('label-success-delete'))
              navigate('/dashboard/eventos')
            })
            .catch(error)
        },

        onCancel() {},
      })
    }
    // console.log(`${key}`)
  }

  const menuAcoesUsuarioLogado = (
    <Menu
      align="start"
      onClick={onClick}
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

  const menuAcoesUsuario = (
    <Menu
      align="start"
      onClick={onClick}
      items={[
        {
          key: '3',
          label: t('label-report'),
          icon: <FiFlag />,
        },
      ]}
    />
  )

  return (
    <>
      {isAuthenticated() &&
      sessionStorage.getItem('@user-email') === evento.autorEmail ? (
        <Dropdown
          overlay={menuAcoesUsuarioLogado}
          placement="bottomRight"
          arrow
        >
          <span onClick={(e) => e.preventDefault()}>
            <FiMoreVertical />
          </span>
        </Dropdown>
      ) : (
        <Dropdown overlay={menuAcoesUsuario} placement="bottomRight" arrow>
          <span onClick={(e) => e.preventDefault()}>
            <FiMoreVertical />
          </span>
        </Dropdown>
      )}
    </>
  )
}

export default DropdownAcoesEvento
