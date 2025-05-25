import {
    GET_FEED_REQUEST,
    GET_FEED_SUCCESS,
    GET_FEED_FAIL,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL,
} from '../actions/feedActions'


const initialState = {
    filter: null,
    posts: [],
    isFetching: false,
    error: '',
}

export function feedReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FEED_REQUEST:
            return { ...state, filter: action.payload, isFetching: true, error: '' }

        case GET_FEED_SUCCESS:
            return { ...state, posts: action.payload, isFetching: false, error: '' }

        case GET_FEED_FAIL:
            return { ...state, error: action.payload.message, isFetching: false }

        case DELETE_POST_SUCCESS:
            return { ...state, isFetching: false, error: '' }

        case DELETE_POST_FAIL:
            return { ...state, error: action.payload.message, isFetching: false }

        default:
            return state
    }
}
