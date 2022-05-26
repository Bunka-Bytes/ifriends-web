import {
  getResource,
  postResource
} from './utils';
import { USUARIOS } from '../utils/uri-api';

// export const getTriggerAdministrativa = (codTrigger) =>
//   getResource(`${PERGUNTAS}/${encodeURIComponent(codTrigger)}`);

export const postUsuario = (usuario) => postResource(`${USUARIOS}/salvar`, usuario);