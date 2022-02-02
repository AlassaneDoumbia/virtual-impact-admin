import { setFormValid } from "store/actions/auth";
import API from 'helpers/api'
import {getRequestMessage} from "helpers/helperFunctions";
import { setSession, setLoadingAuthForm, setLoadingForm } from "store/actions/index";
import Toast from "light-toast";
import _ from 'lodash'

export const GET_ENSEIGNANTS = 'GET_ENSEIGNANTS';
export const SET_ENSEIGNANTS = 'SET_ENSEIGNANTS';
export const GET_ENSEIGNANT = 'GET_ENSEIGNANT';
export const SET_ENSEIGNANT = 'SET_ENSEIGNANT';

export const get_enseignants = () => {
    return {
      type: GET_ENSEIGNANTS
    }
}/** */
  
export const set_enseignants = (enseignants) => {
    return {
      type: SET_ENSEIGNANTS,
      enseignants: enseignants
    }
}
export const get_enseignant = () => {
    return {
      type: GET_ENSEIGNANT
    }
}/** */
  
export const set_enseignant = (enseignant) => {
    return {
      type: SET_ENSEIGNANT,
      enseignant: enseignant
    }
}


// recuperer la liste des Enseignants
export const getEnseignants = (payload)=>{

    return async function (dispatch){
        API.defaults.headers.get['Authorization'] = 'Bearer '+ payload;     
        await API.get('/enseignant/allEnseignant/').then(async (res) => {
            console.log(res.data)
            await dispatch(set_enseignants(res.data) )
        }).catch(err=>{
            !_.isUndefined(err.response&&err.response?.status === 401) ?
                customUnauthorizedAction(dispatch) : Toast.fail(getRequestMessage(err.response?.status), 4000);
        })
    }
}

// modifier une marque
export const updateEnseignant = (payload)=>{

    return function (dispatch){
        
        dispatch(setLoadingForm(true))
        dispatch(setLoadingAuthForm(true))
        dispatch(setFormValid(false)) 
        const config = {
            headers: {  "Content-Type": "application/json", Authorization: `Bearer ${payload.token}`  }
            // headers: {  "Content-Type": "multipart/form-data", Authorization: `Bearer ${payload.token}`  }
        };
        
        API.put('/enseignant/updateEnseignant',payload.data,config).then(async res => {
            dispatch(set_enseignant(res))
            dispatch(setLoadingForm(false)) 
            dispatch(setFormValid(true))   
               
        }).catch(err=>{
            console.log(err)
            dispatch(setFormValid(false))
            dispatch(setLoadingForm(false))
            !_.isUndefined(err.response&&err.response?.status === 401) ?
                customUnauthorizedAction(dispatch) : Toast.fail(getRequestMessage(err.response?.status), 4000);
        }) /** */
    }
}


// recuperer un Enseignant 
export const getEnseignant = (payload)=>{

    return function (dispatch){
        API.defaults.headers.get['Authorization'] = 'Bearer '+ payload.token;     
        API.get('/enseignant/getEnseignant/'+payload.id).then(res => {
            dispatch(set_enseignant(res.data))
        }).catch(err=>{
            !_.isUndefined(err.response&&err.response?.status === 401) ?
                customUnauthorizedAction(dispatch) : Toast.fail(getRequestMessage(err.response?.status), 4000);
        })
    }
}

// supprimer un Enseignant 
export const deleteEnseignant = (payload)=>{

    return function (dispatch){
        console.log("payload ::::: ",payload);
        const config = {
            headers: {  "Content-Type": "application/json", Authorization: `Bearer ${payload.token}`  }
        };
        API.delete('/enseignant/delete-enseignant/'+payload.id,config).then(res => {
            dispatch(getEnseignants(payload.token))
            
        }).catch(err=>{
            !_.isUndefined(err.response&&err.response?.status === 401) ?
                customUnauthorizedAction(dispatch) : Toast.fail(getRequestMessage(err.response?.status), 4000);
        })
    }
}



const customUnauthorizedAction = (dispatch) =>{
    Toast.fail(getRequestMessage(401), 4000)
    dispatch(setSession(null))
    // window.location.reload()
}


