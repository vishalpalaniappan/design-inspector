import React, {useCallback} from "react";

import {BoxArrowLeft, Download} from "react-bootstrap-icons";

import { useDalEngine } from "../../Providers/GlobalProviders";

import "./SideBarMenu.scss";

/**
 * Side bar menu of app.
 * @return {JSX.Element}
 */
export function SideBarMenu () {
    const {engine} = useDalEngine();

    const returnToMenu = () => {
        window.location.href = "/";
    };

    const downloadDesign = useCallback(() => {
        const engineSerialized = engine.serialize();
        const blob = new Blob([engineSerialized], {type: "application/x-dal+json"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        console.log(engine);
        const fileName = engine._name.toLowerCase().replace(/\s+/g, "_");;
        link.download = fileName.endsWith(".dal") ? fileName : `${fileName}.dal`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [engine]);

    return (
        <div className="side-bar">
            <div className="top"></div>
            <div className="bottom">
                <Download
                    title="Download"
                    onClick={downloadDesign}
                    size={20}
                    className="icon"
                />
                <BoxArrowLeft
                    title="Return to Design Menu"
                    onClick={returnToMenu}
                    size={20}
                    className="icon"
                />
            </div>
        </div>
    );
}
