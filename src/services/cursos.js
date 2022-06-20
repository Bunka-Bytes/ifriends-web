import { getResource } from './utils';
import { CURSOS } from '../utils/uri-api';

// trocar ordem depois
export const getCursos = () => getResource(`${CURSOS}`);
