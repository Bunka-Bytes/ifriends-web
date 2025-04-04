import React from 'react'
import { Button, Dropdown, Menu, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import { MdOutlineCreate } from 'react-icons/md'
import { Link } from 'react-router-dom'

import './index.css'

const FloatingButton = () => {
  const { t } = useTranslation()
  const menuCriar = (
    <Menu
      onClick={(e) => {}}
      items={[
        {
          key: '1',
          label: <Link to="/criar-pergunta">{t('label-pergunta')}</Link>,
        },
        {
          key: '2',
          label: <Link to="/criar-evento">{t('label-evento')}</Link>,
        },
      ]}
    />
  )
  return (
    <Row className="ant-back-top" align="middle">
      <Button
        type="primary"
        shape="circle"
        size="large"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Dropdown overlay={menuCriar} placement="top" arrow>
          <MdOutlineCreate
            size={25}
            style={{ cursor: 'pointer', color: 'var(--white)' }}
          />
        </Dropdown>
      </Button>
    </Row>
  )
}

export default FloatingButton
