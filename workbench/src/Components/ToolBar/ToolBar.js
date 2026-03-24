import React, {useContext, useEffect, useRef} from "react";

import {ArrowsMove, Crosshair, Cursor, NodePlus, PersonPlus, PinMap, ShieldPlus} from "react-bootstrap-icons";

import "./ToolBar.scss";

ToolBar.propTypes = {
};

/**
 * Toolbar Component
 * @return {JSX.Element}
 */
export function ToolBar () {
    return (
        <div className="toolbarWrapper">
            <div className="toolbarContainer">
                <Cursor title="Select Behavior" className="icon"/>
                <ArrowsMove title="Move Node" className="icon"/>
                <NodePlus title="Add Behavior" className="icon"/>
                <PersonPlus title="Add Participant" className="icon"/>
                <ShieldPlus title="Add Invariant" className="icon"/>
            </div>
            <div className="toolbarContainer bottom">
                <Crosshair title="Map Behavior" className="icon"/>
                <PinMap title="Map Participant" className="icon"/>
            </div>

        </div>
    );
}
