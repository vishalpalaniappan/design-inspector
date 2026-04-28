/* eslint-disable max-len */
import React, {useCallback, useEffect, useState} from "react";

import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

import {setSelectedTraceEntryThunk} from "../../../Store/debuggingSlice/debuggingThunk";
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
                console.log(trace);
            }
        }
    }, [selectedTraceId, traces]);

    const selectTraceEntry = useCallback((entryIndex) => {
        // Index as identifier because array is constant (order and length)
        dispatch(setSelectedTraceEntryThunk(entryIndex));
    }, [dispatch]);

    return (
        <div className="traceBehaviorSelector">
            {behaviors.map((entry, index) =>
                <div key={index}
                    className="traceBehaviorSelectorItem"
                    onClick={() => selectTraceEntry(index)}>
                    <span className="traceBehaviorSelectorName">
                        {entry.behavior}
                    </span>
                </div>
            )}
        </div>
    );
}
