import React, {useContext, useEffect, useRef, useState} from "react";

import {CircleFill} from "react-bootstrap-icons";
import {useDispatch} from "react-redux";

import ServerContext from "../../Providers/ServerContext";
import {setDebuggingMode} from "../../Store/appSlice";
import {setDesignMode} from "../../Store/appSlice";
import {useStatusMsg} from "../../Store/useAppSelection";
import {useAppMode} from "../../Store/useAppSelection";

import "./StatusBar.scss";

/**
 * Status bar of the viewer component.
 * @return {JSX.Element}
 */
export function StatusBar () {
    const {connectionStatus} = useContext(ServerContext);
    const timeoutRef = useRef(null);
    const appMode = useAppMode();
    const dispatch = useDispatch();

    const [connectionColor, setConnectionColor] = useState({color: "green"});
    const [message, setMessage] = useState("");
    const statusMsg = useStatusMsg();

    const STATUS_MSG_TIMEOUT = 3000;

    const connectionColorMap = {
        Connected: "green",
        Connecting: "yellow",
        Closed: "red",
        Closing: "red",
        Uninstantiated: "red",
    };

    useEffect(() => {
        setMessage(statusMsg);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setMessage("");
        }, STATUS_MSG_TIMEOUT);
    }, [statusMsg]);

    useEffect(() => {
        setConnectionColor({color: connectionColorMap[connectionStatus] || "red"});
    }, [connectionStatus]);

    const selectMode = (event) => {
        const value = parseInt(event.target.value);
        if (value === 1 && appMode !== 1) {
            console.log("Design mode selected");
            dispatch(setDesignMode());
        } else if (value === 2) {
            console.log("Debugging mode selected");
            dispatch(setDebuggingMode());
        }
    };

    return (
        <div className="status-bar">
            <div className="status-left">
                {message}
            </div>
            <div className="status-right">
                <div className="status-bar-select">
                    <select value={appMode} onChange={(event) => selectMode(event)}>
                        <option value={1}>Design</option>
                        <option value={2}>Debugging</option>
                    </select>
                </div>
                <CircleFill
                    className="connectionColor"
                    style={connectionColor} />{connectionStatus}
            </div>
        </div>
    );
}
