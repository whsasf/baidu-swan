import { GET_CASE } from '../constants/types';
import { DATA_BASE_URL } from '../constants/urls';
import request from '../service/request';

export function getCase() {
    return async dispatch => {
        try {
            const url = `${DATA_BASE_URL}mock/user/example.json`;
            const data = (await request({ url })).data;
            dispatch({ type: GET_CASE, data });
        } catch (e) {
            console.log(e);
        }
    };
}
