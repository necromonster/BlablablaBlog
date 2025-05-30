import { APP_SET_FEED, APP_SET_POSTEDIT } from '../actions/appActions';
import { AppState } from '../types/types'



const initialState = {
    postId: null,
    appState: AppState.APP_SHOW_FEED,   
}

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case APP_SET_FEED:
            return { ...state, postId: action.payload.postId, appState: action.payload.appState };
        case APP_SET_POSTEDIT:
            return { ...state, postId: action.payload.postId, appState: action.payload.appState };
        default:
            return state;
    }
}