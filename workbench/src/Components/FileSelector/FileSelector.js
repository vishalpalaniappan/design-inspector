import React, {useCallback, useEffect, useRef, useState} from "react";

import {Floppy, PlusSquare, Trash} from "react-bootstrap-icons";
import {useDispatch} from "react-redux";
import {FileBrowser} from "sample-ui-component-library";
import {useLayoutEventPublisher} from "ui-layout-manager-dev";
import {useModalManager} from "ui-layout-manager-dev";

import {useDalEngine} from "../../Providers/GlobalProviders";
import {incrementCounter, setActiveTab, setTabs} from "../../Store/appSlice";
import {useEngineFiles} from "../../Store/useAppSelection";
import {AddFile} from "../Modals/AddFile";

import "./FileSelector.scss";

FileSelector.propTypes = {
};

/**
 * Component to select files from the workspace.
 * @return {JSX.Element}
 */
export function FileSelector () {
    const {engine} = useDalEngine();
    const {openModal} = useModalManager();
    const [selectedFile, setSelectedFile] = useState(null);

    const files = useEngineFiles();
    const dispatch = useDispatch();
    const fileBrowserRef = useRef();
    const publish = useLayoutEventPublisher();

    useEffect(() => {
        if (files) {
            fileBrowserRef.current.addFileTree(files);
            // const selected = (!selectedFile && files.length > 0)?files[0]:selectedFile;
            // fileBrowserRef.current.selectNode(selected);
        }
    }, [files, selectedFile]);

    const onSelectFile = useCallback((node) => {
        console.log("File selected:", node.name);
        dispatch(setActiveTab(node.uid));
        setSelectedFile(node);
    }, []);

    const createFile = useCallback(() => {
        openModal({
            title: "Add File",
            render: ({close}) => {return <AddFile close={close} />;},
        });
    }, []);

    const deleteFile = useCallback(() => {
        if (selectedFile) {
            try {
                const index = files.findIndex((file) => file.path === selectedFile.path);
                if (index > 0) {
                    setSelectedFile(files[index - 1]);
                }
                engine.removeFile(selectedFile.path);
                dispatch(incrementCounter());
            } catch (err) {
                console.error(err);
            }
        }
    }, [engine, files, fileBrowserRef, selectedFile, dispatch]);

    const saveFiles = useCallback(() => {
        if (engine) {
            engine.save();
            publish({
                type: "status:set",
                payload: "Saving design...",
                source: "tool-bar",
            });
        }
    }, [engine, publish]);

    return (
        <div className="filebrowser-container">
            <div className="browser-container">
                <FileBrowser ref={fileBrowserRef} onSelectFile={onSelectFile}/>
            </div>
            <div className="menu">
                <Floppy onClick={saveFiles} className="icon"/>
                <PlusSquare onClick={createFile} className="icon"/>
                <Trash onClick={deleteFile} className="icon"/>
            </div>
        </div>
    );
}
