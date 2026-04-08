import React from "react";

import {Provider} from "react-redux";
import {LayoutEventProvider} from "ui-layout-manager-dev";

import {LandingPage} from "./Components/LandingPage/LandingPage";
import GlobalProviders from "./Providers/GlobalProviders";
import {store} from "./Store/store";

import "./App.scss";

/**
 * Renders the application.
 *
 * @return {JSX.Element}
 */
export function App () {
    return (
        <Provider store={store}>
            <LayoutEventProvider>
                <GlobalProviders>
                    <div className="app-container">
                        <LandingPage />
                    </div>
                </GlobalProviders>
            </LayoutEventProvider>
        </Provider>
    );
}
