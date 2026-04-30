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
     * I have moved to grouping the behaviors by the atomic design path
     * that they belong to. However, I am still flattening it into one list here
     * and then rendering it onto the screen but I need to move away from this.
     * In the future, I want to show atomic executions visually overlayed on top
     * of the design, so this will be relevant for that. So I need to update
     * setSelectedTraceEntryIndexThunk to take a atomic index and then a entry
     * index to select the relevant behavior.
     *
     * This will also allow me to let them select atomic paths at a higher level and
     * drill down into a single paths behaviors. This will make it much easier for
     * me to work with larger traces genereated by larger designs.
     */

    useEffect(() => {
        if (selectedTraceId && traces) {
            const traceValues = Object.values(traces);
            const trace = traceValues.find((t) => t.uid === selectedTraceId);
            console.log(trace);
            if (!trace || !trace.executableModelOutput) {
                console.warn(`Trace with id ${selectedTraceId} not found or has no executableModelOutput`);
                return;
            };
            setBehaviors(trace.executableModelOutput);
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
        if (behavior.output.implementationFailure) {
            return {
                backgroundColor: "#2d1f1f",
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
                        <div className="traceBehaviorSelectorName">
                            {entry.behavior}
                        </div>
                        { (!entry.output?.transformValidFlag && !entry.output?.transformFailure) &&
                            <div className="traceBehaviorTransformValidity">
                                {"Invalid Implementation."}
                            </div>
                        }
                        { !entry.output?.invariantsRespectedFlag &&
                            <div className="traceBehaviorInvariantViolations">
                                {"World state violated invariants."}
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}
