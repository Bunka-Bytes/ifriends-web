import { getResource } from './utils';
import { CATEGORIAS} from '../utils/uri-api';

// trocar ordem depois
export const getCategoriasPergunta = () => getResource(`${CATEGORIAS}`);
