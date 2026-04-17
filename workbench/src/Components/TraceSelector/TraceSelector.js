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
            const toMillis = (value) => {
                const ms = Date.parse(value ?? "");
                return Number.isFinite(ms) ? ms : 0;
            };

            const sortedTraces = Object.values(traces).sort((a, b) => {
                return toMillis(b.timestamp) - toMillis(a.timestamp);
            });

            setLoadedTraces(sortedTraces);
        }
    }, [traces]);

    return (
        <div className="trace-selector-container">
            {(loadedTraces && loadedTraces.length > 0) ?
                <>
                    <div className="tracesTitle">Traces</div>
                    <div className="tracesBody">
                        {loadedTraces.map((trace, index) => (
                            <TraceSelectRow key={trace.uid} trace={trace} />
                        ))}
                    </div>
                </>:
                <div className="no-traces">No Available Traces</div>
            }
        </div>
    );
}
