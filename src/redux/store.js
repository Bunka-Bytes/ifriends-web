import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk" 
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import { Reducers } from './modules'

export const store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(thunk))
)
