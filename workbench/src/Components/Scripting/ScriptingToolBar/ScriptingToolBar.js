import React, {useEffect, useState} from "react";

import Editor from "@monaco-editor/react";
import PropTypes from "prop-types";
import {Play, Floppy} from "react-bootstrap-icons";

InitialWorldStateEditor.propTypes = {
    close: PropTypes.func.isRequired,
    args: PropTypes.object.isRequired,
};

/**
 * Initial World State Editor modal body component.
 * @return {JSX.Element}
 */
export function ScriptingToolBar () {
    return (
        // eslint-disable-next-line max-len
        <div style={{width: "100%", height: "100%", display: "flex", paddingLeft: "10px",gap: "10px", alignItems: "center"}}>
            <Floppy size={15} style={{"color": "grey"}}/>
            <Play size={20} style={{"color": "green"}}/>
        </div>
    );
}
