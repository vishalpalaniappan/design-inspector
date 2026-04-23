import React, {useEffect, useState} from "react";

import Editor from "@monaco-editor/react";
import PropTypes from "prop-types";

InitialArgsEditor.propTypes = {
    close: PropTypes.func.isRequired,
    args: PropTypes.object.isRequired,
};

/**
 * Initial Arguments Editor modal body component.
 * @return {JSX.Element}
 */
export function InitialArgsEditor ({close, args}) {
    const initial = {
        basket: [
            {name: "The Great Gatsby", genre: "Classic"},
        ],
    };
    const [content, setContent] = useState(JSON.stringify(initial, null, 2));

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
