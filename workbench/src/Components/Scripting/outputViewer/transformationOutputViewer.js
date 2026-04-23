import React, {useCallback, useEffect, useRef} from "react";

import Editor from "@monaco-editor/react";

import {useTransformOutput} from "../../../Store/scriptingSlice/useScriptingSelection";

TransformationOutputViewer.propTypes = {

};

/**
 * Transformation output viewer.
 * @return {JSX.Element}
 */
export function TransformationOutputViewer ({}) {
    const transformOutput = useTransformOutput();
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && transformOutput) {
            editorRef.current.setValue(JSON.stringify(transformOutput, null, 2));
        }
    }, [transformOutput]);

    const handleEditorMount = useCallback((editor, monaco) => {
        editorRef.current = editor;
        editor.setValue(JSON.stringify(transformOutput, null, 2));
        editor.onDidChangeModelContent((e) => {});
    }, [transformOutput]);

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
