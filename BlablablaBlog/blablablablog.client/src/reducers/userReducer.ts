import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/userActions'

const initialState = {    
    isFetching: false,
    profile: null,
    error: '',
    initialState: true,
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, isFetching: true, error: '', initialState:false }

        case LOGIN_SUCCESS:
            return { ...state, isFetching: false, profile: action.payload, error: '', initialState: false }

        case LOGIN_FAIL:
            return { ...state, isFetching: false, error: action.payload.message, initialState: false }

        case LOGOUT:
            return { ...state, isFetching: false, profile: null, error: '', initialState: false }

        default:
            return state
    }
}
