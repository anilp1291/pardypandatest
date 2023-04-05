import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
export interface GameData {
    id: number;
    title: string;
    highlightsSupported: boolean;
    fullyOptimized: boolean;
    steamUrl: string;
    publisher: string;
    genre: string;
    status: string;
}


interface SliceState {
    loading: boolean;
    list: GameData[]
}
const initialState: SliceState = {
    list: [],
    loading: false,
}

const slice = createSlice({
    name: "games",
    initialState,
    reducers: {
        gamesRequested: (state) => {
            state.loading = true;
        },

        gamesReceived: (state, action: PayloadAction<GameData[]>) => {
            state.list = action.payload;
            state.loading = false;
        },

        gamesRequestFailed: (state) => {
            state.loading = false;
        },
    },
});

export default slice.reducer;

const { gamesRequested, gamesReceived, gamesRequestFailed } = slice.actions;

const url = "/games.json";

export const loadgames = () => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url,
            onStart: gamesRequested.type,
            onSuccess: gamesReceived.type,
            onError: gamesRequestFailed.type,
        })
    );
};