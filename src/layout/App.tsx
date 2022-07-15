import React, { FC, ReactElement, Suspense } from 'react';
import './style.scss';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import store from '../store';

import routes from '../router';

const App: FC = (): ReactElement => {
    // console.log(routes);

    return (
        <Provider store={store}>
            <HashRouter>
                <Suspense fallback={null}>{renderRoutes(routes)}</Suspense>
            </HashRouter>
        </Provider>
    );
};

export default App;
