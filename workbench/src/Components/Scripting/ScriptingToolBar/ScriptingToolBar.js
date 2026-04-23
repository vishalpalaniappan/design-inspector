import React, {useEffect, useRef, useState} from "react";

import PropTypes from "prop-types";
import {Floppy, Play} from "react-bootstrap-icons";

import {useInitialWorldState} from "../../../Store/scriptingSlice/useScriptingSelection";
import {usePrimitives} from "../../../Store/scriptingSlice/useScriptingSelection";
import {useExpectedPostWorldState} from "../../../Store/scriptingSlice/useScriptingSelection";

InitialWorldStateEditor.propTypes = {
    close: PropTypes.func.isRequired,
    args: PropTypes.object.isRequired,
};

/**
 * Initial World State Editor modal body component.
 * @return {JSX.Element}
 */
export function ScriptingToolBar () {
    const initialWorldState = useInitialWorldState();
    const expectedPostWorldState = useExpectedPostWorldState();
    const primitives = usePrimitives();
    const workerRef = useRef(null);
    const [result, setResult] = useState(null);

    const runTransformation = (e) => {
        // I decided that I would run transformations
        // in a worker for the current iteration.
        workerRef.current.postMessage({
            type: "RUN_TRANSFORMATION",
            payload: {
                initialWorldState,
                expectedPostWorldState,
                primitives,
            },
        });
    };


    useEffect(() => {
        workerRef.current = new Worker(
            new URL("./ScriptingWorker.js", import.meta.url),
            {type: "module"}
        );

        workerRef.current.onmessage = (event) => {
            setResult(event.data);
        };

        return () => {
            workerRef.current.terminate();
        };
    }, []);

    return (
        // eslint-disable-next-line max-len
        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            paddingLeft: "10px",
            gap: "10px",
            color: "white",
            alignItems: "center"}}>
            <span>Compute Transformations</span>
            <Play
                size={20}
                style={{"color": "green", "cursor": "pointer"}}
                onClick={runTransformation} />
        </div>
    );
}
