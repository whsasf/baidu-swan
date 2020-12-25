import { GET_ARTICLE } from '../constants/types';
import request from '../service/request';
import { DATA_BASE_URL } from '../constants/urls';
// import { utils } from '../service/global';
// import data from '../data/article';

export function getArticles(page = 1, type) {
    return async dispatch => {
        try {
            // const lock = await utils.lockversion();
            const url = `${DATA_BASE_URL}mock/taoyuan/v1-0-1/article/${type}/article-list/${page}.json`;
            const data = (await request({ url })).data;
            if (Object.prototype.toString.call(data).indexOf('Array') > -1 && data.length) {
                dispatch({ type: GET_ARTICLE, data, page });
            }
        } catch (e) {
            console.log('is error', e);
        }
    };
}
