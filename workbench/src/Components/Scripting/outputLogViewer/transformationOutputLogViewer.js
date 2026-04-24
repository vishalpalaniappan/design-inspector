import React, {useCallback, useEffect, useRef, useState} from "react";

import Editor from "@monaco-editor/react";

import {useTransformOutputLog} from "../../../Store/scriptingSlice/useScriptingSelection";

TransformationOutputLogViewer.propTypes = {

};

/**
 * Transformation output viewer.
 * @return {JSX.Element}
 */
export function TransformationOutputLogViewer ({}) {
    const transformOutputLog = useTransformOutputLog();
    const editorRef = useRef(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (editorRef.current && transformOutputLog && ready) {
            const logstr = transformOutputLog.map((entry) => {
                const timestamp = new Date(entry.timestamp).toISOString();
                return `[${timestamp}] ${entry.message}`;
            }).join("\n");
            editorRef.current.setValue(logstr);
        }
    }, [transformOutputLog, ready]);

    const handleEditorMount = useCallback((editor, monaco) => {
        editorRef.current = editor;
        editor.onDidChangeModelContent((e) => {});
        setReady(true);
    }, [transformOutputLog]);

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
