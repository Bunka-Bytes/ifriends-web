export const getURI = (uri, params) => {
  let aux = uri
  for (const prop in params) {
    aux = aux.replace(new RegExp('{' + prop + '}', 'g'), params[prop])
  }
  return aux
}

export const API = '/api'

export const USUARIOS = `${API}/usuarios`
export const CURTIDAS_USUARIO_PERGUNTA = `${API}/usuarios/perguntas/curtidas`
export const CURTIDAS_USUARIO_RESPOSTA = `${API}/usuarios/respostas/curtidas`
export const FAVORITOS_USUARIO_EVENTO = `${API}/usuarios/eventos/favoritados`
export const PERGUNTAS = `${API}/perguntas`
export const CURTIDAS_PERGUNTA = `${PERGUNTAS}`
export const RESPOSTAS = `${API}/respostas`
export const CURTIDAS_RESPOSTA = `${RESPOSTAS}`
export const CATEGORIAS = `${API}/categorias`
export const CURSOS = `${API}/cursos`
export const DOMINIOS = `${API}/dominios`
export const EVENTOS = `${API}/eventos`
export const CURTIDAS_EVENTO = `${EVENTOS}`
export const CURTIDAS_USUARIO_EVENTO = `${API}/usuarios/eventos/favoritados`
export const MOTIVOS_REPORT = `${API}/motivosReport`
