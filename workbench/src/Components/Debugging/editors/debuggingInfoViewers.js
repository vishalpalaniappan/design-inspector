import React, {useCallback, useEffect, useRef, useState} from "react";

import Editor from "@monaco-editor/react";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

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
function DebuggingInfoViewer ({type, initial, isJson = true}) {
    const handleEditorMount = useCallback((editor, monaco) => {
        editorRef.current = editor;
        editor.onDidChangeModelContent((e) => {
            const value = editor.getValue();
        });
        setReady(true);
    }, [dispatch, type]);

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
    <DebuggingInfoViewer type="initialArgs" {...props} initial={initialArgsValue} />
);
export const DebuggerBehaviorInitialWorldState = (props) => (
    <DebuggingInfoViewer type="initialWorldState" {...props} initial={initialWorldStateValue} />
);

export const DebuggerBehaviorExpectedPostWorldState = (props) => (
    // eslint-disable-next-line max-len
    <DebuggingInfoViewer type="expectedPostWorldState" {...props} initial={expectedPostWorldStateValue} />
);
export const DebuggerBehaviorTransformOutput = (props) => (
    <DebuggingInfoViewer type="transformOutput" {...props} />
);
