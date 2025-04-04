import {
  CURTIDAS_USUARIO_PERGUNTA,
  USUARIOS,
  DOMINIOS,
  CURTIDAS_USUARIO_EVENTO,
  CURTIDAS_USUARIO_RESPOSTA,
} from '../utils/uri-api'
import {
  getResource,
  postResource,
  putResource,
  serializeObjectToParam,
} from './utils'

export const getUsuario = (idUsuario) => getResource(`${USUARIOS}/${idUsuario}`)
export const getCurtidasUsuarioPergunta = () =>
  getResource(`${CURTIDAS_USUARIO_PERGUNTA}`)

export const getCurtidasUsuarioResposta = () =>
  getResource(`${CURTIDAS_USUARIO_RESPOSTA}`)

export const getCurtidasUsuarioEvento = () =>
  getResource(`${CURTIDAS_USUARIO_EVENTO}`)

export const getCurtidasUsuario = () =>
  getResource(`${CURTIDAS_USUARIO_PERGUNTA}`)

export const getEmailDominios = () => getResource(`${DOMINIOS}`)

export const autenticaEmailUsuario = (codigoVerificador) =>
  postResource(`${USUARIOS}/email/${codigoVerificador}/confirmacao`)
export const loginPostUsuario = (usuario) =>
  postResource(`${USUARIOS}/autenticar`, usuario)

export const getUsuarios = (filtro) =>
  getResource(`${USUARIOS}${serializeObjectToParam(filtro, true)}`)

export const postUsuario = (usuario) => postResource(`${USUARIOS}`, usuario)
export const putUsuario = (idUsuario, usuario) =>
  putResource(`${USUARIOS}/${idUsuario}`, usuario)

export const getEmailAlterarSenha = (codigoVerificador) =>
  getResource(`${USUARIOS}/email/${codigoVerificador}/senha/alterar`)
export const postEmailAlterarSenha = (codigoVerificador, usuario) =>
  postResource(
    `${USUARIOS}/email/${codigoVerificador}/confirmacao/senha/alterar`,
    usuario
  )
