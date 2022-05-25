import {
  getResource,
  postResource
} from './utils';
import { PERGUNTAS } from '../utils/uri-api';

// export const getTriggerAdministrativa = (codTrigger) =>
//   getResource(`${PERGUNTAS}/${encodeURIComponent(codTrigger)}`);

export const getPerguntas = (filtro) =>
  getResource(`${PERGUNTAS}/buscar${filtro}`);

  // export const getPerguntaPorId = (id) => 
  // getResource(`${PERGUNTAS}/${id}`);

export const postPergunta = (pergunta) => postResource(`${PERGUNTAS}/salvar`, pergunta);