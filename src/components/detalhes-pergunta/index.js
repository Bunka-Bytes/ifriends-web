import React from 'react'
import Container from 'react-bootstrap/esm/Container'
// ------- STYLES -----
// ------- COMPONENTS -----
import { useParams } from 'react-router-dom'
// Antd and Bootstrap

// Created
import Pergunta from './pergunta'
import Resposta from './resposta'

const DetalhesPergunta = (props) => {
  const { id } = useParams()
  return (
    <Container>
      <Pergunta idPergunta={id} {...props} />
      <Resposta idPergunta={id} {...props} />
    </Container>
  )
}

export default DetalhesPergunta
