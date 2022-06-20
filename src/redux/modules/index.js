import perguntaReducer from './pergunta'
import filtroReducer from './filtro'
import { combineReducers } from 'redux'

export const Reducers = combineReducers({
  perguntaReducer,
  filtroReducer
})
