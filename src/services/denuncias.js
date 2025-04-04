import { getResource, postResource } from './utils'
import { MOTIVOS_REPORT, PERGUNTAS, RESPOSTAS, EVENTOS } from '../utils/uri-api'


// trocar ordem depois
export const getMotivosReport = () => getResource(`${MOTIVOS_REPORT}`)

export const postReportPergunta = (codPergunta, report) => postResource(`${PERGUNTAS}/${encodeURIComponent(codPergunta)}/reportar`, report)

export const postReportResposta = (codResposta, report) =>
  postResource(
    `${RESPOSTAS}/${encodeURIComponent(codResposta)}/reportar`,
    report
  )
export const postReportEvento = (codResposta, report) => postResource( `${EVENTOS}/${encodeURIComponent(codResposta)}/reportar`,report)
