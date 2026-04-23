// scripting slice thunk
import {useSelectedBehavior} from "../appSlice/useAppSelection";
import {setScript} from "./scriptingSlice";
import {incrementScriptingCounter} from "./scriptingSlice";


export const setScriptContent = (scriptType, content) => (dispatch) => {
    // Do some validation here and throw errror as needed.
    dispatch(setScript({scriptType, content}));
};

export const updateTransformationTest = (type, value) => (dispatch, getState, {engine}) => {
    const selectedBehavior = useSelectedBehavior();
    if (!selectedBehavior) {
        console.warn("No behavior selected, cannot update transformation test.");
        return;
    };
    const transformationTest = selectedBehavior.getTransformationTests();

    if (transformationTest.length === 0) {
        console.warn("No transformation test found for selected behavior, cannot update.");
        return;
    }

    const test = transformationTest[0];
    switch (type) {
        case "initialWorldState":
            test.setInitialWorldState(value);
            break;
        case "expectedPostWorldState":
            test.setExpectedPostWorldState(value);
            break;
        case "initialArgs":
            test.setInitialArgs(value);
            break;
        default:
            console.warn(`Unknown transformation test field: ${type}`);
    }

    dispatch(incrementScriptingCounter());
};

