import {useMemo} from "react";

import {useSelector} from "react-redux";

import {checkIfStatamentIsMapped} from "../helpers/helper";
import {getMappedInfoFromAbstractionId} from "../helpers/helper";
import {useDalEngine} from "../Providers/GlobalProviders";
import {
    selectActiveTab,
    selectAppMode,
    selectCounter,
    selectLastSaved,
    selectSelectedAbstractionId,
    selectSelectedBehaviorId,
    selectSelectedGraphId,
    selectSelectedInvariantId,
    selectSelectedParticipantId,
    selectStatusMsg} from "./appSelectors";

/**
 * Returns the selected graph from the engine.
 * @return {Object}
 */
export const useSelectedGraph = () => {
    const {engine} = useDalEngine();
    const selectedGraphId = useSelector(selectSelectedGraphId);
    const counter = useSelector(selectCounter);

    return useMemo(() => {
        if (!selectedGraphId) return null;
        engine.selectGraph(selectedGraphId);
        return engine.graph;
    }, [engine, selectedGraphId, counter]);
};

/**
 * Returns the selected behavior from the engine.
 * @return {Object}
 */
export const useSelectedBehavior = () => {
    const {engine} = useDalEngine();
    const selectedBehaviorId = useSelector(selectSelectedBehaviorId);
    const counter = useSelector(selectCounter);

    return useMemo(() => {
        if (!selectedBehaviorId) return null;
        return engine.getNode(selectedBehaviorId).getBehavior();
    }, [engine, selectedBehaviorId, counter]);
};

/**
 * Returns the selected participant from the engine (given a behavior).
 * @return {Object}
 */
export const useSelectedParticipant = () => {
    const {engine} = useDalEngine();
    const selectedBehaviorId = useSelector(selectSelectedBehaviorId);
    const selectedParticipantId = useSelector(selectSelectedParticipantId);
    const counter = useSelector(selectCounter);

    return useMemo(() => {
        if (!selectedBehaviorId || !selectedParticipantId) return null;
        const behavior = engine.getNode(selectedBehaviorId).getBehavior();
        return behavior.getParticipant(selectedParticipantId);
    }, [engine, selectedBehaviorId, selectedParticipantId, counter]);
};

/**
 * Returns the selected invariant from engine (given a behavior and participant)
 * @return {Object}
 */
export const useSelectedInvariant = () => {
    const {engine} = useDalEngine();
    const selectedBehaviorId = useSelector(selectSelectedBehaviorId);
    const selectedParticipantId = useSelector(selectSelectedParticipantId);
    const selectedInvariantId = useSelector(selectSelectedInvariantId);
    const counter = useSelector(selectCounter);

    return useMemo(() => {
        if (!selectedBehaviorId || !selectedParticipantId || !selectedInvariantId) return null;
        const behavior = engine.getNode(selectedBehaviorId).getBehavior();
        const participant = behavior.getParticipant(selectedParticipantId);
        return participant.getInvariant(selectedInvariantId);
    }, [engine, selectedBehaviorId, selectedParticipantId, selectedInvariantId, counter]);
};

/**
 * Returns a list of graphs from the engine.
 * @return {Object}
 */
export const useGraphs = () => {
    const {engine} = useDalEngine();
    const graphId = useSelector(selectSelectedGraphId);
    const counter = useSelector(selectCounter);

    return useMemo(() => {
        return engine.graphs.getGraphNames();
    }, [engine, graphId, counter]);
};

/**
 * Returns a list of participants from the selected behavior.
 * @return {Object}
 */
export const useParticipants = () => {
    const {engine} = useDalEngine();
    const selectedBehaviorId = useSelector(selectSelectedBehaviorId);
    const counter = useSelector(selectCounter);

    return useMemo(() => {
        if (!selectedBehaviorId) return [];
        const behavior = engine.getNode(selectedBehaviorId).getBehavior();
        return behavior.getParticipants();
    }, [engine, selectedBehaviorId, counter]);
};

/**
 * Returns a list of invariants from the selected participant.
 * @return {Object} The list of invariants
 */
export const useInvariants = () => {
    const {engine} = useDalEngine();
    const selectedBehaviorId = useSelector(selectSelectedBehaviorId);
    const selectedParticipantId = useSelector(selectSelectedParticipantId);
    const counter = useSelector(selectCounter);

    return useMemo(() => {
        if (!selectedBehaviorId || !selectedParticipantId) return [];
        const behavior = engine.getNode(selectedBehaviorId).getBehavior();
        const participant = behavior.getParticipant(selectedParticipantId);
        return participant ? participant.getInvariants() : [];
    }, [engine, selectedBehaviorId, selectedParticipantId, counter]);
};

/**
 * Returns the selected abstraction id from the engine.
 * @return {Object} The selected abstraction id
 */
export const useSelectedAbstractionId = () => {
    const {engine} = useDalEngine();
    const selectedAbstractionId = useSelector(selectSelectedAbstractionId);
    const counter = useSelector(selectCounter);
    return useMemo(() => {
        // TODO: Implement logic to save the file name, line number
        // and abstraction id so that the editor will go to the
        // correct line.
        engine.getFiles().forEach((file) => {
            if (!file?.mapping) return;
            const mapping = file.mapping;
            mapping.forEach((entry) => {
                if (entry.uid === selectedAbstractionId) {
                }
            });
        });
        return selectedAbstractionId;
    }, [engine, selectedAbstractionId, counter]);
};


/**
 * Returns the selected behavior abstractions from the engine.
 * @return {Object} The selected behavior abstractions
 */
export const useSelectedBehaviorAbstractions = () => {
    const {engine} = useDalEngine();
    const selectedBehaviorId = useSelector(selectSelectedBehaviorId);

    /**
     * TODO: This entire function is overly complicated. This is because I am
     * implementing logic that should be in the engine here. I will refactor
     * this to make it much easier to understand.
     **/
    const counter = useSelector(selectCounter);
    return useMemo(() => {
        if (!selectedBehaviorId) return null;
        const selections = [];

        const behavior = engine.getNode(selectedBehaviorId)?.getBehavior();
        if (!behavior) return selections;

        const behaviorAbs = behavior._abstractionIds;
        if (!behaviorAbs) return selections;

        const files = engine.getFiles();
        behaviorAbs.forEach((abstractionId) => {
            const {entry, file} = getMappedInfoFromAbstractionId(files, abstractionId);
            if (entry) {
                const source = (Array.isArray(entry.source)) ? entry.source[0] : entry.source;
                selections.push({
                    type: "behavior",
                    uid: entry.uid,
                    source: source,
                    fileUid: file.uid,
                });
            }
        });

        const participants = behavior.getParticipants();
        participants.forEach((participant) => {
            const participantAbs = participant._abstractionId;
            if (!participantAbs) return;
            const {entry, file} = getMappedInfoFromAbstractionId(
                files, participantAbs.abstractionId
            );
            if (entry) {
                selections.push({
                    type: "participant",
                    uid: entry.uid,
                    participantName: participant.getName(),
                    variableName: participantAbs?.variableName,
                    fileUid: file.uid,
                });
            }
        });
        return selections;
    }, [engine, selectedBehaviorId, counter]);
};

/**
 * Returns a list of invariant types from the engine.
 * @return {Object}
 */
export const useInvariantTypes = () => {
    const {engine} = useDalEngine();

    return useMemo(() => {
        if (!engine) return [];
        return engine.invariant_types;
    }, [engine]);
};

/**
 * Returns the current status message.
 * @return {Object}
 */
export const useStatusMsg = () => {
    const statusMsg = useSelector(selectStatusMsg);

    return useMemo(() => {
        return statusMsg;
    }, [statusMsg]);
};

/**
 * Returns the last saved date time.
 * @return {Date} Last saved date
 */
export const useLastSaved = () => {
    const lastSaved = useSelector(selectLastSaved);

    return useMemo(() => {
        return lastSaved;
    }, [lastSaved]);
};

/**
 * Returns the app mode.
 * @return {Number} 1 for design mode, 2 for mapping mode
 */
export const useAppMode = () => {
    const appMode = useSelector(selectAppMode);

    return useMemo(() => {
        return appMode;
    }, [appMode]);
};


/**
 * Returns the currently active tab.
 * @return {Object}
 */
export const useActiveTab = () => {
    const activeTab = useSelector(selectActiveTab);

    return useMemo(() => {
        return activeTab;
    }, [activeTab]);
};

/**
 * Returns a list of engine files.
 * @return {Object}
 */
export const useEngineFiles = () => {
    const {engine} = useDalEngine();
    const counter = useSelector(selectCounter);
    const selectedBehaviorId = useSelector(selectSelectedBehaviorId);
    const activeTab = useSelector(selectActiveTab);

    return useMemo(() => {
        if (!engine) return null;
        return engine.getFiles();
    }, [engine, selectedBehaviorId, activeTab, counter]);
};
