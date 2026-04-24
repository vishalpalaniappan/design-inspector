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
        scriptingCounter: 0,
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
        incrementScriptingCounter(state) {
            state.scriptingCounter += 1;
        },
    },
});

export const {
    setScript,
    setTransformOutput,
    setTransformOutputLog,
    incrementScriptingCounter,
} = scriptingSlice.actions;

export default scriptingSlice.reducer;
