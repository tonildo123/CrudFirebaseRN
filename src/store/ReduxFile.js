import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/CombineReducer';
// import rootReducer from './reducer/CombineReducer';


const store = configureStore (
    {reducer: rootReducer});

export default store;