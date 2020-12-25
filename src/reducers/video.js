import * as types from '../constants/types';

const INITIAL_STATE = {
    hot: [],
    design: [],
    promote: [],
    activities: [],
    cases: [],
};

export default function videos(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_VIDEOS:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
}
