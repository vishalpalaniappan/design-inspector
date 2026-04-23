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
        transformOutput: null,
        transformOutputLog: null,
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
        setTransformOutput(state, action) {
            state.transformOutput = action.payload;
        },
        setTransformOutputLog(state, action) {
            state.transformOutputLog = action.payload;
        },
    },
});

export const {setScript, setTransformOutput, setTransformOutputLog} = scriptingSlice.actions;

export default scriptingSlice.reducer;
