import React, {useContext, useEffect, useRef, useState} from "react";

import PropTypes from "prop-types";

import { CircleFill } from "react-bootstrap-icons";
import "./TraceSelectRow.scss";

TraceSelectRow.propTypes = {
    trace: PropTypes.object.isRequired,
};

/**
 * Trace select row component.
 * @param {Object} props
 * @param {Object} props.trace - The trace to display in this row.
 * @return {JSX.Element}
 */
export function TraceSelectRow ({trace}) {
    const [dateRenered, setDateRendered] = useState("");

    useEffect(() => {
        if (trace?.timestamp) {
            const date = new Date(trace.timestamp);
            const formatted = date.getFullYear() + "-" +
                String(date.getMonth() + 1).padStart(2, "0") + "-" +
                String(date.getDate()).padStart(2, "0") + " " +
                String(date.getHours()).padStart(2, "0") + ":" +
                String(date.getMinutes()).padStart(2, "0") + ":" +
                String(date.getSeconds()).padStart(2, "0");
            setDateRendered("Run at: " + formatted);
        }
    }, [trace]);


    return (
        <div className="trace-select-row-container">

            <div className="selected-icon-container">
                {!trace.selected && <CircleFill size={10} color="#007acc" />}
            </div>
            <div className="date-container">
                {dateRenered}
            </div>
        </div>
    );
}
