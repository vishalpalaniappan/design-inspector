/* eslint-disable max-len */
import React, {useCallback, useEffect, useRef, useState} from "react";

import PropTypes from "prop-types";
import {Floppy, Play} from "react-bootstrap-icons";

import "./DebuggingToolBar.scss";

DebuggingToolBar.propTypes = {
    close: PropTypes.func.isRequired,
    args: PropTypes.object.isRequired,
};

/**
 * Debugging Tool Bar component.
 * @return {JSX.Element}
 */
export function DebuggingToolBar () {
    return (
        // eslint-disable-next-line max-len
        <div className="debuggingToolBar">
            <div className="debuggingToolBarLeft">
                <div className="debuggingToolBarGroup">
                    <span className="debuggingToolBarLabel">Source:</span>
                    <select >
                        <option key={"semantic"} value={"semantic"}>Semantic Model</option>
                        <option key={"implementation"} value={"implementation"}>Implementation</option>
                    </select>
                </div>
                <div className="debuggingToolBarGroup">
                    <span className="debuggingToolBarLabel">Select Trace:</span>
                    <select >
                        <option key={"sample1"} value={"sample1"}>Sample Trace 1</option>
                    </select>
                </div>
            </div>
            <div className="debuggingToolBarRight"></div>
        </div>
    );
}
