import { setLoadingForm} from "../index";
import { setFormValid } from "./../auth";
import API from 'helpers/api'
import {getRequestMessage, customUnauthorizedAction} from "helpers/helperFunctions";
import Toast from "light-toast";
import _ from 'lodash'

export const GET_MODULES = 'GET_MODULES';
export const SET_MODULES = 'SET_MODULES';
export const GET_MODULE = 'GET_MODULE';
export const SET_MODULE = 'SET_MODULE';

export const get_modules = () => {
    return {
      type: GET_MODULES
    }
}/** */
  
export const set_modules = (modules) => {
    return {
      type: SET_MODULES,
      modules: modules
    }
}
export const get_module = () => {
    return {
      type: GET_MODULE
    }
}/** */
  
export const set_module = (module) => {
    return {
      type: SET_MODULE,
      module: module
    }
}


// recuperer la liste des Modules
export const getModules = (payload)=>{

    return async function (dispatch){
        API.defaults.headers.get['Authorization'] = 'Bearer '+ payload;     
        await API.get('/module/allModule/').then(async (res) => {
            console.log(res.data)
            await dispatch(set_modules(res.data) )
        }).catch(err=>{
            !_.isUndefined(err.response&&err.response?.status === 401) ?
                customUnauthorizedAction(dispatch) : Toast.fail(getRequestMessage(err.response?.status), 4000);
        })
    }
}

// recuperer la liste des Modules
export const getModulesByEnseignants = (payload, id)=>{
    console.log("payload ::::::",payload)
    return async function (dispatch){
        API.defaults.headers.get['Authorization'] = 'Bearer '+ payload.token;     
        await API.get('/module/allModuleEnseignant/'+payload.id).then(async (res) => {
            console.log(res.data)
            await dispatch(set_modules(res.data) )
        }).catch(err=>{
            !_.isUndefined(err.response&&err.response?.status === 401) ?
                customUnauthorizedAction(dispatch) : Toast.fail(getRequestMessage(err.response?.status), 4000);
        })
    }
}

// modifier une marque
export const updateModule = (payload)=>{

    return function (dispatch){
        
        dispatch(setLoadingForm(true))
        dispatch(setFormValid(false)) 
        const config = {
            headers: {  "Content-Type": "application/json", Authorization: `Bearer ${payload.token}`  }
            // headers: {  "Content-Type": "multipart/form-data", Authorization: `Bearer ${payload.token}`  }
        };
        
        API.put('/module/updateModule',payload.data,config).then(async res => {
            dispatch(setLoadingForm(false)) 
            dispatch(setFormValid(true))   
               
        }).catch(err=>{
            console.log(err)
            dispatch(setLoadingForm(false))
            !_.isUndefined(err.response&&err.response?.status === 401) ?
                customUnauthorizedAction(dispatch) : Toast.fail(getRequestMessage(err.response?.status), 4000);
        }) /** */
    }
}
// modifier une marque
export const createModule = (payload)=>{

    return function (dispatch){
        
        dispatch(setLoadingForm(true))
        dispatch(setFormValid(false)) 
        console.log("dat ::::: ",payload.data);
        const config = {
            headers: {  "Content-Type": "application/json", Authorization: `Bearer ${payload.token}`  }
            // headers: {  "Content-Type": "multipart/form-data", Authorization: `Bearer ${payload.token}`  }
        };
        API.post('/module/createModule',payload.data,config).then(async res => {
            dispatch(setLoadingForm(false)) 
            dispatch(setFormValid(true))   
               
        }).catch(err=>{
            console.log(err)
            dispatch(setLoadingForm(false))
            !_.isUndefined(err.response&&err.response?.status === 401) ?
                customUnauthorizedAction(dispatch) : Toast.fail(getRequestMessage(err.response?.status), 4000);
        }) /** */
    }
}


// recuperer un Module 
export const getModule = (payload)=>{

    return function (dispatch){
        API.defaults.headers.get['Authorization'] = 'Bearer '+ payload.token;     
        console.log("payload ::::: ",payload);
        API.get('/module/getModuleDetail/'+payload.id).then(res => {
            dispatch(set_module(res.data))
        }).catch(err=>{
            !_.isUndefined(err.response&&err.response?.status === 401) ?
                customUnauthorizedAction(dispatch) : Toast.fail(getRequestMessage(err.response?.status), 4000);
        })
    }
}
// supprimer un Module 
export const deleteModule = (payload)=>{

    return function (dispatch){
        // API.defaults.headers.get['Authorization'] = 'Bearer '+ payload.token;     
        console.log("payload ::::: ",payload);
        const config = {
            headers: {  "Content-Type": "application/json", Authorization: `Bearer ${payload.token}`  }
            // headers: {  "Content-Type": "multipart/form-data", Authorization: `Bearer ${payload.token}`  }
        };
        API.delete('/module/deleteModule/'+payload.id,config).then(res => {
            dispatch(getModules(payload.token))
            
        }).catch(err=>{
            !_.isUndefined(err.response&&err.response?.status === 401) ?
                customUnauthorizedAction(dispatch) : Toast.fail(getRequestMessage(err.response?.status), 4000);
        })
    }
}




