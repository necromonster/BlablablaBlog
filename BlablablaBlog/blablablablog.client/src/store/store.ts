import { rootReducer } from '../reducers/_rootReducer'
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({ reducer: rootReducer })
