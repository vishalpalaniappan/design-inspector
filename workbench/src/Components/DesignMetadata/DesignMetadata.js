import React, {useContext, useEffect, useState} from "react";

import {FileBrowser} from "sample-ui-component-library";

import ServerContext from "../../Providers/ServerContext";
import Tree1 from "../../Tree1.json";

import "./DesignMetadata.scss";

DesignMetadata.propTypes = {
};

/**
 * Component to display the design metadata.
 * @return {JSX.Element}
 */
export function DesignMetadata () {
    const {workspace} = useContext(ServerContext);

    const [dirTree, setDirTree] = useState([]);

    useEffect(() => {
        if (workspace) {
            setDirTree(
                <FileBrowser key={"dirTree"} tree={workspace}/>
            );
        }
    }, [workspace]);


    return (
        <div style={{padding: "0 3px"}}>
            {dirTree}
        </div>
    );
}
