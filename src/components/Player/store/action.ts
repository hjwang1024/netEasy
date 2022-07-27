import {
    PLAY,
    SET_PLAY_LIST,
    CLEAR_PLAY_LIST,
    SET_PLAY_MODE,
    SHOW_LYRIC,
    HIDE_LYRIC,
    CLEAR_PLAY_HISTORY,
} from './constants';

export const changeCurrentPlay = (payload: IDictionary<any>) => ({
    type: PLAY,
    payload,
});

export const setPlayList = (payload: IDictionary<any>) => ({
    type: SET_PLAY_LIST,
    payload,
});
export const clearPlayList = (payload: IDictionary<any>) => ({
    type: CLEAR_PLAY_LIST,
    payload,
});
export const setPlayMode = (payload: IDictionary<any>) => ({
    type: SET_PLAY_MODE,
    payload,
});
export const showLyric = (payload: IDictionary<any>) => ({
    type: SHOW_LYRIC,
    payload,
});
export const hideLyric = (payload: IDictionary<any>) => ({
    type: HIDE_LYRIC,
    payload,
});
export const clearPlayHistory = (payload: IDictionary<any>) => ({
    type: CLEAR_PLAY_HISTORY,
    payload,
});
