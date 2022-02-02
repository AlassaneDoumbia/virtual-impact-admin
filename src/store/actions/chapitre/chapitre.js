import { setLoadingForm} from "../index";
import { setFormValid } from "./../auth";
import API from 'helpers/api'
import {getRequestMessage, customUnauthorizedAction} from "helpers/helperFunctions";
import Toast from "light-toast";
import _ from 'lodash'

export const GET_CHAPITRES = 'GET_CHAPITRES';
export const SET_CHAPITRES = 'SET_CHAPITRES';
export const GET_CHAPITRE = 'GET_CHAPITRE';
export const SET_CHAPITRE = 'SET_CHAPITRE';

export const get_chapitres = () => {
    return {
      type: GET_CHAPITRES
    }
}/** */
  
export const set_chapitres = (chapitres) => {
    return {
      type: SET_CHAPITRES,
      chapitres: chapitres
    }
}
export const get_chapitre = () => {
    return {
      type: GET_CHAPITRE
    }
}/** */
  
export const set_chapitre = (chapitre) => {
    return {
      type: SET_CHAPITRE,
      chapitre: chapitre
    }
}


// recuperer la liste des Chapitres
export const getChapitres = (payload)=>{

    return async function (dispatch){
        const config = {
            headers: {  "Content-Type": "application/json", Authorization: `Bearer ${payload}`  }
        };  
        await API.get('/chapitre/allChapitre/',config).then(async (res) => {
            console.log(res.data)
            await dispatch(set_chapitres(res.data) )
        }).catch(err=>{
            !_.isUndefined(err.response&&err.response?.status === 401) ?
                customUnauthorizedAction(dispatch) : Toast.fail(getRequestMessage(err.response?.status), 4000);
        })
    }
}

// modifier une marque
export const updateChapitre = (payload)=>{

    return function (dispatch){
        
        dispatch(setLoadingForm(true))
        dispatch(setFormValid(false)) 
        const config = {
            headers: {  "Content-Type": "application/json", Authorization: `Bearer ${payload.token}`  }
        };
        
        API.put('/chapitre/updateChapitre',payload.data,config).then(async res => {
            dispatch(setLoadingForm(false)) 
            dispatch(setFormValid(true))   
               
        }).catch(err=>{
            dispatch(setLoadingForm(false))
            !_.isUndefined(err.response&&err.response?.status === 401) ?
                customUnauthorizedAction(dispatch) : Toast.fail(getRequestMessage(err.response?.status), 4000);
        }) /** */
    }
}
// modifier une marque
export const createChapitre = (payload)=>{

    return function (dispatch){
        
        dispatch(setLoadingForm(true))
        dispatch(setFormValid(false)) 
        API.defaults.headers.get['Authorization'] = 'Bearer '+ payload.token;
        const config = {
            headers: {  "Content-Type": "application/json", Authorization: `Bearer ${payload.token}`  }
            // headers: {  "Content-Type": "multipart/form-data", Authorization: `Bearer ${payload.token}`  }
        };
        API.post('/chapitre/createChapitre',payload.data,config).then(async res => {
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


// recuperer un Chapitre 
export const getChapitre = (payload)=>{

    return function (dispatch){
        const config = {
            headers: {  "Content-Type": "application/json", Authorization: `Bearer ${payload.token}`  }
            // headers: {  "Content-Type": "multipart/form-data", Authorization: `Bearer ${payload.token}`  }
        };     
        API.get('/chapitre/getChapitreDetails/'+payload.id,config).then(res => {
            dispatch(set_chapitre(res.data))
        }).catch(err=>{
            !_.isUndefined(err.response&&err.response?.status === 401) ?
                customUnauthorizedAction(dispatch) : Toast.fail(getRequestMessage(err.response?.status), 4000);
        })
    }
}



// supprimer un chapitre 
export const deleteChapitre = (payload)=>{

    return function (dispatch){
        console.log("payload ::::: ",payload);
        const config = {
            headers: {  "Content-Type": "application/json", Authorization: `Bearer ${payload.token}`  }
        };
        API.delete('/chapitre/deleteChapitre/'+payload.id,config).then(res => {
            dispatch(getChapitres(payload.token))
            
        }).catch(err=>{
            !_.isUndefined(err.response&&err.response?.status === 401) ?
                customUnauthorizedAction(dispatch) : Toast.fail(getRequestMessage(err.response?.status), 4000);
        })
    }
}
