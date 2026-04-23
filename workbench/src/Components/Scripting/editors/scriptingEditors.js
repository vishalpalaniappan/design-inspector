import React from "react";

import Editor from "@monaco-editor/react";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

import {setScript} from "../../../Store/scriptingSlice/scriptingSlice";

import "./scriptingEditors.scss";

ScriptingEditor.propTypes = {
    type: PropTypes.string.isRequired,
    initial: PropTypes.object,
    isJson: PropTypes.bool,
};

/**
 * Scripting editor.
 * @param {Object} props
 * @param {string} props.type - The type of script to edit
 * (e.g., "initialArgs", "initialWorldState", etc.).
 * @param {Object} props.initial - The initial value of the script.
 * @param {boolean} props.isJson - Whether the content is JSON (default: true).
 * @return {JSX.Element}
 */
function ScriptingEditor ({type, initial, isJson = true}) {
    const dispatch = useDispatch();

    const handleEditorMount = (editor, monaco) => {
        const val = (!isJson) ? initial : JSON.stringify(initial, null, 2);
        editor.setValue(val || "");
        dispatch(setScript({
            content: val,
            scriptType: type,
        }));
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

// These variables are for testing and will be removed soon.
const initialArgsValue = {
    "initialValue": {"name": "value"},
};

const initialWorldStateValue = {};

const expectedPostWorldStateValue = {
    "book": {"name": "value"},
};
const primitivesInitial = `create book
create book_name
get book ["name"] book_name `;

export const InitialArgsEditor = (props) => (
    <ScriptingEditor type="initialArgs" {...props} initial={initialArgsValue} />
);
export const InitialWorldStateEditor = (props) => (
    <ScriptingEditor type="initialWorldState" {...props} initial={initialWorldStateValue} />
);
export const PrimitivesEditor = (props) => (
    <ScriptingEditor type="primitives" {...props} initial={primitivesInitial} isJson={false} />
);
export const ExpectedPostWorldStateEditor = (props) => (
    // eslint-disable-next-line max-len
    <ScriptingEditor type="expectedPostWorldState" {...props} initial={expectedPostWorldStateValue} />
);
export const TransformOutputEditor = (props) => (
    <ScriptingEditor type="transformOutput" {...props} />
);
