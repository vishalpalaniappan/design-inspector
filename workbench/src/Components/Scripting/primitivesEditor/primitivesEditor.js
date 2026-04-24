import React, {useCallback, useEffect, useRef, useState} from "react";

import Editor from "@monaco-editor/react";
import {useDispatch} from "react-redux";

import {updateScriptingPrimitiveThunk} from "../../../Store/scriptingSlice/scriptingThunk";
import {useSelectedBehavior} from "../../../Store/useAppSelection";

PrimitivesEditor.propTypes = {

};

/**
 * Primitives editor.
 * @return {JSX.Element}
 */
export function PrimitivesEditor ({}) {
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
        editorRef.current = editor;
        editor.onDidChangeModelContent((e) => {
            const value = editor.getValue();
            dispatch(updateScriptingPrimitiveThunk(value));
        });
        setIsReady(true);
    }, [behavior]);

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
