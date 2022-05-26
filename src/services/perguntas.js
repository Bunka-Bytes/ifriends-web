import {
  getResource,
  postResource,
  putResource,
  deleteResource
} from './utils';
import { PERGUNTAS } from '../utils/uri-api';

export const getPergunta = (codPergunta) =>
  getResource(`${PERGUNTAS}/${encodeURIComponent(codPergunta)}`);

export const getPerguntas = (filtro) =>
  getResource(`${PERGUNTAS}${filtro}`);

export const postPergunta = (pergunta) => postResource(`${PERGUNTAS}`, pergunta);

export const putResposta = (codPergunta, pergunta) => putResource(`${PERGUNTAS}/${encodeURIComponent(codPergunta)}`, pergunta);

export const deleteResposta = (codPergunta) => deleteResource(`${PERGUNTAS}/${encodeURIComponent(codPergunta)}`);