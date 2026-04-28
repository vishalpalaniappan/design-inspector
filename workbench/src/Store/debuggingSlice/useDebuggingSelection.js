// Selectors for debugging slice
import {useMemo} from "react";

import {useSelector} from "react-redux";

import {selectSelectedTraceEntry} from "./debuggingSelectors";


export const useSelectedTraceEntry = () => {
    const selectedTraceEntry = useSelector(selectSelectedTraceEntry);
    return useMemo(() => {
        return selectedTraceEntry;
    }, [selectedTraceEntry]);
};
