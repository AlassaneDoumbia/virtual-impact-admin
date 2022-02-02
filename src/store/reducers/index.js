import {GET_SESSION, SET_SESSION, LOAD_SESSION, SET_LOADING_FORM, SET_LOADING_AUTH_FORM, GET_ROLES, SET_ROLES} from '../actions/index';
import {SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, GET_ACCESS_TOKEN, GET_REFRESH_TOKEN,GET_FORM_VALID,SET_FORM_VALID,GET_USER, GET_USERS, SET_USER, SET_USERS, SET_ME, GET_ME} from '../actions/auth'
import {GET_ENSEIGNANTS, SET_ENSEIGNANTS, GET_ENSEIGNANT, SET_ENSEIGNANT} from 'store/actions/enseignant/enseignant'
import {GET_MODULES, SET_MODULES, GET_MODULE, SET_MODULE} from 'store/actions/module/module'
import {GET_CHAPITRES, SET_CHAPITRES, GET_CHAPITRE, SET_CHAPITRE} from 'store/actions/chapitre/chapitre'

// import { SET_COURSES,GET_COURSES,GET_COURSE,SET_COURSE, SET_ESTIMATION, GET_ESTIMATION, GET_LCOURSE, SET_LCOURSE } from "./../actions/courses/courses";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state,action) =>{
    switch (action.type) {
        // users state
        case GET_USERS:
            return {
                ...state,
            }
        case SET_USERS:
            return {
                ...state,
                users:action.users
            }
        case GET_USER:
            return {
                ...state,
            }
        case SET_USER:
            return {
                ...state,
                user:action.user
            }
        case GET_ME:
            return {
                ...state,
            }
        case SET_ME:
            return {
                ...state,
                me:action.me
            }
        // chapitres state
        case GET_CHAPITRES:
            return {
                ...state,
            }
        case SET_CHAPITRES:
            return {
                ...state,
                chapitres:action.chapitres
            }
        case GET_CHAPITRE:
            return {
                ...state,
            }
        case SET_CHAPITRE:
            return {
                ...state,
                chapitre:action.chapitre
            }
        // modules state
        case GET_MODULES:
            return {
                ...state,
            }
        case SET_MODULES:
            return {
                ...state,
                modules:action.modules
            }
        case GET_MODULE:
            return {
                ...state,
            }
        case SET_MODULE:
            return {
                ...state,
                module:action.module
            }
        // enseignants state
        case GET_ENSEIGNANTS:
            return {
                ...state,
            }
        case SET_ENSEIGNANTS:
            return {
                ...state,
                enseignants:action.enseignants
            }
        case GET_ENSEIGNANT:
            return {
                ...state,
            }
        case SET_ENSEIGNANT:
            return {
                ...state,
                enseignant:action.enseignant
            }

        // roles state    
        case GET_ROLES:
            return {
                ...state,
            }
        case SET_ROLES:
            return {
                ...state,
                roles:action.roles
            }
        // session state    
        case GET_SESSION:
            return {
                ...state,
            }
        case SET_SESSION:
            return {
                ...state,
                session:action.session
            }
        case LOAD_SESSION:
            return {
                ...state,
                isLoading:action.isLoading
            }
        case SET_LOADING_FORM:
            return {
                ...state,
                loadingForm:action.loadingForm
            }
        case SET_LOADING_AUTH_FORM:
            return {
                ...state,
                authLoadingForm:action.authLoadingForm
            }
        case 'set':
            console.log(action)
            return {
                ...state,
                sidebarShow:action.sidebarShow
            }
        // Auth Reducer
        case SET_REFRESH_TOKEN:{
            return {
                ...state,
                refreshToken:action.refreshToken
            }
        }
        case GET_REFRESH_TOKEN:{
            return {
                ...state,
            }
        }
        case SET_ACCESS_TOKEN:{
            return {
                ...state,
                accessToken:action.accessToken
            }
        }
        case GET_ACCESS_TOKEN:{
            return {
                ...state,
            }
        }
        case SET_FORM_VALID:{
            return {
                ...state,
                valid:action.valid
            }
        }
        case GET_FORM_VALID:{
            return {
                ...state,
            }
        }
        
        
        default:
            return state
    }
}
