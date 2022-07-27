import React from 'react';
import * as actionTypes from './constants';
import { IMyMusic } from '@/apis/modules/types/business';
import * as ACTIONS from './constants';
import { getMusicUrl } from '~/play';

import produce from 'immer';
import {
    MODE,
    setPlayHistory,
    playHistory as playHistoryLocalStorage,
    playMode as playModeLocalStorage,
    playList as playListLocalStorage,
} from '~/play';
import { IAction } from './type';

export interface IState {
    musicId: number;
    musicUrl: string;
    music?: IMyMusic;
    playMode: MODE;
    showLyric: boolean;
}
export const initialState = {
    musicId: 0,
    musicUrl: '',
    playMode: playModeLocalStorage.getItem(),
    showLyric: false,
};

export default (state: IState, { type, payload }: IAction) => {
    switch (type) {
        case ACTIONS.PLAY: {
            if (!payload?.keepOrder) {
                setPlayHistory(payload?.music);
            }

            return {
                ...state,
                musicId: payload?.musicId,
                musicUrl: getMusicUrl(payload?.musicId),
                music: payload?.music,
            };
        }
        case ACTIONS.SET_PLAY_LIST: {
            const playList = payload?.playList || [];
            playListLocalStorage.setItem(playList);
            return state;
        }
        case ACTIONS.CLEAR_PLAY_LIST: {
            playListLocalStorage.removeItem();
            return state;
        }
        case ACTIONS.SET_PLAY_MODE: {
            playModeLocalStorage.setItem(payload?.playMode);

            return {
                ...state,
                playMode: payload?.playMode || MODE.PLAY_IN_ORDER,
            };
        }
        case ACTIONS.SHOW_LYRIC: {
            return {
                ...state,
                showLyric: true,
            };
        }
        case ACTIONS.HIDE_LYRIC: {
            return {
                ...state,
                showLyric: false,
            };
        }
        case ACTIONS.CLEAR_PLAY_HISTORY: {
            playHistoryLocalStorage.removeItem();
            return state;
        }
        default:
            return state;
    }
};
