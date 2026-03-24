import React, {useContext, useEffect, useRef} from "react";

import {FileBrowser} from "sample-ui-component-library";
import {useLayoutEventPublisher} from "ui-layout-manager-dev";

import ServerContext from "../../Providers/ServerContext";

import "./DesignMetadata.scss";

DesignMetadata.propTypes = {
};

/**
 * Component to display the design metadata.
 * @return {JSX.Element}
 */
export function DesignMetadata () {
    const {workspace} = useContext(ServerContext);

    const fileBrowserRef = useRef();
    const publish = useLayoutEventPublisher();

    useEffect(() => {
        if (workspace) {
            fileBrowserRef.current.addFileTree(workspace);
        }
    }, [workspace]);


    const onSelectFile = (node) => {
        publish({
            type: "file:selected",
            payload: node,
            source: "file-tree",
        });
    };


    return (
        <div className="filebrowser-container">
            <FileBrowser ref={fileBrowserRef} onSelectFile={onSelectFile}/>
        </div>
    );
}
