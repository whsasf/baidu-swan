import { GET_VIDEOS } from '../constants/types';
import { DATA_BASE_URL } from '../constants/urls';
import request from '../service/request';

export function getVideos(type = 'hot') {
    return async dispatch => {
        try {
            const url = `${DATA_BASE_URL}mock/video/${type}.json`;
            const res = (await request({ url })).data;
            const data = {};
            data[decodeURI(type)] = res;
            dispatch({ type: GET_VIDEOS, data });
        } catch (e) {
            console.log(e);
        }
    };
}
