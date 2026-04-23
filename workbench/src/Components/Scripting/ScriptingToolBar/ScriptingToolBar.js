import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";
import {Floppy, Play} from "react-bootstrap-icons";

import {useInitialWorldState} from "../../../Store/scriptingSlice/useScriptingSelection";
import {usePrimitives} from "../../../Store/scriptingSlice/useScriptingSelection";
import {useExpectedPostWorldState} from "../../../Store/scriptingSlice/useScriptingSelection";

InitialWorldStateEditor.propTypes = {
    close: PropTypes.func.isRequired,
    args: PropTypes.object.isRequired,
};

/**
 * Initial World State Editor modal body component.
 * @return {JSX.Element}
 */
export function ScriptingToolBar () {
    const initialWorldState = useInitialWorldState();
    const expectedPostWorldState = useExpectedPostWorldState();
    const primitives = usePrimitives();

    const runTransformation = (e) => {
        // I can run the transformation on the server
        // or I can create a worker and run it in the browser.
        // I will create a worker and run it in the browser.
    };

    return (
        // eslint-disable-next-line max-len
        <div style={{width: "100%", height: "100%", display: "flex", paddingLeft: "10px", gap: "10px", alignItems: "center"}}>
            <Floppy size={15} style={{"color": "grey"}}/>
            <Play size={20} style={{"color": "green"}} onClick={runTransformation}/>
        </div>
    );
}
