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
    const {sendJsonMessage} = useContext(ServerContext);
    const [fileName, setFileName] = useState("");
    const [error, setErrror] = useState(null);

    const sendMessage = useCallback((type, payload) => {
        sendJsonMessage({
            type: type,
            payload: payload,
        });
    }, [sendJsonMessage]);

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

    const newDesign = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
        setErrror(null);
        if (!fileName) return;
        const fName = fileName.endsWith(".dal") ? fileName : fileName + ".dal";
        const exists = designs.some((design) => design.name === fName);
        if (exists) {
            setErrror(`Design named ${fName} already exists`);
            return;
        }
        sendMessage("create_design", {"fileName": fName});
        setFileName("");
    }, [fileName, sendMessage]);

    const deleteDesign = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!selectedDesign) return;
        sendMessage("delete_design", {"fileName": selectedDesign.name});
    }, [selectedDesign, sendMessage]);

    const selectFile = (e, design) => {
        e.stopPropagation();
        setSelectedDesign(design);
    };

    const loadDesign = useCallback(() => {
        if (!selectedDesign) return;
        sendMessage("load_design", {"fileName": selectedDesign.name});
    }, [selectedDesign, sendMessage]);

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
                            onChange={(e) => setFileName(e.target.value)}
                        />
                        <div className="create-btn" onClick={newDesign}>+ Create</div>
                    </div>
                    <div
                        className="file-selector-container"
                        onClick={(e) => selectFile(e, null)}>
                        <div className="files">
                            {designs.map((design) => (
                                <div key={design.uid}
                                    onClick={(e) => selectFile(e, design)}
                                    onDoubleClick={(e) => {selectFile(e, design);loadDesign()}}
                                    className="file"
                                    style={design?.uid === selectedDesign?.uid ?
                                        {backgroundColor: "#3a4a5c"} : {}}>
                                    {design.name}
                                </div>
                            ))}
                        </div>
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
