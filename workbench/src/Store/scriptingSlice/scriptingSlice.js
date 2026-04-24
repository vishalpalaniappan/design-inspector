import {createSlice} from "@reduxjs/toolkit";
import { addTraceThunk } from "../appThunk";

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
        transformOutputLog: [],
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
        addTransformOutputLog(state, action) {
            state.transformOutputLog.push(action.payload);
        },
        incrementScriptingCounter(state) {
            state.scriptingCounter += 1;
        },
    },
});

export const {
    addTransformOutputLog,
    setScript,
    setTransformOutput,
    setTransformOutputLog,
    incrementScriptingCounter,
} = scriptingSlice.actions;

export default scriptingSlice.reducer;
