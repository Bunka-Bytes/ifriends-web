import {
  getResource,
  postResource,
  putResource,
  deleteResource,
  serializeObjectToParam,
} from './utils'
import { EVENTOS } from '../utils/uri-api'

export const getEvento = (codEvento) =>
  getResource(`${EVENTOS}/${encodeURIComponent(codEvento)}`)

export const getEventos = (filtro) =>
  getResource(`${EVENTOS}${serializeObjectToParam(filtro, true)}`)

export const getEventosUsuario = (codUsuario, filtro) =>
  getResource(
    `${EVENTOS}/usuarios/${codUsuario}${serializeObjectToParam(filtro, true)}`
  )

export const postEvento = (evento) => postResource(`${EVENTOS}`, evento)

export const putEvento = (codEvento, evento) =>
  putResource(`${EVENTOS}/${encodeURIComponent(codEvento)}`, evento)

export const deleteEvento = (codEvento) =>
  deleteResource(`${EVENTOS}/${encodeURIComponent(codEvento)}`)
