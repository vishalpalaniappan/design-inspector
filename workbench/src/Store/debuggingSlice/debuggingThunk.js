// debugging slice thunk
import {selectSelectedTraceId} from "./debuggingSelectors";
import {setSelectedTraceEntry} from "./debuggingSlice";

export const setSelectedTraceEntryThunk = (entryIndex) => (dispatch, getState) => {
    if (entryIndex === undefined || entryIndex === null) {
        console.warn("Invalid trace ID provided.");
        return;
    }
    const traceId = selectSelectedTraceId(getState());
    dispatch(setSelectedTraceEntry(traceId));
};
