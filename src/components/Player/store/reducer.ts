import React from 'react';
import * as actionTypes from './constants';
import { IMusic, ISong } from '@/apis/modules/types/personalized';
import * as ACTIONS from './constants';
// import { getMusicUrl } from '~/play';

import produce from 'immer';
// import {
//     MODE,
//     setPlayHistory,
//     playHistory as playHistoryLocalStorage,
//     playMode as playModeLocalStorage,
//     playList as playListLocalStorage,
// } from '~/play';
import {
    SET_FULL_SCREEN,
    SET_PLAYING_STATUS,
    SET_CURRENT_INDEX,
    SET_CURRENT_SONG,
    SET_PLAY_LIST,
    SET_SHOW_PLAY_LIST,
    DELETE_SONG,
} from './constants';
// import { IAction } from './type';
export interface IPlayerAction {
    type: string;
    payload: any;
}
export interface IPlayerState {
    fullScreen: boolean;
    playingStatus: boolean;
    currentIndex: number;
    currentSong: ISong | null;
    playList: ISong[];
    showPlayList: boolean;
}

const initialState: IPlayerState = {
    fullScreen: false,
    playingStatus: false,
    currentIndex: -1,
    currentSong: null,
    playList: [],
    showPlayList: false,
};
// const initSta = {
//     fullScreen: false,
//     playingStatus: false,
//     currentIndex: 5,
//     currentSong: {
//         id: 25639239,
//         name: '你还好吗',
//         album: {
//             id: 2261202,
//             name: '不知道你喜不喜欢这样的我',
//             picUrl: 'http://p3.music.126.net/fJD_kWeWicQqBrr_nx-LAA==/577243604621712.jpg',
//             tns: [],
//             pic: 577243604621712,
//         },
//         singers: [
//             {
//                 id: 7590,
//                 name: '丁爽',
//                 tns: [],
//                 alias: [],
//             },
//         ],
//         dt: 244585,
//     },
//     playList: [
//         {
//             id: 1318234987,
//             name: '贝贝',
//             album: {
//                 id: 73914415,
//                 name: '耳朵',
//                 picUrl: 'http://p3.music.126.net/tt8xwK-ASC2iqXNUXYKoDQ==/109951163606377163.jpg',
//                 tns: [],
//                 pic_str: '109951163606377163',
//                 pic: 109951163606377170,
//             },
//             singers: [
//                 {
//                     id: 4292,
//                     name: '李荣浩',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 5398,
//         },
//         {
//             id: 65538,
//             name: '好久不见',
//             album: {
//                 id: 6434,
//                 name: '认了吧',
//                 picUrl: 'http://p4.music.126.net/o_OjL_NZNoeog9fIjBXAyw==/18782957139233959.jpg',
//                 tns: [],
//                 pic_str: '18782957139233959',
//                 pic: 18782957139233960,
//             },
//             singers: [
//                 {
//                     id: 2116,
//                     name: '陈奕迅',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 250493,
//         },
//         {
//             id: 1854142292,
//             name: '写你成歌',
//             album: {
//                 id: 129184167,
//                 name: '写你成歌',
//                 picUrl: 'http://p4.music.126.net/L0qDyMyzvX26uag1Fgge6A==/109951166096127557.jpg',
//                 tns: [],
//                 pic_str: '109951166096127557',
//                 pic: 109951166096127550,
//             },
//             singers: [
//                 {
//                     id: 33995829,
//                     name: '王雨桐',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 233142,
//         },
//         {
//             id: 487590176,
//             name: '你们很配',
//             album: {
//                 id: 35696053,
//                 name: '你们很配',
//                 picUrl: 'http://p3.music.126.net/04v1r-OtyYOnArqrUkpVLg==/19087521858403532.jpg',
//                 tns: [],
//                 pic_str: '19087521858403532',
//                 pic: 19087521858403532,
//             },
//             singers: [
//                 {
//                     id: 12492054,
//                     name: '沈佳玉',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 277104,
//         },
//         {
//             id: 1459261755,
//             name: '爱过的人',
//             album: {
//                 id: 91757784,
//                 name: '爱过的人',
//                 picUrl: 'http://p4.music.126.net/wFT7kHZeB3FMslLb1BefmA==/109951165100645127.jpg',
//                 tns: [],
//                 pic_str: '109951165100645127',
//                 pic: 109951165100645120,
//             },
//             singers: [
//                 {
//                     id: 9255,
//                     name: '任然',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 241523,
//         },
//         {
//             id: 25639239,
//             name: '你还好吗',
//             album: {
//                 id: 2261202,
//                 name: '不知道你喜不喜欢这样的我',
//                 picUrl: 'http://p3.music.126.net/fJD_kWeWicQqBrr_nx-LAA==/577243604621712.jpg',
//                 tns: [],
//                 pic: 577243604621712,
//             },
//             singers: [
//                 {
//                     id: 7590,
//                     name: '丁爽',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 244585,
//         },
//         {
//             id: 64312,
//             name: '等你爱我',
//             album: {
//                 id: 6355,
//                 name: 'Stranger Under My Skin',
//                 picUrl: 'http://p3.music.126.net/GGYQjJ-zDEivv9l6QgJUFg==/109951163020567917.jpg',
//                 tns: [],
//                 pic_str: '109951163020567917',
//                 pic: 109951163020567920,
//             },
//             singers: [
//                 {
//                     id: 2116,
//                     name: '陈奕迅',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 280000,
//         },
//         {
//             id: 150430,
//             name: '就是爱你',
//             album: {
//                 id: 15185,
//                 name: '太平盛世',
//                 picUrl: 'http://p3.music.126.net/ZR6QuByWgej9-aRhZjLqHw==/109951163803188844.jpg',
//                 tns: [],
//                 pic_str: '109951163803188844',
//                 pic: 109951163803188850,
//             },
//             singers: [
//                 {
//                     id: 5196,
//                     name: '陶喆',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 261000,
//         },
//         {
//             id: 189238,
//             name: '无能为力',
//             album: {
//                 id: 19139,
//                 name: '我的梦想我的路',
//                 picUrl: 'http://p3.music.126.net/S_GbA9N82QRb4iAKZL3W4A==/18897306346769213.jpg',
//                 tns: [],
//                 pic_str: '18897306346769213',
//                 pic: 18897306346769212,
//             },
//             singers: [
//                 {
//                     id: 6462,
//                     name: '张敬轩',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 263466,
//         },
//         {
//             id: 1406648887,
//             name: '一种原谅',
//             album: {
//                 id: 83770787,
//                 name: '失眠症候群',
//                 picUrl: 'http://p4.music.126.net/8DkTnzi7jdjWGYl4qbwLCg==/109951164517295956.jpg',
//                 tns: [],
//                 pic_str: '109951164517295956',
//                 pic: 109951164517295950,
//             },
//             singers: [
//                 {
//                     id: 31376161,
//                     name: '颜人中',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 276201,
//         },
//         {
//             id: 35440198,
//             name: '一直在等',
//             album: {
//                 id: 3317363,
//                 name: '一直在等',
//                 picUrl: 'http://p4.music.126.net/wtUxNcqYwGH1FVC2g3psZg==/3438172860860303.jpg',
//                 tns: [],
//                 pic: 3438172860860303,
//             },
//             singers: [
//                 {
//                     id: 7200,
//                     name: '本兮',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 253857,
//         },
//         {
//             id: 518895950,
//             name: '得不到你',
//             album: {
//                 id: 36811245,
//                 name: '得不到你',
//                 picUrl: 'http://p4.music.126.net/Na6jWO4H6-ptIA9GXVM5Pg==/109951163066716410.jpg',
//                 tns: [],
//                 pic_str: '109951163066716410',
//                 pic: 109951163066716420,
//             },
//             singers: [
//                 {
//                     id: 1160085,
//                     name: 'Fine乐团',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 467226,
//         },
//         {
//             id: 33497051,
//             name: '需要人陪',
//             album: {
//                 id: 3213252,
//                 name: '力宏二十 二十周年唯一精选',
//                 picUrl: 'http://p3.music.126.net/q5Pv7GVvFOdESkhWlJeF2w==/109951167389759296.jpg',
//                 tns: [],
//                 pic_str: '109951167389759296',
//                 pic: 109951167389759300,
//             },
//             singers: [
//                 {
//                     id: 5346,
//                     name: '王力宏',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 251160,
//         },
//         {
//             id: 208891,
//             name: 'Letting Go',
//             album: {
//                 id: 21250,
//                 name: '说到爱',
//                 picUrl: 'http://p3.music.126.net/VTZde5VdBm_u2WH0Pc9HQQ==/109951165561227373.jpg',
//                 tns: [],
//                 pic_str: '109951165561227373',
//                 pic: 109951165561227380,
//             },
//             singers: [
//                 {
//                     id: 7214,
//                     name: '蔡健雅',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 263453,
//         },
//         {
//             id: 488249475,
//             name: '哪里都是你',
//             album: {
//                 id: 35702116,
//                 name: '哪里都是你',
//                 picUrl: 'http://p3.music.126.net/lnOnBbP_H-052Hv5ls-QjA==/109951162964628408.jpg',
//                 tns: [],
//                 pic_str: '109951162964628408',
//                 pic: 109951162964628420,
//             },
//             singers: [
//                 {
//                     id: 1143033,
//                     name: '队长',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 222683,
//         },
//         {
//             id: 1827600686,
//             name: '还是会想你',
//             album: {
//                 id: 124309279,
//                 name: '还是会想你',
//                 picUrl: 'http://p3.music.126.net/9FhSEQtMhP-JP3_U84YfWQ==/109951165798773745.jpg',
//                 tns: [],
//                 pic_str: '109951165798773745',
//                 pic: 109951165798773740,
//             },
//             singers: [
//                 {
//                     id: 15199791,
//                     name: '林达浪',
//                     tns: [],
//                     alias: [],
//                 },
//                 {
//                     id: 12631485,
//                     name: 'h3R3',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 190063,
//         },
//         {
//             id: 1847975477,
//             name: '目及皆是你',
//             album: {
//                 id: 127968653,
//                 name: '目及皆是你',
//                 picUrl: 'http://p4.music.126.net/jDTEtAnZiDvfq5iBpLQBRA==/109951166171265193.jpg',
//                 tns: [],
//                 pic_str: '109951166171265193',
//                 pic: 109951166171265200,
//             },
//             singers: [
//                 {
//                     id: 46961650,
//                     name: '小蓝背心',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 231046,
//         },
//         {
//             id: 28111646,
//             name: '只是太爱你',
//             album: {
//                 id: 2732104,
//                 name: '是时候…',
//                 picUrl: 'http://p4.music.126.net/MbAMGidLob2YUEsw732PXw==/18815942488049510.jpg',
//                 tns: [],
//                 pic_str: '18815942488049510',
//                 pic: 18815942488049510,
//             },
//             singers: [
//                 {
//                     id: 6462,
//                     name: '张敬轩',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 254266,
//         },
//         {
//             id: 1374061036,
//             name: '这么久没见',
//             album: {
//                 id: 80003734,
//                 name: '尘',
//                 picUrl: 'http://p4.music.126.net/DHUrNjC-1d6Snpcfg20Umw==/109951164583315133.jpg',
//                 tns: [],
//                 pic_str: '109951164583315133',
//                 pic: 109951164583315140,
//             },
//             singers: [
//                 {
//                     id: 5781,
//                     name: '薛之谦',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 295427,
//         },
//         {
//             id: 481423070,
//             name: '你现在好吗',
//             album: {
//                 id: 35564238,
//                 name: '《茉莉花开》你现在好吗',
//                 picUrl: 'http://p4.music.126.net/JHGsyHlkfQwSim1YJ-rspw==/109951163857152011.jpg',
//                 tns: [],
//                 pic_str: '109951163857152011',
//                 pic: 109951163857152020,
//             },
//             singers: [
//                 {
//                     id: 10142,
//                     name: '玄觞',
//                     tns: [],
//                     alias: [],
//                 },
//             ],
//             dt: 274182,
//         },
//     ],
//     showPlayList: false,
// };
export default produce((state: IPlayerState, action: IPlayerAction) => {
    switch (action.type) {
        case SET_FULL_SCREEN:
            state.fullScreen = action.payload as boolean;
            break;
        case SET_PLAYING_STATUS:
            state.playingStatus = action.payload as boolean;
            break;
        case SET_CURRENT_INDEX:
            state.currentIndex = action.payload as number;
            break;
        case SET_CURRENT_SONG:
            console.log(action.payload);

            state.currentSong = action.payload as ISong;
            break;
        case SET_PLAY_LIST:
            state.playList = action.payload as ISong[];
            console.log(state.playList);

            break;
        case SET_SHOW_PLAY_LIST:
            state.showPlayList = action.payload as boolean;
            break;
        default:
            break;
    }
}, initialState);
