import { PERGUNTAS, RESPOSTAS } from '../utils/uri-api'
import {
  deleteResource,
  getResource,
  postResource,
  putResource,
  patchResource,
} from './utils'

export const getResposta = (codResposta) =>
  getResource(`${RESPOSTAS}/${encodeURIComponent(codResposta)}`)

export const getRespostas = (codPergunta) =>
  getResource(`${PERGUNTAS}/${encodeURIComponent(codPergunta)}/respostas`)

export const getRespostasUsuario = (codUsuario) =>
  getResource(`${RESPOSTAS}/usuarios/${encodeURIComponent(codUsuario)}`)

export const postResposta = (resposta) => postResource(`${RESPOSTAS}`, resposta)

export const patchAceitarResposta = (codResposta) =>
  patchResource(`${RESPOSTAS}/${encodeURIComponent(codResposta)}/aceitar`)

export const putResposta = (codResposta, resposta) =>
  putResource(`${RESPOSTAS}/${encodeURIComponent(codResposta)}`, resposta)

export const deleteResposta = (codResposta) =>
  deleteResource(`${RESPOSTAS}/${encodeURIComponent(codResposta)}`)
