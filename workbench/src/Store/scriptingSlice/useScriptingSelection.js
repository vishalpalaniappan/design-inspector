import {useMemo} from "react";

import {useSelector} from "react-redux";

import {selectScripts, selectTransformOutput, selectTransformOutputLog} from "./scriptingSelectors";

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
