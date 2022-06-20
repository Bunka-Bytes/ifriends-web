const BUSCAR_FILTRO = "ifriends/filtro/BUSCAR_FILTRO";

const initialState = {
  filtro: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case BUSCAR_FILTRO:
      return {
        ...state,
        filtro: action.payload,
      };
    default:
      return state;
  }
}

export const selecionarBusca = (filtro = {}, onCallback = null) => {
  return (dispatch) => {
    dispatch({
      type: BUSCAR_FILTRO,
      payload: filtro,
    });
    if (onCallback) onCallback();
  };
};
