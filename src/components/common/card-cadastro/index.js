import React from 'react'
import { Card, Divider, Typography } from 'antd'

const CardCadastro = (props) => {
  const { Meta } = Card
  const { Title, Paragraph } = Typography

  return (
    <Card>
      <Title level={5}>
        {props.icone}&nbsp;{props.titulo}
      </Title>

      <Paragraph strong>
        <Meta description={props.descricao} />
      </Paragraph>

      <Divider />

      {props.children}
    </Card>
  )
}

export default CardCadastro
