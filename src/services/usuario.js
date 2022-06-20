import {
  getResource,
  postResource
} from './utils';
import { USUARIOS, CURTIDAS_USUARIO_PERGUNTA } from '../utils/uri-api';

// export const getTriggerAdministrativa = (codTrigger) =>
//   getResource(`${PERGUNTAS}/${encodeURIComponent(codTrigger)}`);


export const getCurtidasUsuario = () => getResource(`${CURTIDAS_USUARIO_PERGUNTA}`);
export const postUsuario = (usuario) => postResource(`${USUARIOS}`, usuario);
export const loginPostUsuario = usuario => postResource(`${USUARIOS}/autenticar`, usuario);