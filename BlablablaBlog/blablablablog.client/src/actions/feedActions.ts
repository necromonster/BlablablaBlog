import { FilterParams } from "../types/types";

export const GET_FEED_REQUEST = 'GET_FEED_REQUEST'
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS'
export const GET_FEED_FAIL = 'GET_FEED_FAIL'

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_FAIL = 'DELETE_POST_FAIL'

export function getFeed(filter: FilterParams) {

    return function (dispatch) {        
        dispatch({
            type: GET_FEED_REQUEST,
            payload: filter,
        })       

        const populateFeed = async () => {
            const response = await fetch('post/feed');
            if (response.status == 200) {
                const data = await response.json();
                dispatch({
                    type: GET_FEED_SUCCESS,
                    payload: data,
                })
            }
            else
                dispatch({
                    type: GET_FEED_FAIL,
                    error: true,
                    payload: new Error('Ошибка получения постов'),
                })
        };     
       
        populateFeed();        
    }
}
export function deletePost(postId: string, callback) {
    return function (dispatch) {
        const deletePost = async () => {
            const response = await fetch(`post/${postId}`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                dispatch({
                    type: DELETE_POST_SUCCESS,
                });
                //callback();
 
                //refToast.current?.show({ severity: 'success', summary: 'Сообщение', detail: 'Пост удален', life: 3000 });
                //changeAppState(AppState.FEED);
                //refPost.current?.remove();
            }
            else {
                dispatch({
                    type: DELETE_POST_FAIL,
                    error: true,
                    payload: new Error('Ошибка удаления поста!'),
                })
            }
        }
        deletePost();
    }
}