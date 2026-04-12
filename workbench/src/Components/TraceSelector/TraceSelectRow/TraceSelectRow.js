import React, {useContext, useEffect, useRef, useState} from "react";

import PropTypes from "prop-types";
import {CircleFill, Trash} from "react-bootstrap-icons";
import {useDispatch} from "react-redux";

import {setSelectedTraceIdThunk} from "../../../Store/appThunk";
import {useSelectedTraceId} from "../../../Store/useAppSelection";
import {deleteTraceThunk} from "../../../Store/appThunk";

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
    const dispatch = useDispatch();
    const [dateRenered, setDateRendered] = useState("");
    const selectedTraceId = useSelectedTraceId();

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

    const selectTrace = () => {
        if (trace?.uid !== selectedTraceId) {
            dispatch(setSelectedTraceIdThunk(trace.uid));
        } else if (trace?.uid === selectedTraceId) {
            dispatch(setSelectedTraceIdThunk(null));
        } else {
            console.warn("Trace does not have a valid UID:", trace);
        }
    };

    const deleteTrace = () => {
        if (trace?.uid) {
            dispatch(deleteTraceThunk(trace.uid));
        } else {
            console.warn("Trace does not have a valid UID:", trace);
        }
    };

    return (
        <div className="trace-select-row-container"
            onClick={selectTrace}>
            <div className="selected-icon-container">
                {selectedTraceId === trace.uid && <CircleFill size={10} color="#007acc" />}
            </div>
            <div className="date-container">
                {dateRenered}
            </div>
            <div className="trash-icon-container">
                <Trash title="Delete Trace" size={25} color="grey" onClick={deleteTrace} />
            </div>
        </div>
    );
}
