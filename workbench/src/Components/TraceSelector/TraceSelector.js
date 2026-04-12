import React, {useContext, useEffect, useRef, useState} from "react";

import {useTraces} from "../../Store/useAppSelection";
import {TraceSelectRow} from "./TraceSelectRow/TraceSelectRow";

import "./TraceSelector.scss";

/**
 * Trace selector component.
 * @return {JSX.Element}
 */
export function TraceSelector () {
    const traces = useTraces();
    const [loadedTraces, setLoadedTraces] = useState([]);

    useEffect(() => {
        if (traces) {
            console.log("Traces updated:", traces);
            setLoadedTraces(Object.values(traces));

            // Object.values(traces).forEach((trace) => {
            //     console.log(new Date(trace.timestamp).getTime());
            // });
        }
    }, [traces]);

    return (
        <div className="trace-selector-container">
            {loadedTraces && loadedTraces.map((trace, index) => (
                <TraceSelectRow key={index} trace={trace} />
            ))}
        </div>
    );
}
