import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

GlobalProviders.propTypes = {
    children: PropTypes.node,
};

/**
 * Provides all contexts consumed by the application.
 * @param {JSX} children
 * @return {JSX}
 */
function GlobalProviders ({children}) {
    return (
        <>
            {children}
        </>
    );
};

export default GlobalProviders;
