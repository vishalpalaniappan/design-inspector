/* eslint-disable max-len */
import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

import {useTraces} from "../../../Store/useAppSelection";
import {useSelectedTraceId} from "../../../Store/useAppSelection";

import "./TraceBehaviorSelector.scss";

TraceBehaviorSelector.propTypes = {
    close: PropTypes.func.isRequired,
    args: PropTypes.object.isRequired,
};

/**
 * Trace Behavior Selector component.
 * @return {JSX.Element}
 */
export function TraceBehaviorSelector () {
    const selectedTraceId = useSelectedTraceId();
    const traces = useTraces();
    const dispatch = useDispatch();
    const [behaviors, setBehaviors] = useState([]);

    useEffect(() => {
        if (selectedTraceId && traces) {
            const traceValues = Object.values(traces);
            const trace = traceValues.find((t) => t.uid === selectedTraceId);
            if (trace) {
                setBehaviors(trace.debugger.processedTrace);
                console.log(trace.debugger.processedTrace);
            }
        }
    }, [selectedTraceId, traces]);
    const selectTraceEntry = (entry) => {
        console.log("Selected trace entry:", entry);
        // Set selected trace entry in store here
        // dispatch(setSelectedTraceEntryThunk(entry));
    };
    return (
        <div className="traceBehaviorSelector">
            {behaviors.map((entry, index) =>
                <div key={index} className="traceBehaviorSelectorItem">
                    <span className="traceBehaviorSelectorName"
                        onClick={() => selectTraceEntry(entry)}>{entry.behavior}
                    </span>
                </div>
            )}
        </div>
    );
}
