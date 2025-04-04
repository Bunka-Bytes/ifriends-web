import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid } from 'react-flexbox-grid'
import { useTranslation } from 'react-i18next'

import Image from 'react-bootstrap/Image'

import { Button, Result } from 'antd'

const Working = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Result
      icon={<Image width={360} fluid src="/imgs/work/working.svg" />}
      title={t('working-comming-soon')}
      subTitle={t('working-comming-soon-label')}
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          {t('working-comming-soon-home')}
        </Button>
      }
    />
  )
}

export default Working
