import { getPerguntas } from '../../../services/pergunta';

const BUSCAR_PERGUNTAS = 'ifriends/pergunta/BUSCAR_PERGUNTAS';

const initialState = {
    perguntas: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case BUSCAR_PERGUNTAS:
            return {
                ...state,
                perguntas: action.payload.data
            };
        default:
            return state;
    }
}

export function buscaPerguntas(filtro) {
    return dispatch => {
        getPerguntas(filtro)
        .then(response => {
            dispatch({
                type: BUSCAR_PERGUNTAS,
                payload: response.data
            })
        })
    }
}