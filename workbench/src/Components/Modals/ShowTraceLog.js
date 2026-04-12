import React, {useCallback, useEffect, useState} from "react";

import Editor from "@monaco-editor/react";
import clpFfiJsModuleInit from "clp-ffi-js";
import PropTypes from "prop-types";

ShowTraceLog.propTypes = {
    close: PropTypes.func.isRequired,
    args: PropTypes.object.isRequired,
};

/**
 * Show Trace Log modal body component.
 * @return {JSX.Element}
 */
export function ShowTraceLog ({close, args}) {
    const [content, setContent] = useState("");

    const handleEditorMount = useCallback((editor, monaco) => {
        setContent(args.trace);
    }, [args.trace]);

    useEffect(() => {
        const handleKeyDown = (event) => (event.key === "Escape") && close();
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [close]);

    return (
        <div style={{width: "800px", height: "600px"}}>
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
