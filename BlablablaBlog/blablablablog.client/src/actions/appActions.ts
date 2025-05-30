import { AppState } from '../types/types'

export const APP_SET_FEED = 'APP_SET_FEED'
export const APP_SET_POSTEDIT = 'APP_SET_POSTEDIT'

export function handleShowFeed(postId?: string) {
    return function (dispatch) {
        dispatch({
            type: APP_SET_FEED,
            payload: {
                postId: postId,
                appState: AppState.APP_SHOW_FEED,                
            },
        })
    }
}

export function handleShowPostEdit(postId: string) {
    return function (dispatch) {
        dispatch({
            type: APP_SET_POSTEDIT,
            payload: {
                postId: postId,
                appState: AppState.APP_SHOW_EDIT,
            }
        })
    }
}
