/* eslint-disable max-len */
import React, {useCallback, useEffect, useState} from "react";

import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

import {setSelectedTraceEntryIndexThunk} from "../../../Store/debuggingSlice/debuggingThunk";
import {useSelectedTraceEntryIndex} from "../../../Store/debuggingSlice/useDebuggingSelection";
import {useTraces} from "../../../Store/useAppSelection";
import {useSelectedTraceId} from "../../../Store/useAppSelection";

import "./TraceBehaviorSelector.scss";

TraceBehaviorSelector.propTypes = {
};

/**
 * Trace Behavior Selector component.
 * @return {JSX.Element}
 */
export function TraceBehaviorSelector () {
    const selectedTraceId = useSelectedTraceId();
    const selectedTraceEntryIndex = useSelectedTraceEntryIndex();
    const traces = useTraces();
    const dispatch = useDispatch();
    const [behaviors, setBehaviors] = useState([]);

    useEffect(() => {
        if (selectedTraceId && traces) {
            const traceValues = Object.values(traces);
            const trace = traceValues.find((t) => t.uid === selectedTraceId);
            setBehaviors(trace.debugger.processedTrace);
            dispatch(setSelectedTraceEntryIndexThunk(0));
        }
    }, [selectedTraceId, dispatch, traces]);

    const selectTraceEntry = useCallback((entryIndex) => {
        // Index as identifier because array is constant (order and length)
        dispatch(setSelectedTraceEntryIndexThunk(entryIndex));
    }, [dispatch]);

    const getStyle = useCallback((index) => {
        if (index === selectedTraceEntryIndex) {
            return {
                backgroundColor: "#694636",
                borderBottom: "none",
            };
        }
        return {};
    }, [selectedTraceEntryIndex]);

    return (
        <div className="traceBehaviorSelector">
            {behaviors.map((entry, index) =>
                <div key={index}
                    className="traceBehaviorSelectorItem"
                    style={getStyle(index)}
                    onClick={() => selectTraceEntry(index)}>
                    <span className="traceBehaviorSelectorName">
                        {entry.behavior}
                    </span>
                </div>
            )}
        </div>
    );
}
