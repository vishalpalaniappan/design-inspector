import React, {useCallback, useContext, useEffect, useState} from "react";

import {Trash} from "react-bootstrap-icons";

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

    const sendMessage = useCallback((type, payload) => {
        sendJsonMessage({
            type: type,
            payload: payload,
        });
    }, [sendJsonMessage]);

    useEffect(() => {
        if (workspace) {
            setDesigns(workspace.map((item) => {
                if (item.type === "file" && item.name.endsWith(".dal")) {
                    return item;
                }
                return null;
            }));

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
    }, [workspace, setSelectedDesign, loadDesign]);

    const newDesign = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!fileName) return;
        const fName = fileName.endsWith(".dal") ? fileName : fileName + ".dal";
        sendMessage("create_design", {"fileName": fName});
        setFileName("");
    }, [fileName]);

    const deleteDesign = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
        sendMessage("delete_design", {"fileName": selectedDesign.name});
    }, [selectedDesign]);

    const selectFile = (e, design) => {
        e.stopPropagation();
        setSelectedDesign(design);
    };

    const loadDesign = useCallback(() => {
        if (!selectedDesign) return;
        sendMessage("load_design", {"fileName": selectedDesign.name});
    }, [selectedDesign]);


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
                            <div className="icon-btn">
                                <Trash onClick={deleteDesign} />
                            </div>
                        </div>
                        <div className="buttons-right">
                            <span className="open-btn" onClick={loadDesign}>
                                Open Design
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
