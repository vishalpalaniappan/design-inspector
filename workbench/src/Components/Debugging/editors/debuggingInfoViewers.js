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

// These variables are for testing and will be removed soon.
const initialArgsValue = {
    "initialValue": {"name": "value"},
};

const initialWorldStateValue = {};

const expectedPostWorldStateValue = {
    "book": {"name": "value"},
    "book_name": "value",
};

export const InitialArgsEditor = (props) => (
    <DebuggingInfoViewer type="initialArgs" {...props} initial={initialArgsValue} />
);
export const InitialWorldStateEditor = (props) => (
    <DebuggingInfoViewer type="initialWorldState" {...props} initial={initialWorldStateValue} />
);

export const ExpectedPostWorldStateEditor = (props) => (
    // eslint-disable-next-line max-len
    <DebuggingInfoViewer type="expectedPostWorldState" {...props} initial={expectedPostWorldStateValue} />
);
export const TransformOutputEditor = (props) => (
    <DebuggingInfoViewer type="transformOutput" {...props} />
);
