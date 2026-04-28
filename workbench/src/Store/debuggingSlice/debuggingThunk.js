// debugging slice thunk
import {selectSelectedTraceId} from "./debuggingSelectors";
import {setSelectedTraceEntry} from "./debuggingSlice";

export const setSelectedTraceEntryThunk = (traceId) => (dispatch, getState) => {
    if (!traceId) {
        // TODO: Extend this to check if traceID exists in traces.
        console.warn("Invalid trace ID provided.");
        return;
    }
    const traceId = selectSelectedTraceId(getState());
    console.log(traceId);
    dispatch(setSelectedTraceEntry(traceId));
};
