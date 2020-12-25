import * as types from '../constants/types';
import { USER_INFO } from '../constants/store';
import store from '../service/store';

const INITIAL_STATE = store.get(USER_INFO) || {};

export default function user(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_USER_INFO:
            return {
                ...state,
                ...action.data,
            };
        case types.CLEAR_USER_INFO:
            return {};
        default:
            return state;
    }
}
