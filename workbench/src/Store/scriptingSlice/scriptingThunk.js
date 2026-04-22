// scripting slice thunk
import {setScript} from "./scriptingSlice";


export const setScriptContent = (scriptType, content) => (dispatch) => {
    // Do some validation here and throw errror as needed.
    dispatch(setScript({scriptType, content}));
};
