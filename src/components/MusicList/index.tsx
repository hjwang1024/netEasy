import React from 'react';
import { Icon } from '@blueprintjs/core';
import cn from 'classnames';

import Table, { IColumn } from '@@/Table';
import VipIcon from '@@/VipIcon';
import { IMusic, IArtist, IAlbum, MUSIC_STATUS, MUSIC_TYPE } from '@/apis/modules/types/business';
import axios from '@/apis';
import { formatTime } from '@/utils/format';
import { createMusic } from '~/play';
import { IStoreState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '@@/Player/store';
import { ISong } from '@/apis/modules/types/personalized';

import styles from './style.module.scss';

interface IProps {
    data?: any[];
    onPlayAll?: (autoPlay?: boolean) => void;
}

const { useContext } = React;

const MusicList: React.FC<IProps> = ({ data, onPlayAll }) => {
    const {
        changeFullScreenAction,
        changePlayingStatusAction,
        changeShowPlayListAction,
        changeCurrentIndexAction,
        changeCurrentSongAction,
        deleteSongAction,
        changePlayListAction,
    } = actions;
    console.log(data);
    const { fullScreen, playingStatus, currentIndex, currentSong, showPlayList, playList } =
        useSelector((state: IStoreState) => ({
            fullScreen: state.player.fullScreen,
            playingStatus: state.player.playingStatus,
            currentIndex: state.player.currentIndex,
            currentSong: state.player.currentSong,
            showPlayList: state.player.showPlayList,
            playList: state.player.playList,
        }));
    const musicId = currentSong?.id;
    // const state = useContext(PlayMusicStateContext);
    // const dispatch = useContext(PlayMusicDispatchContext);
    // const audioInfo = useContext(AudioContext);
    const dispatch = useDispatch();

    const columns: IColumn<IMusic, keyof IMusic>[] = [
        {
            title: '',
            key: 'name',
            width: '80px',
            render: (name: string, record: IMusic, index?: number) => {
                return (
                    <div className={styles.operations}>
                        {musicId === record.id ? (
                            <span className={styles.isPlaying}>
                                <Icon
                                    icon={!playingStatus ? 'volume-off' : 'volume-up'}
                                    iconSize={14}
                                />
                            </span>
                        ) : (
                            <span className={styles.index}>{(index || 0) + 1}</span>
                        )}
                        <Icon icon='import' iconSize={14} />
                    </div>
                );
            },
        },
        {
            title: '音乐标题',
            key: 'name',
            width: '40%',
            render: (name: string, { alias, id, fee }: IMusic) => {
                return (
                    <>
                        <div className={cn(styles.name, musicId === id && styles.active)}>
                            <span>{name}</span>
                            {fee === MUSIC_TYPE.VIP && <VipIcon />}
                        </div>
                        {alias?.length ? (
                            <div className={styles.alias}>{alias.join(' ')}</div>
                        ) : null}
                    </>
                );
            },
        },
        {
            title: '歌手',
            key: 'singers',
            width: '20%',
            render: (artists: IArtist[]) => artists?.map(({ name }) => name).join(' / '),
        },
        {
            title: '专辑',
            key: 'album',
            width: '20%',
            render: (album: IAlbum) => album?.name,
        },
        {
            title: '时长',
            key: 'dt',
            width: '10%',
            render: (duration: number) => formatTime(duration),
        },
    ];

    const handleDoubleClick = async (item: IMusic, index: number) => {
        console.log(item);
        let { picUrl } = item.album;

        if (!picUrl) {
            const result = await axios.getAlbum(item.album.id);
            picUrl = result?.album.blurPicUrl;
        }

        dispatch(changeCurrentSongAction(item));
        dispatch(changeCurrentIndexAction(index));

        onPlayAll && onPlayAll();
    };

    const checkIsRecordRowDisabled = (record: IMusic) => record.status === MUSIC_STATUS.NOT_FOUND;

    return (
        <div>
            <Table<IMusic>
                columns={columns}
                data={data}
                onDoubleClick={handleDoubleClick}
                isRecordRowDisabled={checkIsRecordRowDisabled}
            />
        </div>
    );
};

export default MusicList;
