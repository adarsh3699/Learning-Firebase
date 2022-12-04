import React, { Suspense, lazy } from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

const LoginPage = lazy(() => import('./LoginPage'));
const Learning = lazy(() => import('./Learning'));

function Routes() {
    return (
        <Suspense
            fallback={
                <>
                    <div id="loadingScreen">
                        Loading
                        <div id="loadingIcon">
                            <div className="lds-spinner">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </>
            }
        >
            <Switch>
                <Route exact path="/" element={<Learning />} />
                <Route exact path="/login" element={<LoginPage />} />

                <Route
                    path="*"
                    element={
                        <center>
                            <h1>Page not Found</h1>
                        </center>
                    }
                />
            </Switch>
        </Suspense>
    );
}

export default Routes;
