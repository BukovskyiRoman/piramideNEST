import { createSlice } from "@reduxjs/toolkit";

export const jwtSlice = createSlice({
    name: "auth",
    initialState: {
        token: null
    },
    reducers: {
        set: (state, jwt) => {
            state.token = jwt.payload;
        },
        logOut: (state, action) => {
            state.token = null;
        }
    }
});

export const { set, logOut, get } = jwtSlice.actions;

export default jwtSlice.reducer;
