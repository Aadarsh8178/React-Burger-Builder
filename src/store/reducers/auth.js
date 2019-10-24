import * as actionType from '../actions/actionTypes';
import updateObject from '../utility';

const intitialState  = {
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath:"/"
}

const authStart = (state)=>{
    return updateObject(state,{error:null,loading:true});
}
const authFail = (state,action)=>{
    return updateObject(state,{error:action.error,loading:false});
}
const authSuccess = (state,action)=>{
    return updateObject(state,{
        token:action.idToken,
        userId:action.localId,
        loading:false,
        error:null
    });
}
const logout = (state)=>{
    return updateObject(state,{token:null,userId:null})
}

const setAuthRedirect = (state,action)=>{
    return updateObject(state,{authRedirectPath:action.path})
}

const Reducer = (state = intitialState,action)=>{
    switch(action.type){
        case (actionType.AUTH_START): return authStart(state);
        case (actionType.AUTH_FAIL): return authFail(state,action);
        case (actionType.AUTH_SUCCESS): return authSuccess(state,action);
        case (actionType.AUTH_LOGOUT): return logout(state);
        case (actionType.SET_AUTH_REDIRECT_PATH): return setAuthRedirect(state,action);
        default : return state;
    }
}

export default Reducer;