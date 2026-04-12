import React, {useCallback, useEffect} from "react";

import {
    ArrowBarLeft,
    ArrowBarRight,
    ArrowCounterclockwise,
    ArrowLeftSquare,
    ArrowRightSquare,
    Floppy,
    PlayFill} from "react-bootstrap-icons";

/**
 * Toolbar Component
 * @return {JSX.Element}
 */
export function ToolBarDebugger () {
    return (
        <div className="toolbarWrapper">
            <div className="toolbarContainer">
                <PlayFill title="Play Forward" className="icon" />
                <ArrowBarRight title="Step Forward" className="icon" />
                <ArrowBarLeft title="Step Backward" className="icon" />
                <ArrowRightSquare title="Play Forward" className="icon" />
                <ArrowLeftSquare title="Play Backward" className="icon" />
                <ArrowCounterclockwise title="Restart" className="icon" />
            </div>
            <div className="toolbarContainer bottom">
                <PlayFill
                    size={20}
                    title="Run Design"
                    className="icon"
                />
                <Floppy
                    title="Save Graph"
                    className="icon"
                />
            </div>
        </div>
    );
}
