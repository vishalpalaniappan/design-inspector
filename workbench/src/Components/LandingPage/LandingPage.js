import React, {useCallback, useContext, useEffect, useState} from "react";

import {Plus, Trash} from "react-bootstrap-icons";

import splashScreen from "../../Assets/splash_screen.png";
import {useWorkspace} from "../../Providers/GlobalProviders";
import ServerContext from "../../Providers/ServerContext";

import "./LandingPage.scss";

/**
 * Landing page of the viewer component.
 * @return {JSX.Element}
 */
export function LandingPage () {
    const {workspace} = useWorkspace();
    const [designs, setDesigns] = useState([]);
    const [selectedDesign, setSelectedDesign] = useState(null);
    const {sendJsonMessage} = useContext(ServerContext);
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        if (workspace) {
            setDesigns(workspace.map((item) => {
                if (item.type === "file" && item.name.endsWith(".dal")) {
                    return item;
                }
                return null;
            }));
        }
    }, [workspace]);

    const newDesign = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("Creating new design:", fileName);
        sendJsonMessage({
            type: "create_design",
            payload: {
                "fileName": fileName.endsWith(".dal") ? fileName : fileName + ".dal",
            },
        });
        setFileName("");
    }, [fileName]);

    const deleteDesign = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("Deleting selected design...");
    }, []);


    const selectFile = (e, design) => {
        e.stopPropagation();
        setSelectedDesign(design);
    };
    return (
        <div className="landing-page">
            <div className="splash">
                <div className="left">
                    <img src={splashScreen} alt="Blueprint city" />
                </div>
                <div className="right">
                    <div className="title-container">
                        Design Workbench
                    </div>
                    <div className="create-design-row">
                        <span></span>
                        <input
                            className="file-name-input"
                            placeholder="Enter design name..."
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                        />
                        <div className="create-btn" onClick={newDesign}>
                            <span> + Create</span>
                        </div>
                    </div>
                    <div className="file-selector-container"
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
                            <span className="open-button">Open Design</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
