import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk" 
import { Reducers } from './modules'

export const store = createStore(Reducers, applyMiddleware(thunk))
