import React from "react";

import Editor from "@monaco-editor/react";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

TransformationOutputViewer.propTypes = {

};

/**
 * Transformation output viewer.
 * @return {JSX.Element}
 */
export function TransformationOutputViewer({}) {
    const handleEditorMount = (editor, monaco) => {
        editor.setValue("");
        editor.onDidChangeModelContent((e) => {});
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
};
