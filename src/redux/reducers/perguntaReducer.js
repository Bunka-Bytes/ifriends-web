import { PERGUNTA } from '../actions/actionTypes'
const initialState = {
  newValue: 'Funfando?'
}
export const perguntaReducer = (state = initialState, action) => {
  switch (action.type) {
    case PERGUNTA:
      return {
        ...state,
        newValue: action.newValue
      }
    default:
      return state
  }
}
