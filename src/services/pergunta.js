import {
  getResource,
  postResource,
  putResource,
  deleteResource,
  serializeObjectToParam,
  patchResource,
} from './utils'
import { PERGUNTAS } from '../utils/uri-api'

export const getPergunta = (codPergunta) =>
  getResource(`${PERGUNTAS}/${encodeURIComponent(codPergunta)}`)

export const getPerguntas = (filtro) =>
  getResource(`${PERGUNTAS}${serializeObjectToParam(filtro, true)}`)

export const getPerguntasUsuario = (codUsuario, filtro) =>
  getResource(
    `${PERGUNTAS}/usuarios/${codUsuario}${serializeObjectToParam(filtro, true)}`
  )

export const postPergunta = (pergunta) => postResource(`${PERGUNTAS}`, pergunta)
export const postPerguntaVisualizacao = (codPergunta) =>
  postResource(`${PERGUNTAS}/${encodeURIComponent(codPergunta)}/visualizar`)

export const patchMarcarRespondida = (codPergunta) =>
  patchResource(`${PERGUNTAS}/${encodeURIComponent(codPergunta)}/respondida`)

export const putPergunta = (codPergunta, pergunta) =>
  putResource(`${PERGUNTAS}/${encodeURIComponent(codPergunta)}`, pergunta)

export const deletePergunta = (codPergunta) =>
  deleteResource(`${PERGUNTAS}/${encodeURIComponent(codPergunta)}`)
