import {useMemo} from "react";

import {useSelector} from "react-redux";

import {useDalEngine} from "../../Providers/GlobalProviders";
import {useSelectedBehavior} from "../useAppSelection";
import {selectScripts, selectTransformOutput, selectTransformOutputLog} from "./scriptingSelectors";
import {selectScriptingCounter} from "./scriptingSelectors";

export const useScripts = () => {
    const scripts = useSelector(selectScripts);

    return useMemo(() => ({
        scripts,
    }), [scripts]);
};

export const useInitialWorldState = () => {
    const scripts = useSelector(selectScripts);
    return scripts.initialWorldState;
};

export const useExpectedPostWorldState = () => {
    const scripts = useSelector(selectScripts);
    return scripts.expectedPostWorldState;
};

export const usePrimitives = () => {
    const scripts = useSelector(selectScripts);
    return scripts.primitives;
};

export const useComputedPostWorldState = () => {
    const scripts = useSelector(selectScripts);
    return scripts.computedPostWorldState;
};

export const useTransformOutput = () => {
    const transformOutput = useSelector(selectTransformOutput);
    return transformOutput;
};

export const useTransformOutputLog = () => {
    const transformOutputLog = useSelector(selectTransformOutputLog);
    return transformOutputLog;
};

export const useScriptingBehaviors = () => {
    const {engine} = useDalEngine();

    return useMemo(() => {
        const behaviors = engine.graphs.getAllBehaviors();
        return {behaviors};
    }, [engine]);
};

export const useSelectedTransformationTest = () => {
    const selectedBehavior = useSelectedBehavior();
    const counter = useSelector(selectScriptingCounter);
    return useMemo(() => {
        if (!selectedBehavior) return null;
        // For now there will only be one test per behavior, so here
        // if there is no test case, I will create an empty one and return it.
        if (selectedBehavior.getTransformationTests().length === 0) {
            selectedBehavior.addTransformationTest({
                initialArgs: "asdf",
                initialWorldState: "asdf",
                expectedPostWorldState: "asdf",
            });
        }
        return selectedBehavior.getTransformationTests()[0];
    }, [selectedBehavior, counter]);
};
