import {configureStore} from '@reduxjs/toolkit';
import scoreBoardReducer from './scoreBoardSlice';

export const store = configureStore({
    reducer: {
        scoreBoard: scoreBoardReducer
    }
});
