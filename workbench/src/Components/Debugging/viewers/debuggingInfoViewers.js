import React, {useCallback, useEffect, useRef, useState} from "react";

import Editor from "@monaco-editor/react";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

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
    const selectedTraceId = useSelectedTraceId();
    const editorRef = useRef(null);
    const [ready, setReady] = useState(false);

    const handleEditorMount = useCallback((editor, monaco) => {
        editorRef.current = editor;
        editor.onDidChangeModelContent((e) => {
            const value = editor.getValue();
        });
        editorRef.current.setValue('{"val": "Test value"}');
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
