import { DEFAULT_VALUE, localStorageFactory } from './localStorage';
import { IMyMusic } from '@/apis/modules/types/business';

/**
 * 组装歌曲的url
 * @param id
 */
export const formatSongUrl = (id: number): string => {
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};

enum KEY {
    PLAY_HISTORY = '__playHistory',
    PLAY_LIST = '__playList',
    PLAY_MODE = '__playMode',
}

export const playHistory = localStorageFactory<IMyMusic[]>({
    key: KEY.PLAY_HISTORY,
    defaultValue: DEFAULT_VALUE.ARRAY,
});

export const setPlayHistory = (music: IMyMusic): IMyMusic[] => {
    const list = playHistory.getItem().slice(0, 100);
    const index = list.findIndex((item) => item.id === music.id);

    if (index > -1) {
        list.splice(index, 1);
    }

    list.unshift(music);
    playHistory.setItem(list);

    return list;
};

export const playList = localStorageFactory<IMyMusic[]>({
    key: KEY.PLAY_LIST,
    defaultValue: DEFAULT_VALUE.ARRAY,
});

export enum MODE {
    PLAY_IN_ORDER = 'PLAY_IN_ORDER',
    SINGLE_CYCLE = 'SINGLE_CYCLE',
    SHUFFLE_PLAYBACK = 'SHUFFLE_PLAYBACK',
}
export const playMode = localStorageFactory<MODE>({
    key: KEY.PLAY_MODE,
    defaultValue: MODE.PLAY_IN_ORDER,
    raw: true,
});
export const createMusic = ({
    id,
    name,
    artists,
    duration,
    picUrl,
    ...others
}: IMyMusic): IMyMusic => {
    return {
        id,
        name,
        artists,
        duration,
        picUrl,
        ...others,
    };
};
