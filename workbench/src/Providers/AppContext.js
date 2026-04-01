import React, {createContext, useContext, useMemo, useState} from "react";

import PropTypes from "prop-types";

const AppContext = createContext(null);

export const AppProvider = ({children}) => {
    const [selectedBehavior, setSelectedBehavior] = useState(null);
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [selectedInvariant, setSelectedInvariant] = useState(null);

    const app = useMemo(() => ({
        getBehavior: () => selectedBehavior,
        setBehavior: setSelectedBehavior,

        getParticipant: () => selectedParticipant,
        setParticipant: setSelectedParticipant,

        getInvariant: () => selectedInvariant,
        setInvariant: setSelectedInvariant,
    }), [selectedBehavior, selectedParticipant, selectedInvariant]);

    return (
        <AppContext.Provider value={app}>
            {children}
        </AppContext.Provider>
    );
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useApp = () => {
    const app = useContext(AppContext);
    if (!app) {
        throw new Error("useApp must be used within AppProvider");
    }
    return app;
};
