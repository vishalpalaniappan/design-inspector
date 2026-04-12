import {createSlice} from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        activeTab: null,
        counter: 0,
        lastSaved: null,
        appMode: 1,
        designLoaded: false,
        hasEntryPoint: false,
        selectedBehavior: null,
        selectedParticipant: null,
        selectedGraph: null,
        selectedMapping: null,
        selectedInvariant: null,
        selectedTraceId: null,
        statusMsg: null,
        tabs: null,
    },
    reducers: {
        setSelectedBehavior(state, action) {
            // console.log("Setting selected behavior to:", action.payload);
            state.selectedParticipant = null;
            state.selectedInvariant = null;
            if (action.payload) {
                state.selectedBehavior = action.payload;
                state.appMode = 2;
            } else {
                state.selectedBehavior = null;
                state.appMode = 1;
            }
        },
        setSelectedParticipant(state, action) {
            // console.log("Setting selected participant to:", action.payload);
            state.selectedInvariant = null;
            state.selectedParticipant = action.payload;
        },
        setSelectedGraph(state, action) {
            // console.log("Setting selected graph to:", action.payload);
            state.selectedBehavior = null;
            state.selectedParticipant = null;
            state.selectedInvariant = null;
            state.selectedGraph = action.payload;
        },
        setSelectedInvariant(state, action) {
            // console.log("Setting selected invariant to:", action.payload);
            state.selectedInvariant = action.payload;
        },
        setActiveTab(state, action) {
            // console.log("Setting active tab to:", action.payload);
            state.activeTab = action.payload;
        },
        setStatusMsg(state, action) {
            state.statusMsg = action.payload;
        },
        setLastSaved(state, action) {
            state.lastSaved = action.payload;
        },
        incrementCounter(state) {
            state.counter = (state.counter + 1) % 100000;
        },
        setDesignMode (state) {
            state.appMode = 1;
        },
        setMappingMode (state) {
            state.appMode = 2;
        },
        setSelectedMapping (state, action) {
            state.selectedMapping = action.payload;
        },
        setDesignLoaded (state, action) {
            state.designLoaded = action.payload;
        },
        setHasEntryPoint (state, action) {
            state.hasEntryPoint = action.payload;
        },
        setSelectedTraceId (state, action) {
            state.selectedTraceId = action.payload;
        },
    },
});

export const {
    setSelectedBehavior,
    setSelectedParticipant,
    setActiveTab,
    setStatusMsg,
    setLastSaved,
    setMappingMode,
    setSelectedGraph,
    setSelectedInvariant,
    incrementCounter,
    setDesignMode,
    setSelectedMapping,
    setDesignLoaded,
    setHasEntryPoint,
    setSelectedTraceId,
} = appSlice.actions;

export default appSlice.reducer;
