import {createSlice} from "@reduxjs/toolkit";

const scriptingSlice = createSlice({
    name: "scripting",
    initialState: {
        scripts: {
            initialArgs: "",
            initialWorldState: "",
            expectedPostWorldState: "",
            primitives: "",
            computedPostWorldState: "",
        },
    },
    reducers: {
        setScript(state, action) {
            const {scriptType, content} = action.payload;
            if (state.scripts.hasOwnProperty(scriptType)) {
                state.scripts[scriptType] = content;
            } else {
                console.warn(`Unknown script type: ${scriptType}`);
            }
        },
    },
});

export const {setScript} = scriptingSlice.actions;

export default scriptingSlice.reducer;
