import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers';
import {loadState} from "../helpers/helperFunctions";
import _ from 'lodash'

const loggerMiddleware = createLogger()

let initialState = {
    sidebarShow: 'responsive',
    session: null,
    loadingForm:false,
    loadingResource:false,
    refreshToken:null,
    accessToken:null,
    authLoadingForm:false

}

let storageState = loadState()

if(!_.isUndefined(storageState) ){
    storageState.loadingForm = false
    storageState.loadingResource = false
    storageState.authLoadingForm = false
    initialState = storageState
}

export default function configureStore(initialSate = initialState) {


    return createStore(
        rootReducer,
        initialSate,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
        /*compose(
           , window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        )*/
    );
}
