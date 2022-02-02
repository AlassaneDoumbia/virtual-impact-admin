import React, {useState, useEffect} from "react"; 
// import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useLocation} from 'react-router-dom'
import Toast from "light-toast";
import {setLoadingAuthForm,setSession} from 'store/actions/index';
import {useSelector, connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import { signup,getUser, updateUser, setFormValid } from 'store/actions/auth'
// import _ from 'lodash'
import {controlUserInput} from 'helpers/helperFunctions';

// export default function Login() {
const UserForm = (props) => {
    const {  i18n } = useTranslation();
    const location = useLocation();
    const accessToken = useSelector(state => state.accessToken)
    const [userInfo, setUserInfo] = useState({
        id:props.match.params?.id,
        login:"",
        password:"",
        birthday:"",
        numero:"",
        email:"",
        type:location.state?.type,
        nomComplet:"",
        tuteur:"",
        classe:"",
        specialite:"",
        matricule:"",
        role:[]
    })

    const handleChange = (event) =>{
        setUserInfo({...userInfo,[event.target.name]: event.target.value})
    }
    // const handleSelectChange = (event) =>{
    //     let tab = roles(event.target.value)
    //     setUserInfo({...userInfo,"role": tab})
    // }

    const roles = (key) => {
        switch (key) {
            case "enseignant":
                return ["ensei", "user"];
            case "etudiant":
                return ["etu", "user"];
        
            default:
                return ["admin", "user"];
        }
    }

    const setTypeAndRole = () =>{
        if(userInfo.role.length === 0){
            // setUserInfo({...userInfo,"type": location.state.type})
            let tab = roles(location.state.type)
            setUserInfo({...userInfo,"role": tab})
        }
    }
  
    const save = () => {
        setTypeAndRole()
        console.log(userInfo);
        (controlUserInput(userInfo))?
        props.signup(userInfo) : Toast.fail(i18n.t('admin.controlInput'), 3000);
    }
    const update = async () => {
        setTypeAndRole()
        let data ={
            id:props.match.params.id,
            login:userInfo.login ||  props.user.login ,
            birthday:userInfo.birthday ||  props.user.birthday,
            password:"update",
            numero:userInfo.numero ||  props.user.numero,
            email:userInfo.email ||  props.user.email,
            type:userInfo.type,
            nomComplet:userInfo.nomComplet ||  props.user.nomComplet,
            tuteur:userInfo.tuteur ||  props.user.tuteur,
            classe:userInfo.classe ||  props.user.classe,
            specialite:userInfo.specialite ||  props.user.specialite,
            matricule:userInfo.matricule ||  props.user.matricule,
            role:roles(userInfo.type)
        }
        console.log("dat ::::: ",data);
        if(controlUserInput(data)){
            await props.updateUser(data)
        }else{
            Toast.fail(i18n.t('admin.controlInput'), 3000);
        }
  
    }
    const handleSubmitform = (event) =>{
        // handleSelectChange(userInfo.type)
        if(event.which === 13 || event.keyCode === 13){
            (props.match.params?.id)? update() : save();
        }
    }

    useEffect(() => {   
        props.setFormValid(false)                                                                                                                                                                                                  
        if (props.match.params.id && location.state?.type) {
            const payload={"id":props.match.params.id,"token":accessToken, "type":location.state.type}
            props.getUser(payload)
        }  /***/
        console.log(location.state?.type); // result: 'some_value'
        console.log(location.state); // result: 'some_value'
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    if(props.valid === true){
        return <Redirect to='/admin/users' />
    }else { 
        return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">{i18n.t('admin.users.GStaff')}</h6>
                            </div>
                        </div>
                
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form onKeyDown={handleSubmitform}>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    {i18n.t('admin.users.userInfo')}
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.users.table.nomCp')}
                                        </label>
                                        <input
                                            type="text" name="nomComplet" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+(i18n.t('admin.users.table.nomCp')).toLowerCase()}
                                            defaultValue={( props.user && props.user.nomComplet !== undefined)?  props.user.nomComplet: ""}   
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.users.table.email')}
                                        </label>
                                        <input
                                            type="email" name="email" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.email').toLowerCase()}
                                            defaultValue={( props.user && props.user.email !== undefined)?  props.user.email: ""}   
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.users.table.username')}
                                        </label>
                                        <input
                                            type="text" name="login" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.username').toLowerCase()}
                                            defaultValue={( props.user && props.user.login !== undefined)?  props.user.login: ""} 
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.users.table.password')}
                                        </label>
                                        <input
                                            type="password" name="password" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.password').toLowerCase()}
                                            defaultValue={( props.user && props.user.password !== undefined)?  props.user.password: ""} 
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.users.table.birthday')}
                                        </label>
                                        <input
                                            type="date" name="birthday" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.birthday').toLowerCase()}
                                            defaultValue={( props.user && props.user.birthday !== undefined)?  "2013-01-08": ""} 
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.users.table.phone_number')}
                                        </label>
                                        <input
                                            type="text" name="numero" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.phone_number').toLowerCase()}
                                            defaultValue={( props.user && props.user.numero !== undefined)?  props.user.numero: ""} 
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.users.table.account_type')}
                                        </label>
                                        {/* <select name="type" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"> */}
                                        <select name="type" onChange={handleChange} defaultValue={location.state?.type}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                            <option value="admin">{i18n.t('admin.users.account_type.ADMIN')}</option>
                                            <option value="enseignant">{i18n.t('admin.users.account_type.ENS')}</option>
                                            <option value="etudiant">{i18n.t('admin.users.account_type.ETU')}</option>
                                        </select>
                                        </div>
                                    </div>
                                </div>

                                <hr className="mt-6 border-b-1 border-blueGray-300" />

                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    {i18n.t('admin.users.userEns')}
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.users.table.matricule')}
                                        </label>
                                        <input
                                            type="text" name="matricule" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.matricule').toLowerCase()}
                                            defaultValue={( props.user && props.user.matricule !== undefined)?  props.user.matricule: ""} 
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.users.table.specialite')}
                                        </label>
                                        <input
                                            type="text" name="specialite" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.specialite').toLowerCase()}
                                            defaultValue={( props.user && props.user.specialite !== undefined) ?  props.user.specialite: ""} 
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                
                                </div>

                                <hr className="mt-6 border-b-1 border-blueGray-300" />

                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    {i18n.t('admin.users.userEtu')}
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.users.table.classe')}
                                        </label>
                                        <input
                                            type="text" name="classe" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.classe').toLowerCase()}
                                            defaultValue={( props.user && props.user.classe !== undefined)?  props.user.classe: ""} 
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.users.table.mentor')}
                                        </label>
                                        <input
                                            type="text" name="tuteur" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.mentor').toLowerCase()}
                                            defaultValue={( props.user && props.user.tuteur !== undefined)?  props.user.tuteur: ""} 
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 py-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                        <button type="button" onClick={()=>{(props.match.params?.id)? update() : save();}}  
                                            disabled={props.authLoadingForm&&true}
                                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        >
                                            {props.authLoadingForm&&<><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span> {i18n.t("admin.loading") }</> } {!props.authLoadingForm&&i18n.t("admin.save")}
                                        </button>
                                        
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
    }

}


const mapStateToProps = (state) =>{
  return {
    session:state.session,
    authLoadingForm:state.authLoadingForm,
    loadingResource:state.loadingResource,
    user:state.user,
    valid:state.valid,
  }
}

const mapDispatchToProps = (dispatch)=>{

  return{
    setLoadingAuthForm: (val)=>{
      dispatch(setLoadingAuthForm(val))
    },
    setSession:(val)=>{
      dispatch(setSession(val))
    },
    signup:(payload)=>{
      dispatch(signup(payload))
    },
    getUser:(payload)=>{
      dispatch(getUser(payload))
    },
    updateUser:(payload)=>{
      dispatch(updateUser(payload))
    },
    setFormValid:(payload)=>{
      dispatch(setFormValid(payload))
    },
   

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserForm)

