import React, {useEffect, useState} from "react";

import Editor from "@monaco-editor/react";
import PropTypes from "prop-types";

PrimitivesEditor.propTypes = {
    close: PropTypes.func.isRequired,
    args: PropTypes.object.isRequired,
};

/**
 * Primitives Editor modal body component.
 * @return {JSX.Element}
 */
export function PrimitivesEditor ({close, args}) {
    const c = "create book\ngetFromPos basket 0 book\nremoveFromPos basket 0";
    const [content, setContent] = useState(c);

    const handleEditorMount = (editor, monaco) => {
        requestAnimationFrame(() => {
            editor.trigger("editor", "editor.foldLevel2");
        });
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
