import {
  getResource,
  postResource,
  putResource,
  deleteResource
} from './utils';
import { RESPOSTAS } from '../utils/uri-api';
import { PERGUNTAS } from '../utils/uri-api';

export const getResposta = (codResposta) =>
  getResource(`${RESPOSTAS}/${encodeURIComponent(codResposta)}`);

export const getRespostas = codPergunta =>
	getResource(`${PERGUNTAS}/${encodeURIComponent(codPergunta)}/respostas`);

export const postResposta = (resposta) => postResource(`${RESPOSTAS}`, resposta);

export const putResposta = (codResposta, resposta) => putResource(`${RESPOSTAS}/${encodeURIComponent(codResposta)}`, resposta);

export const deleteResposta = (codResposta) => deleteResource(`${RESPOSTAS}/${encodeURIComponent(codResposta)}`);