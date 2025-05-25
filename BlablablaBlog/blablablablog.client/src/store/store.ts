import { rootReducer } from '../reducers/_rootReducer'
import { configureStore } from '@reduxjs/toolkit';

//export const store = createStore(rootReducer, applyMiddleware(thunk))
export const store = configureStore({ reducer: rootReducer })
