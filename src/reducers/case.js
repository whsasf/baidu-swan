import * as types from '../constants/types';

const INITIAL_STATE = [];

export default function cases(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_CASE:
            return [...action.data];
        default:
            return state;
    }
}
