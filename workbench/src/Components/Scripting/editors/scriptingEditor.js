import React from "react";

import Editor from "@monaco-editor/react";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

import {setScript} from "../../../Store/scriptingSlice/scriptingSlice";

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
