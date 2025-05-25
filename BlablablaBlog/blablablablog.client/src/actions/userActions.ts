export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGOUT = 'LOGOUT'

export function login(callback) {

    return function (dispatch) {

        dispatch({
            type: LOGIN_REQUEST,
        });        
        
        const populateRandomUser = async () => {
   
            const response = await fetch('user');
            if (response.status == 200) {
                const user = await response.json();

                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: user,
                })            
                callback()
            }
            else
                dispatch({
                    type: LOGIN_FAIL,
                    error: true,
                    payload: new Error('Ошибка авторизации'),
                })               
        }
     
        populateRandomUser();         
    }
}

export function logout(callback) {
    return function (dispatch) {
        dispatch({
            type: LOGOUT,
        })
        callback()
    }
    
}
