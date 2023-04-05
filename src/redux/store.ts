import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import gameslice from "./gameslice";
import middleware from './middleware';

const store = configureStore({
    reducer: {
        game: gameslice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types

export default store