// debugging slice thunk
import {setSelectedTraceEntry} from "./debuggingSlice";

export const setSelectedTraceEntryThunk = (entryIndex) => (dispatch, getState) => {
    if (entryIndex === undefined || entryIndex === null) {
        console.warn("Invalid trace ID provided.");
        return;
    }
    dispatch(setSelectedTraceEntry(entryIndex));
};
