import React, {useContext, useEffect, useRef, useState} from "react";

import {useTraces} from "../../Store/useAppSelection";

import "./TraceSelector.scss";

/**
 * Trace selector component.
 * @return {JSX.Element}
 */
export function TraceSelector () {
    const traces = useTraces();

    useEffect(() => {
        if (traces) {
            console.log("Traces updated:", traces);
        }
    }, [traces]);

    return (
        <div className="trace-selector-container">

        </div>
    );
}
