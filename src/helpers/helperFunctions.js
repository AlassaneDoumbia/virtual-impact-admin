'use_strict'
import {setVal, getVal, removeVal} from './localStorage'
import {setSession} from 'store/actions/index'
import i18n from "../lang/i18n";
import Toast from "light-toast";


 const  getInter = (val)=>{
    var arrayer = []
    for(var i = 0 ; i <val; i+=1){
        arrayer.push(i)
    }
    return arrayer
}

export const clearState = (state) =>{
    console.log(state)
    try {
        // const serializedState = JSON.stringify(state);
        removeVal('state');
        return true
    } catch {
        return false
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        setVal('state', serializedState);
    } catch {
        // ignore write errors
    }
};
export const showComponent = (state, component) => {
    
    if (state) {
        return(component)
    }
};

export const loadState = ()=>{
    try {
        const serializedState = getVal('state');
        if(serializedState === null || serializedState === undefined){
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (err){
        console.log(err)
        return undefined
    }
}

export const customUnauthorizedAction = (dispatch) =>{
    Toast.fail(getRequestMessage(401), 4000)
    // dispatch(setSession(null))
    // window.location.reload()
}

export const navTo = (history, path, params) =>{
    history.push({
        pathname: path,
        state: params
    });
}


export const checkRoles = (tab) => {
    console.log("roles  ::::",tab);
    let type = ""
    tab && tab.length >=0 && tab.forEach(element => {
        if (element === "ROLE_ETUDIANT") {
            type = "etudiant" 
        }
        if (element === "ROLE_ENSEIGNANT") {
            type = "enseignant" 
        }
    });
    if (type !== "") {
      return type
    }
    // type= "admin"
    return "admin"
}
export const controlUserInput = (userInfo) =>{
    console.log("control ::: ",userInfo);
    let phone = userInfo.numero.toString();
    console.log("log etat ::: ", userInfo.email.length > 3);
    console.log("log etat ::: ", phone.length > 3 );
    if (userInfo?.nomComplet && userInfo?.birthday && userInfo?.login && userInfo?.password && userInfo?.numero && userInfo?.email &&
          userInfo.nomComplet.length > 3 && userInfo.birthday.length > 3 && userInfo.login.length > 3 && userInfo.password.length > 3 &&
          userInfo.numero.toString().length > 3 && userInfo.email.length > 3 ) {
            console.log(true);
        return true
    }else{
        console.log(false);
        return false
    }
}
export const controlModuleInput = (moduleInfo) =>{
    console.log("log etat ::: ", moduleInfo.nom.length > 3);
    console.log("log etat ::: ", moduleInfo.descriptio > 3 );
    if (moduleInfo?.nom && moduleInfo?.description && moduleInfo?.classe && moduleInfo?.idUtilisateur  &&
          moduleInfo.nom.length > 3 && moduleInfo.description.length > 3 && moduleInfo.classe.length > 1 ) {
            console.log(true);
        return true
    }else{
        console.log(false);
        return false
    }
}
export const controlChapitreInput = (moduleInfo) =>{
    console.log("log etat ::: ", moduleInfo.libelle.length > 3);
    console.log("log etat ::: ", moduleInfo.contenu.length> 3 );
    if (moduleInfo?.libelle && moduleInfo?.contenu && moduleInfo?.idModule  &&
          moduleInfo.libelle.length > 3 && moduleInfo.contenu.length > 20 ) {
            console.log(true);
        return true
    }else{
        console.log(false);
        return false
    }
}


// export const controlUserInput = (userInfo) =>{
//     if (userInfo.hasOwnProperty("login") && userInfo.hasOwnProperty("password") && userInfo.hasOwnProperty("birthday") &&
//     userInfo.hasOwnProperty("numero") && userInfo.hasOwnProperty("email") && userInfo.hasOwnProperty("nomComplet") &&
//           userInfo.login !== undefined && userInfo.password !== undefined && userInfo.numero !== undefined && userInfo.email !== undefined &&
//           userInfo.nomComplet !== undefined && userInfo.birthday !== undefined && userInfo.login.length > 3 && userInfo.password.length > 3 &&
//           userInfo.nomComplet.length > 3 && userInfo.birthday.length > 3 && userInfo.login.length > 3 && userInfo.password.length > 3 &&
//           userInfo.numero.length > 3 && userInfo.email.length > 3 ) {

//       return true
//     }else{
//       return false
//     }
// }

export const getRequestMessage = (status,code=null) =>{

    switch (status) {

        case 500:
        case 501:
        case 503:
            return i18n.t('admin.error.R500')
        case 404:
            return i18n.t('admin.error.R404')
        case 403:
            return (code!==null)?getRequestExtraMessage(code):i18n.t('admin.error.R401')
        case 401:
            return (code!==null)?getRequestExtraMessage(code):i18n.t('admin.error.R401')
        default:
            return i18n.t('admin.error.R500')
    }
}

export const getRequestExtraMessage = (code) =>{

    switch (code) {
        case "SEC04":
            return i18n.t('admin.error.SEC04')
        case "SEC03":
            return i18n.t('admin.error.SEC03')
        case "SEC01":
            return i18n.t('admin.error.SEC01')
        default:
            return 'Sorry Unknow body code !'
    }
}


export default getInter