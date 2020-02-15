import * as actionType from './actionTypes';
import axios from 'axios'; 

export const authStart = ()=>{
    return {
        type:actionType.AUTH_START
    }
}
export const authSuccess = (idToken,localId)=>{
    return {
        type:actionType.AUTH_SUCCESS,
        idToken,
        localId
    } 
}
export const authFail = (error)=>{
    return {
        type:actionType.AUTH_FAIL,
        error:error
    }
}
export const logout = ()=>{
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type:actionType.AUTH_LOGOUT_INITIATE
    }
}
export const authLogoutSuccedd = () =>{
    return {
        type:actionType.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expiresIn)=>{
    // return dispatch =>{
    //     setTimeout(()=>{
    //         dispatch(logout())
    //     },expiresIn*1000)
    // }
    return {
        type:actionType.AUTH_CHECK_TIMEOUT,
        expirationTime:expiresIn
    }
}
export const auth = (email,password,isSignup)=>{
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email:email,
            password:password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_XGJVSzlCPkJ2bJgYV7U24ApAnKJYEug';
        if(!isSignup){
            url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_XGJVSzlCPkJ2bJgYV7U24ApAnKJYEug'
        }
        axios.post(url,authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime()+response.data.expiresIn*1000);
                localStorage.setItem('token',response.data.idToken)
                localStorage.setItem('expirationDate',expirationDate)
                localStorage.setItem('userId',response.data.localId)
                dispatch(authSuccess(response.data.idToken,response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const setRedirectPath = (path)=>{
    return {
        type:actionType.SET_AUTH_REDIRECT_PATH,
        path
    }
}

export const checkAuthState = ()=>{
    return dispatch =>{
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate<=new Date()){
                dispatch(logout())
            } else{
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token,userId))
                dispatch(checkAuthTimeout((expirationDate.getTime()-new Date().getTime())/1000))
            }
        }
    }
}