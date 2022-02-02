
// import API from './../../helpers/api'
/*
 *  HERE ARE THE ACTIONS NAME
 */
export const GET_SESSION = 'GET_SESSION' ;
export const SET_SESSION = 'SET_SESSION' ;
export const LOAD_SESSION = 'LOAD_SESSION' ;
export const SET_LOADING_AUTH_FORM = 'SET_LOADING_AUTH_FORM' ;
export const SET_LOADING_FORM = 'SET_LOADING_FORM' ;
export const GET_LOADING_FORM = 'GET_LOAD_FORM' ;
export const GET_STATS = 'GET_STATS';
export const SET_STATS = 'SET_STATS';
export const GET_ROLES = 'GET_ROLES';
export const SET_ROLES = 'SET_ROLES';


export const get_stats = () => {
    return {
      type: GET_STATS
    }
}/** */
  
export const set_stats = (stats) => {
    return {
      type: SET_STATS,
      stats: stats
    }
}
export const get_roles = () => {
    return {
      type: GET_ROLES
    }
}/** */
  
export const set_roles = (roles) => {
    return {
      type: SET_ROLES,
      roles: roles
    }
}

/*
 *  HERE ARE THE SYNC AND PURE ACTIONS
 */

export const getInitialSession  = ()=>{
    return {
        type: GET_SESSION
    }
}



// Edit session
export const setSession = (session)=>{
    return{
        type: SET_SESSION,
        session: session
    }
}

// set the form's loading
export const setLoadingForm = (loadingForm)=>{
    return{
        type:SET_LOADING_FORM,
        loadingForm:loadingForm
    }
}
export const setLoadingAuthForm = (authLoadingForm)=>{
    return{
        type:SET_LOADING_AUTH_FORM,
        authLoadingForm:authLoadingForm
    }
}

export const getLoadingForm = ()=>{
    return{
        type:GET_LOADING_FORM
    }
}

/*
 *  HERE ARE THE ASYNC ACTIONS
 */




