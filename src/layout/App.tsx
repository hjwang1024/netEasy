import React, { FC, ReactElement, Suspense } from 'react';
import './style.scss';
import 'antd/dist/antd.css';
import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import routes from '../router';
import store from '../store';
import { persistor } from '../store';
import { PersistGate } from 'redux-persist/integration/react';

const App: FC = (): ReactElement => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <HashRouter>
                    <Suspense fallback={null}>{renderRoutes(routes)}</Suspense>
                </HashRouter>
            </PersistGate>
        </Provider>
    );
};

export default App;
