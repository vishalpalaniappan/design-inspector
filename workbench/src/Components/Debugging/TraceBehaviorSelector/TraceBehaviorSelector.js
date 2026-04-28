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
    return (
        <div className="traceBehaviorSelector">
            {behaviors.map((entry, index) =>
                <div key={index} className="traceBehaviorSelectorItem">
                    <span className="traceBehaviorSelectorName">{entry.behavior}</span>
                </div>
            )}
        </div>
    );
}
