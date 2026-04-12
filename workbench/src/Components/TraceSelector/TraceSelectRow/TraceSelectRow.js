import React, {useContext, useEffect, useRef, useState} from "react";

import PropTypes from "prop-types";

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
    return (
        <div className="trace-select-row-container">
            {trace && trace?.timestamp}
        </div>
    );
}
