import React, {useCallback, useEffect, useRef, useState} from "react";

import Editor from "@monaco-editor/react";

import {useTransformOutputLog} from "../../../Store/scriptingSlice/useScriptingSelection";

TransformationOutputLogViewer.propTypes = {};

/**
 * Transformation output log viewer.
 * @return {JSX.Element}
 */
export function TransformationOutputLogViewer ({ }) {
    const transformOutputLog = useTransformOutputLog();
    const editorRef = useRef(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (editorRef.current && transformOutputLog && ready) {
            const logstr = transformOutputLog
                .map((entry) => {
                    const timestamp = new Date(entry.timestamp).toISOString();
                    return `[${timestamp}] ${entry.message}`;
                })
                .join("\n");
            editorRef.current.setValue(logstr);
        }
    }, [transformOutputLog, ready]);

    const handleBeforeMount = useCallback((monaco) => {
        monaco.languages.register({id: "logLang"});
        monaco.languages.setMonarchTokensProvider("logLang", {
            tokenizer: {
                root: [
                    [/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\]/, "timestamp"],
                    [/\b(INFO|DEBUG|WARN|ERROR|TRACE)\b/, "logLevel"],
                    [/\"([^"]+)\"\s*:/, "key"],
                    [/\"([^"]*)\"/, "string"],
                    [/\b\d+\b/, "number"],
                    [/[{}[\]]/, "delimiter"],
                    [/.+/, "text"],
                ],
            },
        });
        monaco.editor.defineTheme("logTheme", {
            base: "vs-dark",
            inherit: true,
            rules: [
                {token: "timestamp", foreground: "6A9FB5"},
                {token: "logLevel", foreground: "D16969", fontStyle: "bold"},
                {token: "key", foreground: "9CDCFE"},
                {token: "string", foreground: "CE9178"},
                {token: "number", foreground: "B5CEA8"},
                {token: "delimiter", foreground: "808080"},
                {token: "text", foreground: "AAB2BF"},
            ],
            colors: {
                "editor.foreground": "#d4d4d4",
                "editor.background": "#1e1e1e",
            },
        });
    }, []);

    const handleEditorMount = useCallback((editor, monaco) => {
        editorRef.current = editor;
        editor.onDidChangeModelContent((e) => { });
        setReady(true);
    }, [transformOutputLog]);

    return (
        <div style={{width: "100%", height: "100%"}}>
            <Editor
                defaultLanguage="logLang"
                theme="logTheme"
                defaultValue=""
                readOnly={true}
                onMount={handleEditorMount}
                beforeMount={handleBeforeMount}
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
