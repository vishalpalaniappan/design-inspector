/* eslint-disable max-len */
import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";

import {useTraces} from "../../../Store/useAppSelection";
import {useSelectedTraceId} from "../../../Store/useAppSelection";

import "./RootCauseContainer.scss";

RootCauseContainer.propTypes = {
    close: PropTypes.func.isRequired,
    args: PropTypes.object.isRequired,
};

/**
 * Root Cause Container component.
 * @return {JSX.Element}
 */
export function RootCauseContainer () {
    const selectedTraceId = useSelectedTraceId();
    const [failures, setFailures] = useState([]);
    const traces = useTraces();


    useEffect(() => {
        if (selectedTraceId && traces) {
            const traceValues = Object.values(traces);
            const trace = traceValues.find((t) => t.uid === selectedTraceId);
            if (!trace) {
                console.warn(`Trace with id ${selectedTraceId} not found`);
                return;
            }
            const failures = trace.debugger._failures;
            setFailures(failures);
            console.log(failures);
        }
    }, [selectedTraceId, traces]);
    return (
        <div></div>
    );
}
