import {
  postResource
} from './utils';
import { CURTIDAS_RESPOSTA } from '../utils/uri-api';

export const postCurtidaResposta = (codUsuario, codResposta) => postResource(`${CURTIDAS_RESPOSTA}/${encodeURIComponent(codUsuario)}/${encodeURIComponent(codResposta)}`);