import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Result } from 'antd'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="Desculpe, parece que esta página não existe."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Ir para a página inicial
        </Button>
      }
    />
  )
}

export default NotFound
