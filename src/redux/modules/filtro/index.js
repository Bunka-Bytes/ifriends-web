const BUSCAR_FILTRO = 'ifriends/filtro/BUSCAR_FILTRO'
const LOCATION_CHANGE = 'ifriends/filtro/LOCATION_CHANGE'

const initialState = {
  filtro: {},
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case BUSCAR_FILTRO:
      return {
        ...state,
        filtro: { ...state.filtro, ...action.payload },
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export const selecionarBusca = (filtro = {}, onCallback = null) => {
  return (dispatch) => {
    dispatch({
      type: BUSCAR_FILTRO,
      payload: filtro,
    })
    if (onCallback) onCallback()
  }
}

export const limparFiltros = (filtro = {}, onCallback = null) => {
  return (dispatch) => {
    dispatch({
      type: LOCATION_CHANGE,
      payload: filtro,
    })
    if (onCallback) onCallback()
  }
}
