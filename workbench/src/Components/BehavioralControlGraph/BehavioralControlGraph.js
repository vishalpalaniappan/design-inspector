import React, {useCallback, useEffect, useRef, useState} from "react";

import {BehavioralGraphBuilder} from "sample-ui-component-library";
import {useLayoutEventSubscription} from "ui-layout-manager-dev";

import {useDalEngine} from "../../Providers/GlobalProviders";

import "./BehavioralControlGraph.scss";

BehavioralControlGraph.propTypes = {
};

let count = 0;

/**
 * Behavioral Control Graph Creator
 * @return {JSX.Element}
 */
export function BehavioralControlGraph () {
    const [activeTool, setActiveTool] = useState();
    const graphRef = useRef(null);

    const {engine} = useDalEngine();

    useEffect(() => {
        if (engine) {}
    }, [engine]);

    useLayoutEventSubscription("tool:selected", (event) => {
        setActiveTool(event.payload);
    });

    useLayoutEventSubscription("add:behavior", (event) => {
        console.log("Behavior submitted:", event.payload);
        if (graphRef.current) {
            console.log(engine);
            engine.addNode("behavior-" + count++ , []);
            graphRef.current.updateEngine(engine);
        }
    }, [engine]);

    const connectBehaviors = useCallback(
        (from, to) => {
            if (!to) return;
            engine.getNode(from.id).addGoToBehavior(to.id);
            graphRef.current.updateEngine(engine);
        },
        [graphRef, engine]
    );

    const deleteBehavior = useCallback(
        (node) => {
            engine.removeNode(node.id);
            graphRef.current.updateEngine(engine);
        },
        [engine, graphRef]
    );

    const deleteTransition = useCallback(
        (edge) => {
            const fromNode = engine.getNode(edge.from);
            fromNode.removeGoToBehavior(edge.to);
            graphRef.current.updateEngine(engine);
        },
        [engine, graphRef]
    );

    return (
        <div className="flow-wrapper">
            <BehavioralGraphBuilder
                ref={graphRef}
                connectBehaviors={connectBehaviors}
                deleteBehavior={deleteBehavior}
                deleteTransition={deleteTransition}
                activeTool={activeTool} />
        </div>
    );
}
