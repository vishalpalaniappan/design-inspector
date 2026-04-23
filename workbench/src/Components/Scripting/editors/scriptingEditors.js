import React from "react";

import Editor from "@monaco-editor/react";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

import {setScript} from "../../../Store/scriptingSlice/scriptingSlice";

import "./scriptingEditors.scss";

ScriptingEditor.propTypes = {
    type: PropTypes.string.isRequired,
};

/**
 * Scripting editor.
 * @param {Object} props
 * @param {string} props.type - The type of script to edit
 * (e.g., "initialArgs", "initialWorldState", etc.).
 * @return {JSX.Element}
 */
function ScriptingEditor ({type}) {
    const dispatch = useDispatch();

    const handleEditorMount = (editor, monaco) => {
        editor.setValue("");
        editor.onDidChangeModelContent((e) => {
            const value = editor.getValue();
            dispatch(setScript({
                content: value,
                scriptType: type,
            }));
        });
    };

    return (
        <div style={{width: "100%", height: "100%"}}>
            <Editor
                defaultLanguage="json"
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


export const InitialArgsEditor = (props) => (
    <ScriptingEditor type="initialArgs" {...props} />
);
export const InitialWorldStateEditor = (props) => (
    <ScriptingEditor type="initialWorldState" {...props} />
);
export const PrimitivesEditor = (props) => (
    <ScriptingEditor type="primitives" {...props} />
);
export const ExpectedPostWorldStateEditor = (props) => (
    <ScriptingEditor type="expectedPostWorldState" {...props} />
);
export const TransformOutputEditor = (props) => (
    <ScriptingEditor type="transformOutput" {...props} />
);
