// scripting slice thunk
import {selectScriptingBehaviorId} from "./scriptingSelectors";
import {incrementScriptingCounter} from "./scriptingSlice";

export const updateTransformationTestThunk = (type, value) => (dispatch, getState, {engine}) => {
    const state = getState();
    const behaviorId = selectScriptingBehaviorId(state);
    const behavior = engine.getNode(behaviorId).getBehavior();
    const transformationTest = behavior.getTransformationTests();

    if (!transformationTest) {
        console.warn("No transformation test found for selected behavior, cannot update.");
        return;
    }

    const test = transformationTest[0];
    switch (type) {
        case "initialWorldState":
            test.initialWorldState = value;
            break;
        case "expectedPostWorldState":
            test.expectedPostWorldState = value;
            break;
        case "initialArgs":
            test.initialArgs = value;
            break;
        default:
            console.warn(`Unknown transformation test field: ${type}`);
    }

    dispatch(incrementScriptingCounter());
};


export const updateScriptingPrimitiveThunk = (value) => (dispatch, getState, {engine}) => {
    const state = getState();
    const behaviorId = selectScriptingBehaviorId(state);
    const behavior = engine.getNode(behaviorId).getBehavior();

    if (!behavior) {
        console.warn("No behavior found for selected behavior ID, cannot update primitives.");
        return;
    }

    const primitives = value.split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    behavior._primitives = primitives;

    dispatch(incrementScriptingCounter());
};
