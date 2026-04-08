import React, {useCallback, useContext, useEffect, useState} from "react";

import {ArrowRightSquare, Trash} from "react-bootstrap-icons";

import splashScreen from "../../../Assets/splash_screen.png";
import {useWorkspace} from "../../../Providers/GlobalProviders";
import ServerContext from "../../../Providers/ServerContext";

import "./LoadDesign.scss";

/**
 * Landing page of the viewer component.
 * @return {JSX.Element}
 */
export function LoadDesign () {
    const {workspace} = useWorkspace();
    const [designs, setDesigns] = useState([]);
    const [selectedDesign, setSelectedDesign] = useState(null);
    const [designContainer, setDesignContainer] = useState(null);
    const {sendJsonMessage, connectionStatus} = useContext(ServerContext);
    const [fileName, setFileName] = useState("");
    const [error, setErrror] = useState(null);

    // Helper function to send messages to server
    const sendMessage = useCallback((type, payload) => {
        sendJsonMessage({
            type: type,
            payload: payload,
        });
    }, [sendJsonMessage]);

    // Update designs when workspace changes and check design to load from URL
    useEffect(() => {
        if (workspace) {
            setDesigns(workspace.filter((item) =>
                item.type === "file" && item.name.endsWith(".dal")
            ));

            const params = new URLSearchParams(window.location.search);
            const designName = params.get("design");
            if (designName) {
                // Given http://localhost:3011/?design=test.dal
                // Load test.dal if it exists in the workspace
                const design = workspace.find((item) => item.name === designName);
                if (design) {
                    sendMessage("load_design", {"fileName": design.name});
                }
            }
        }
    }, [workspace, setSelectedDesign, sendMessage]);

    // Create design (workspace is updated after creation by server)
    const newDesign = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
        setErrror(null);
        if (!fileName) return;
        const fName = fileName.endsWith(".dal") ? fileName : fileName + ".dal";
        const fExists = designs.some((design) => design.name === fName);
        if (fExists) {
            setErrror(`Design named ${fName} already exists`);
            return;
        }
        sendMessage("create_design", {"fileName": fName});
        setFileName("");
    }, [fileName, sendMessage]);

    // Delete the design from server (workspace is updated after deletion)
    const deleteDesign = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!selectedDesign) return;
        sendMessage("delete_design", {"fileName": selectedDesign.name});
    }, [selectedDesign, sendMessage]);

    // Select file and load if flag is set (ex. double click)
    const selectFile = (e, design, load) => {
        e.stopPropagation();
        setSelectedDesign(design);
        if (load) {
            loadDesign();
        }
    };

    // Load selected design from server
    const loadDesign = useCallback(() => {
        if (!selectedDesign) return;
        sendMessage("load_design", {"fileName": selectedDesign.name});
    }, [selectedDesign, sendMessage]);

    useEffect(() => {
        console.log("Connection status:", connectionStatus);
    }, [connectionStatus]);

    const getDesignList = useCallback(() => {
        if (connectionStatus === "Connected" && designs.length > 0) {
            return <div className="files">
                {designs.map((design) => (
                    <div key={design.uid}
                        onClick={(e) => selectFile(e, design)}
                        onDoubleClick={(e) => selectFile(e, design, true)}
                        className="file"
                        style={design?.uid === selectedDesign?.uid ?
                            {backgroundColor: "#3a4a5c"} : {}}>
                        {design.name}
                    </div>
                ))}
            </div>;
        } else if (connectionStatus === "Connected" && designs.length === 0) {
            return <div className="no-designs">
                No designs found.
            </div>;
        } else {
            return <div className="no-connection">
                Not connected to server...
            </div>;
        }
    }, [connectionStatus, selectFile, designs]);

    return (
        <div className="landing-page">
            <div className="splash">
                <div className="left">
                    <img src={splashScreen} alt="Blueprint city" />
                </div>
                <div className="right">
                    <div className="title-container">Design Workbench</div>
                    <div className="create-design-row">
                        <input
                            className="file-name-input"
                            placeholder="Enter design name..."
                            value={fileName}
                            onKeyDown={(e) => (e.key === "Enter") && newDesign(e)}
                            onChange={(e) => setFileName(e.target.value)}
                        />
                        <div className="create-btn" onClick={newDesign}>+ Create</div>
                    </div>
                    <div
                        className="file-selector-container"
                        onClick={(e) => selectFile(e, null)}>
                        {getDesignList()}
                        
                    </div>
                    <div className="button-row">
                        <div className="buttons-left">
                            {error && <div className="error">{error}</div>}
                        </div>
                        <div className="buttons-right">
                            <div className="icon-btn">
                                <Trash size={16} onClick={deleteDesign} />
                            </div>
                            {
                                selectedDesign &&
                                <div className="icon-btn" onClick={loadDesign}>
                                    <ArrowRightSquare size={16} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
