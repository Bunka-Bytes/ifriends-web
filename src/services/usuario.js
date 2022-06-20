import {
  getResource,
  postResource
} from './utils';
import { USUARIOS } from '../utils/uri-api';

// export const getTriggerAdministrativa = (codTrigger) =>
//   getResource(`${PERGUNTAS}/${encodeURIComponent(codTrigger)}`);

export const postUsuario = (usuario) => postResource(`${USUARIOS}`, usuario);
export const loginPostUsuario = usuario => postResource(`${USUARIOS}/autenticar`, usuario);