import {
  postResource
} from './utils';
import { CURTIDAS_PERGUNTA } from '../utils/uri-api';

export const postCurtidaPergunta = (codUsuario, codPergunta) => postResource(`${CURTIDAS_PERGUNTA}/${encodeURIComponent(codUsuario)}/${encodeURIComponent(codPergunta)}`);