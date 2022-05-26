import { perguntaReducer } from './perguntaReducer'
import { combineReducers } from 'redux'

export const Reducers = combineReducers({
  perguntaState: perguntaReducer,
})
