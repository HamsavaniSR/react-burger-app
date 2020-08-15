import * as actionTyes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type : actionTyes.AUTH_START
    };
}

export const authSuccess = (token,userId) => {
    return {
        type : actionTyes.AUTH_SUCCESS,
        idToken : token,
        userId : userId
    }
}

export const authFail = (error) => {
    return {
        type : actionTyes.AUTH_FAIL,
        error : error
    }
}

export const checkAuthTimeout = (expirationTime) =>{
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime*1000)
    };
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type : actionTyes.AUTH_LOGOUT
    }
}
export const auth = (email,password,isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        }
        console.log(isSignup)
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQVQkm01oH_K9llHysP45bBO8Xy3cfG04';
        if(!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQVQkm01oH_K9llHysP45bBO8Xy3cfG04';
        }
        axios.post(url,authData)
        .then( response =>{
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            console.log(response.data);
            localStorage.setItem('token' ,response.data.idToken);
            localStorage.setItem('expirationDate' ,expirationDate);
            localStorage.setItem('userId' ,response.data.localId);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        }

        )
        .catch(error=>{
            console.log(error);
            dispatch(authFail(error.response.data.error));
        })
    }
}

export const setAuthPathRedirect = (path) => {
    return {
        type : actionTyes.SET_AUTH_REDIRECT_PATH,
        path : path
    }
}

export const authCheckState = () =>{
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate')); // string to date

            if(expirationDate < new Date()) {
                dispatch(logout());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
            
        }
    }
}