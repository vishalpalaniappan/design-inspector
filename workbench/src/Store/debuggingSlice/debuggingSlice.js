import {createSlice} from "@reduxjs/toolkit";

const debuggingSlice = createSlice({
    name: "debugging",
    initialState: {
        selectedTraceEntry: null,
    },
    reducers: {
        setSelectedTraceEntry: (state, action) => {
            state.selectedTraceEntry = action.payload;
        },
    },
});

export const {
    setSelectedTraceEntry,
} = debuggingSlice.actions;

export default debuggingSlice.reducer;
