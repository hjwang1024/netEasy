import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import globalReducer, { IGlobalState } from './reducer';
import playerReducer, { IPlayerState } from '@/components/Player/store/reducer';
import * as globalAction from './actions';
import storageSession from 'redux-persist/lib/storage/session';

export { globalAction };
export interface IStoreState {
    global: IGlobalState;
    player: IPlayerState;
}

const persistConfig = {
    key: 'root', // 必须有的
    storage: storageSession, // 缓存机制
    // blacklist: ['loginStatus'] reducer 里不持久化的数据,除此外均为持久化数据
    // whitelist: ['loginStatus'] // reducer 里持久化的数据,除此外均为不持久化数据
};
const reducers = combineReducers({
    global: globalReducer,
    player: playerReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

export default store;
