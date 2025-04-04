import { postResource } from './utils'
import { CURTIDAS_PERGUNTA } from '../utils/uri-api'

// trocar ordem depois
export const postCurtidaPergunta = (codPergunta) =>
  postResource(`${CURTIDAS_PERGUNTA}/${encodeURIComponent(codPergunta)}/curtir`)
