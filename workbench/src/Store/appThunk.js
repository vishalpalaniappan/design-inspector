// Store thunks here with engine to cleanly apply changes to the engine,
// update state and then make the relevant information available.

import {incrementCounter, setActiveTab} from "./appSlice";

export const deleteFileThunk = (engine, fileId) => (dispatch, getState) => {
    const files = engine.getFiles();
    const index = files.findIndex((file) => file.uid === fileId);
    let newUid = null;
    if (index === 0 && files.length > 1) {
        newUid = files[index + 1].uid;
    } else if (index > 0) {
        newUid = files[index - 1].uid;
    }
    engine.removeFile(fileId);
    dispatch(setActiveTab(newUid));
    dispatch(incrementCounter());
};

export const addFileThunk = (engine, fileName) => (dispatch, getState) => {
    const newFile = engine.addFile(fileName, fileName, "");
    dispatch(setActiveTab(newFile.uid));
    dispatch(incrementCounter());
};
