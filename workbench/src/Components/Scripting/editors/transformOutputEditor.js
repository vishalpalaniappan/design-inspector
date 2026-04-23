import React, {useEffect, useState} from "react";

import Editor from "@monaco-editor/react";
import PropTypes from "prop-types";

TransformOutputEditor.propTypes = {
    close: PropTypes.func.isRequired,
    args: PropTypes.object.isRequired,
};

/**
 * Transform Output Editor modal body component.
 * @return {JSX.Element}
 */
export function TransformOutputEditor ({close, args}) {
    const [content, setContent] = useState("");

    const handleEditorMount = (editor, monaco) => {
    };

    useEffect(() => {
        const handleKeyDown = (event) => (event.key === "Escape") && close();
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [close]);

    return (
        <div style={{width: "100%", height: "100%"}}>
            <Editor
                defaultLanguage="json"
                defaultValue=""
                value={content}
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
