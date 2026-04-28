// Selectors for debugging slice
import {useMemo} from "react";

import {useSelector} from "react-redux";

import {selectSelectedTraceEntry} from "./debuggingSlice";


const useSelectedTraceEntry = () => {
    const selectedTraceEntry = useSelector(selectSelectedTraceEntry);
    return useMemo(() => {
        return selectedTraceEntry;
    }, [selectedTraceEntry]);
};

export default useSelectedTraceEntry;
