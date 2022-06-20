import {
  postResource
} from './utils';
import { CURTIDAS_RESPOSTA } from '../utils/uri-api';

export const postCurtidaResposta = (codResposta) => postResource(`${CURTIDAS_RESPOSTA}/${encodeURIComponent(codResposta)}/curtir`);