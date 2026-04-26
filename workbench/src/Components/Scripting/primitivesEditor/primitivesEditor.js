import React, { useCallback, useEffect, useRef, useState } from "react";

import Editor from "@monaco-editor/react";
import { useDispatch } from "react-redux";

import { updateScriptingPrimitiveThunk } from "../../../Store/scriptingSlice/scriptingThunk";
import { useSelectedBehavior } from "../../../Store/useAppSelection";

PrimitivesEditor.propTypes = {

};

/**
 * Primitives editor.
 *
 * TODO: Rename this to script editor, it contains transformation and validation
 * primitives and the proess has evolved since I created this.
 * @return {JSX.Element}
 */
export function PrimitivesEditor({ }) {
    const dispatch = useDispatch();
    const behavior = useSelectedBehavior();
    const editorRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (editorRef.current && behavior) {
            const primitives = behavior._primitives;
            const primitivesStr = primitives.join("\n");
            editorRef.current.setValue(primitivesStr);
        }
    }, [isReady, behavior]);

    const handleEditorMount = useCallback((editor, monaco) => {
        monaco.languages.register({ id: "behavioralLanguage" });
        monaco.languages.setMonarchTokensProvider("behavioralLanguage", {
            tokenizer: {
                root: [
                    [/^\s*#.*$/, "comment"], // line starting with #
                    [/\brequire\b/, "requireKeyword"],
                    [/\binvariant\b/, "invariantKeyword"],
                ],
            },
        });
        monaco.editor.defineTheme("behavioralLanguageTheme", {
            base: "vs-dark",
            inherit: true,
            rules: [
                {token: "comment", foreground: "6A9955"},// green
                {token: "requireKeyword", foreground: "569CD6"}, // blue
                {token: "invariantKeyword", foreground: "F44747"} // red
            ],
            colors: {},
        });
        monaco.editor.setModelLanguage(editor.getModel(), "behavioralLanguage");
        monaco.editor.setTheme("behavioralLanguageTheme");

        editorRef.current = editor;
        editor.onDidChangeModelContent((e) => {
            const value = editor.getValue();
            dispatch(updateScriptingPrimitiveThunk(value));
        });
        setIsReady(true);
    }, [behavior]);

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Editor
                defaultLanguage="json"
                defaultValue=""
                readOnly={true}
                onMount={handleEditorMount}
                options={{
                    minimap: { enabled: false },
                    lineNumbers: "off",
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                }}
            />
        </div>
    );
};
