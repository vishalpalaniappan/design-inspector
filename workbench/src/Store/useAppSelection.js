import {useMemo} from "react";

import {useSelector} from "react-redux";

import {useDalEngine} from "../Providers/GlobalProviders";
import {
    selectSelectedBehaviorId,
    selectSelectedGraphId,
    selectSelectedParticipantId
} from "./appSelectors";

export const useSelectedGraph = () => {
    const {engine} = useDalEngine();
    const selectedGraphId = useSelector(selectSelectedGraphId);

    return useMemo(() => {
        if (!selectedGraphId) return null;
        engine.selectGraph(selectedGraphId);
        return engine.graph;
    }, [engine, selectedGraphId]);
};

export const useGraphs = () => {
    const {engine} = useDalEngine();

    return useMemo(() => {
        return engine.graphs.getGraphNames();
    }, [engine]);
};
