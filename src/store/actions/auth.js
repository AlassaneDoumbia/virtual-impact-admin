import { setLoadingForm, set_roles} from "./index";
import { setSession, setLoadingAuthForm} from "./index";
import {clearState, getRequestMessage, customUnauthorizedAction} from "helpers/helperFunctions";
import {useSelector} from "react-redux";
import API from '../../helpers/api'
import Toast from "light-toast";
import i18n from "../../lang/i18n";
import _ from 'lodash'

const LOGIN = "LOGIN";
const SIGNUP = "SIGNUP";
const GOOGLE_SIGNUP = 'GOOGLE_SIGNUP';
const GOOGLE_LOGIN = 'GOOGLE_LOGIN';
const EMAIL_SIGNUP = 'EMAIL_SIGUP';
const EMAIL_LOGIN = 'EMAIL_LOGIN';
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'
const GET_ACCESS_TOKEN = 'GET_ACCESS_TOKEN'
const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN'
const GET_REFRESH_TOKEN = 'GET_REFRESH_TOKEN'
const SET_FORM_VALID = 'SET_FORM_VALID'
const GET_FORM_VALID = 'GET_FORM_VALID'
export const GET_USERS = 'GET_USERS';
export const SET_USERS = 'SET_USERS';
export const GET_USER = 'GET_USER';
export const SET_USER = 'SET_USER';
export const GET_ME = 'GET_ME';
export const SET_ME = 'SET_ME';

export const get_users = () => {
    return {
      type: GET_USERS
    }
}/** */
  
export const set_users = (users) => {
    return {
      type: SET_USERS,
      users: users
    }
}
export const get_user = () => {
    return {
      type: GET_USER
    }
}/** */
  
export const set_user = (user) => {
    return {
      type: SET_USER,
      user: user
    }
}
export const get_me = () => {
    return {
      type: GET_ME
    }
}/** */
  
export const set_me = (me) => {
    return {
      type: SET_ME,
      me: me
    }
}


export const getAccessToken = ()=>{
    return{
        type:GET_ACCESS_TOKEN,
    }
}
export const getFormValid = ()=>{
    return{
        type:GET_FORM_VALID,
    }
}

export const getRefreshToken = ()=>{
    return{
        type:GET_REFRESH_TOKEN
    }
}

export const setRefreshToken = (rToten)=>{
    return{
        type: SET_REFRESH_TOKEN,
        refreshToken: rToten
    }
}
export const setFormValid = (val)=>{
    return{
        type: SET_FORM_VALID,
        valid: val
    }
}

export const setAccessToken = (aToten)=>{
    return{
        type: SET_ACCESS_TOKEN,
        accessToken: aToten
    }
}


// création de compte avec Email et mot de passe
const setEmailSignup = (payload)=>{
    return function (dispatch){
        dispatch(setLoadingAuthForm(true))

        API.post('/v1/accounts/signup/form',JSON.stringify(payload)).then(res => {
            console.log(res.data)
            return dispatch(setLoadingAuthForm(false))
        }).catch(err=>{
            Toast.fail(err.response.data.code+": "+getRequestMessage((err.response&&err.response.status === 401) ), 4000);
            return dispatch(setLoadingAuthForm(false))
        })
    }
}

// création de compte 
const signup = (payload)=>{

    return async function (dispatch){
        dispatch(setLoadingAuthForm(true))
        dispatch(setFormValid(false)) 
        console.log("payload :::::: ",payload);
        // dispatch(setLoadingAuthForm(false))
        await API.post('/api/auth/signup',payload).then(res => {
            console.log(res);
            console.log(res.data);
            if(res.status === 200){
                Toast.success(i18n.t('admin.success.USER') , 3000)
            }
            // dispatch(setRefreshToken(res.data.refresh))
            // dispatch(setAccessToken(res.data.accessToken))
            // dispatch(setSession(res.data))
            dispatch(setLoadingAuthForm(false))
            dispatch(setFormValid(true)) 
        }).catch(err=>{
            console.log(err.message);
            !_.isUndefined(err.response&&err.response?.status === 401) ? 
                Toast.fail(getRequestMessage(401)+" : "+i18n.t('admin.error.TOKENEXPIRE'), 3000): Toast.fail(getRequestMessage(err.response?.status), 4000);
            dispatch(setLoadingAuthForm(false))
        })
    }
}

// mise à jour du token
const updateRefreshToken = (payload)=>{
    return async function (dispatch){
        
        const config = {
            headers: { Authorization: `Bearer ${payload.token}` }
        };
        await API.post('/auth/token/refresh/',payload.data,config).then(res => {
            dispatch(setAccessToken(res.data.access))
        }).catch(err=>{
            dispatch(logOut(dispatch))
        })
        
    }
}
const userInfo = (token)=>{
    return async function (dispatch){
        
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        await API.get('/api/auth/me',config).then(res => {
            dispatch(set_me(res.data))
        }).catch(err=>{
            !_.isUndefined(err.response&&err.response?.status === 401) ?
            customUnauthorizedAction(dispatch) : Toast.fail(getRequestMessage(err.response?.status), 4000);
        })
        
    }
}

// update profil
const updateUser = (payload)=>{
    return async function (dispatch){
        
        dispatch(setFormValid(false)) 
        dispatch(setLoadingAuthForm(true))
        // const config = {
        //     headers: { 
        //         "Content-Type": "multipart/form-data",  Authorization: `Bearer ${payload.token}` 
        //     }
        // };
        // API.defaults.headers.get['Authorization'] = 'Bearer '+ payload.token;  
        // API.put('/users/'+payload.id+"/",payload.data,config).then(async res => {
           
        await API.put('/api/auth/update',payload).then(async (res) => {
            console.log(res.data)
            // await dispatch(set_user(res.data))
            dispatch(setLoadingAuthForm(false)) 
            dispatch(setFormValid(true)) 
            return res.data;
        }).catch(err=>{
            !_.isUndefined(err.response&&err.response?.status === 401) ?
                customUnauthorizedAction(dispatch) : Toast.fail(getRequestMessage(err.response?.status), 4000);
        })
    }
}


// recuperer la liste des Users
export const getUsers = (payload)=>{

    return async function (dispatch){
        API.defaults.headers.get['Authorization'] = 'Bearer '+ payload;     
        await API.get('/users').then(async (res) => {
            console.log(res.data)
            await dispatch(set_users(res.data))
            return res.data;
        }).catch(err=>{
            !_.isUndefined(err.response&&err.response?.status === 401) ?
                customUnauthorizedAction(dispatch) : Toast.fail(getRequestMessage(err.response?.status), 4000);
        })
    }
}
// recuperer la liste des Users
export const getUser = (payload)=>{
    console.log(payload);
    return async function (dispatch){
        API.defaults.headers.get['Authorization'] = 'Bearer '+ payload.token;     
        await API.get('/api/auth/users/'+payload.id+'?type='+ payload.type).then(async (res) => {
            console.log(res.data)
            await dispatch(set_user(res.data))
            return res.data;
        }).catch(err=>{
            !_.isUndefined(err.response&&err.response?.status === 401) ?
                customUnauthorizedAction(dispatch) : Toast.fail(getRequestMessage(err.response?.status), 4000);
        })
    }
}

// update mot de passe
const updatePassword = (payload)=>{
    return function (dispatch){
        
        dispatch(setLoadingForm(true))
        
        const config = {
            headers: { 
                "Content-Type": "multipart/form-data",  Authorization: `Bearer ${payload.token}` 
            }
        };
        API.put('/users/'+payload.id+"/change_password/",payload.data,config).then(async res => {
            
            dispatch(setLoadingForm(false)) 
            dispatch(setSession(null))
            window.location.reload()
        }).catch(err=>{
            dispatch(setLoadingForm(false))
            !_.isUndefined(err.response&&err.response?.status === 401) ?
                customUnauthorizedAction(dispatch) : Toast.fail(getRequestMessage(err.response?.status), 4000);
        })
    }
}
// update mot de passe
const refreshToken = ()=>{
    return async function (dispatch){
        
        dispatch(setLoadingForm(true))
        const refreshToken = useSelector(state => state.refreshToken)
        let payload= {"refreshToken":refreshToken}
        await API.post('/api/auth/refreshtoken',payload).then(res => {
            console.log(res);
            dispatch(setAccessToken(res.data.accessToken))
        }).catch(err=>{
            Toast.fail(getRequestMessage((err.response&&err.response.status === 401) ), 4000);
        })
    }
}



// connexion avec email et mot de passe
const setEmailLogin = (payload)=>{

    // let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
    return async function (dispatch){

        // if(!pattern.test(payload.email)){
        //     Toast.fail(i18n.t("admin.login.error.noValidEmail"),3000)
        //     return dispatch(setLoadingAuthForm(false))
        // }
        console.log("payload :::: ", payload);
        dispatch(setLoadingAuthForm(true))

        await API.post('/api/auth/signin',payload).then(res => {
            console.log(res);
            console.log(res.data);
            // dispatch(setRefreshToken(res.data.refresh))
            dispatch(setRefreshToken(res.data.refreshToken))
            dispatch(setAccessToken(res.data.accessToken))
            dispatch(setSession(res.data))
            dispatch(set_roles(res.data.roles))
            dispatch(setLoadingAuthForm(false))
            // API.defaults.headers.get['Authorization'] = 'Bearer '+ res.data.access;
        }).catch(err=>{
            console.log(err.message);
            !_.isUndefined(err.response&&err.response?.status === 401) ? 
                Toast.fail(getRequestMessage(401)+" : "+i18n.t('admin.error.WRONGLOGPWD'), 4000): Toast.fail(getRequestMessage(err.response?.status), 4000);
            dispatch(setLoadingAuthForm(false))
        })
    }
}

// Déconnexion Globale

const logOut = (dispatch)=>{
    return function (dispatch) {
        if(clearState()){
            dispatch(setAccessToken(null))
            dispatch(setRefreshToken(null))
            return dispatch(setSession(null))
        }
    }
}


// Zone d'exportation des requete
export  {SIGNUP,LOGIN,EMAIL_LOGIN, EMAIL_SIGNUP, GOOGLE_LOGIN, GOOGLE_SIGNUP,GET_ACCESS_TOKEN,GET_REFRESH_TOKEN,
     SET_REFRESH_TOKEN, SET_ACCESS_TOKEN, SET_FORM_VALID, GET_FORM_VALID, userInfo, updateUser, refreshToken, logOut, setEmailSignup, updatePassword,updateRefreshToken, signup, setEmailLogin}


