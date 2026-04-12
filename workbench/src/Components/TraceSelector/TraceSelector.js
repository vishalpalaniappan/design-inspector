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

            const sortedTraces = Object.values(traces).sort((a, b) => {
                return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
            });

            setLoadedTraces(sortedTraces);
        }
    }, [traces]);

    return (
        <div className="trace-selector-container">
            {loadedTraces && loadedTraces.map((trace, index) => (
                <TraceSelectRow key={trace.uid} trace={trace} />
            ))}
        </div>
    );
}
