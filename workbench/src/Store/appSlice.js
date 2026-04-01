import {createSlice} from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        value: null,
    },
    reducers: {
        setValue(state, action) {
            state.value = action.payload;
        },
    },
});

export const {setValue} = appSlice.actions;

export default appSlice.reducer;