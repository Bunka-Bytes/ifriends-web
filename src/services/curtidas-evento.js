import { postResource } from './utils'
import { CURTIDAS_EVENTO } from '../utils/uri-api'

// trocar ordem depois
export const postCurtidaEvento = (codEvento) =>
  postResource(`${CURTIDAS_EVENTO}/${encodeURIComponent(codEvento)}/favoritar`)
