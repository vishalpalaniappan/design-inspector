import React, {useContext, useEffect, useState} from "react";

import PropTypes from "prop-types";

import {useDalEngine} from "../../Providers/GlobalProviders";
import WorkspaceContext from "../../Providers/WorkspaceContext";

import "./BehaviorInfo.scss";

BehaviorInfo.propTypes = {
    close: PropTypes.func.isRequired,
};

/**
 * Behavior Info component.
 * @return {JSX.Element}
 */
export function BehaviorInfo ({close}) {
    const {engine} = useDalEngine();
    const {selectedBehavior} = useContext(WorkspaceContext);

    const [node, setNode] = useState();

    useEffect(() => {
        if (selectedBehavior) {
            const selectedNode = engine.getNode(selectedBehavior);
            setNode(selectedNode);
        } else {
            setNode(null);
        }
    }, [engine, selectedBehavior]);

    return (
        <div className="behavior-info-container">
            <div className="title">Behavior:</div>
            {node && <div className="name">{node.getBehavior().name}</div>}
        </div>
    );
}
