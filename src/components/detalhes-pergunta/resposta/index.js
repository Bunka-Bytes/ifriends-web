import React from 'react'
// ------- STYLES -----
// ------- COMPONENTS -----
// Created
import Comentario from './escrever-resposta'

const Resposta = (props) => {
  return (
    <>
      <Comentario idPergunta={props.idPergunta} />
    </>
  )
}

export default Resposta
