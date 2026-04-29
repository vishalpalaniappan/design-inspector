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
    const [selectedBehavior, setSelectedBehavior] = useState(null);

    /**
     * TODO:
     * Notes for myself to continue
     * 1. Create color scheme to indicate semantic validity of behaviors.
     * 2. Create color scheme to indicate if behavior failed.
     * 3. Add subtitles which include number of violations and transform validity.
     * 4. Add container for failure and root cause identification through invariant violation.
     * 5. If none exists, then learning.
     */

    useEffect(() => {
        if (selectedTraceId && traces) {
            const traceValues = Object.values(traces);
            const trace = traceValues.find((t) => t.uid === selectedTraceId);
            setBehaviors(trace.debugger.processedTrace);
            dispatch(setSelectedTraceEntryIndexThunk(0));
        }
    }, [selectedTraceId, dispatch, traces]);

    useEffect(() => {
        if (behaviors.length > 0 && selectedTraceEntryIndex !== null) {
            setSelectedBehavior(behaviors[selectedTraceEntryIndex]);
        }
    }, [selectedTraceEntryIndex, behaviors]);

    const selectTraceEntry = useCallback((entryIndex) => {
        // Index as identifier because array is constant (order and length)
        dispatch(setSelectedTraceEntryIndexThunk(entryIndex));
    }, [dispatch]);

    const getSelectedStyle = useCallback((index) => {
        if (index === selectedTraceEntryIndex) {
            return {
                backgroundColor: "#694636",
                borderBottom: "none",
            };
        }
        return {};
    }, [selectedTraceEntryIndex]);

    const getBehaviorStyle = useCallback((index) => {
        const behavior = behaviors[index];
        if (behavior.failure) {
            return {
                backgroundColor: "#6b0500",
                borderBottom: "none",
            };
        }
    }, [traces, behaviors, selectedTraceEntryIndex, selectedBehavior]);

    return (
        <div className="traceBehaviorSelector">
            {behaviors.map((entry, index) =>
                <div className="traceBehaviorRow" key={index}>
                    {
                        <div
                            style={getSelectedStyle(index)}
                            className="traceBehaviorIndicator" />
                    }
                    <div key={index}
                        className="traceBehaviorSelectorItem"
                        style={getBehaviorStyle(index)}
                        onClick={() => selectTraceEntry(index)}>
                        <span className="traceBehaviorSelectorName">
                            {entry.behavior}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
