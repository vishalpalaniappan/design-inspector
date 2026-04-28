import React, {useCallback, useEffect, useRef, useState} from "react";

import Editor from "@monaco-editor/react";
import PropTypes from "prop-types";

import {useSelectedTraceEntryIndex} from "../../../Store/debuggingSlice/useDebuggingSelection";
import {useTraces} from "../../../Store/useAppSelection";
import {useSelectedTraceId} from "../../../Store/useAppSelection";

import "./debuggingInfoViewers.scss";

DebuggingInfoViewer.propTypes = {
    type: PropTypes.string.isRequired,
    initial: PropTypes.object,
    isJson: PropTypes.bool,
};

/**
 * Debugging info viewer.
 * @param {Object} props
 *
 * @return {JSX.Element}
 */
function DebuggingInfoViewer ({type, isJson = true}) {
    const selectedTraceEntryIndex = useSelectedTraceEntryIndex();
    const selectedTraceId = useSelectedTraceId();
    const traces = useTraces();
    const editorRef = useRef(null);
    const [ready, setReady] = useState(false);


    useEffect(() => {
        if (ready && selectedTraceId && traces) {
            const traceValues = Object.values(traces);
            const trace = traceValues.find((t) => t.uid === selectedTraceId);
            if (!trace) {
                console.warn(`Trace with id ${selectedTraceId} not found`);
                return;
            };
            if (type === "transformOutput") {
                // Transformation output is saved in the executableModelOutput
                // in the validation step of the transform section.
                const entry = trace.executableModelOutput[selectedTraceEntryIndex];
                if ("transform" in entry.output) {
                    const validate = entry.output.transform.find((v) => v.type === "validate");
                    const output = validate ? validate.transformationOutput : "";
                    editorRef.current.setValue(JSON.stringify(output, null, 2));
                }
            } else if (trace) {
                const entry = trace.debugger.processedTrace[selectedTraceEntryIndex];
                if (type in entry) {
                    const value = entry[type];
                    editorRef.current.setValue(
                        isJson ? JSON.stringify(value, null, 2) : String(value)
                    );
                }
            }
        }
    }, [selectedTraceId, ready, type, traces, selectedTraceEntryIndex]);

    const handleEditorMount = useCallback((editor, monaco) => {
        editorRef.current = editor;
        setReady(true);
    }, [type]);

    return (
        <div style={{width: "100%", height: "100%"}}>
            <Editor
                defaultLanguage={isJson ? "json" : "plaintext"}
                defaultValue=""
                theme="vs-dark"
                readOnly={true}
                onMount={handleEditorMount}
                options={{
                    minimap: {enabled: false},
                    lineNumbers: "off",
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                    readOnly: true,
                }}
            />
        </div>
    );
}

export const DebuggerBehaviorInitialArgs = (props) => (
    <DebuggingInfoViewer type="arguments" {...props} />
);
export const DebuggerBehaviorInitialWorldState = (props) => (
    <DebuggingInfoViewer type="preParticipants" {...props} />
);
export const DebuggerBehaviorExpectedPostWorldState = (props) => (
    // eslint-disable-next-line max-len
    <DebuggingInfoViewer type="postParticipants" {...props} />
);
export const DebuggerBehaviorTransformOutput = (props) => (
    <DebuggingInfoViewer type="transformOutput" {...props} />
);
