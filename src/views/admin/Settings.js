import React, {useState, useEffect} from "react";
// import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
// import { useLocation} from 'react-router-dom'
import Toast from "light-toast";
import {setLoadingAuthForm,setSession} from 'store/actions/index';
import {userInfo} from 'store/actions/auth';
// import { updateEnseignant, getEnseignant } from "store/actions/enseignant/enseignant";
// import {Redirect} from 'react-router-dom'
// import _ from 'lodash'
import {connect, useSelector} from 'react-redux'

// components

// import CardSettings from "components/Cards/CardSettings.js";
// import CardProfile from "components/Cards/CardProfile.js";

const Settings = (props) => {
  const {  i18n } = useTranslation();
  // const history = useHistory()
  // const location = useLocation();
  const accessToken = useSelector(state => state.accessToken)
  const [userInfos, setUserInfos] = useState({
    id:props.match.params?.id,
    login:"",
    password:"",
    birthday:"",
    numero:"",
    email:"",
    nomComplet:"",
    tuteur:"",
    classe:"",
    specialite:"",
    matricule:"",
    role:[]
  })

  const handleSubmitform = (event) =>{
    // handleSelectChange(userInfos.type)
    // if(event.which === 13 || event.keyCode === 13){
    //     (props.match.params?.id)? update() : save();
    // }
  }
  const handleChange = (event) =>{
      setUserInfos({...userInfos,[event.target.name]: event.target.value})
  }


  useEffect(() => {
    props.userInfo(accessToken)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
// export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          {/* <CardSettings /> */}
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            {/* <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">{i18n.t('admin.users.GStaff')}</h6>
                </div>
            </div> */}
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">{i18n.t('admin.myaccount')}</h6>
                <button disabled={props.authLoadingForm&&true}
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"  onClick={()=>{Toast.info(i18n.t('admin.controlFonction'), 3000)}}  
                >
                  {props.authLoadingForm&&<><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span> {i18n.t("admin.loading") }</> } {!props.authLoadingForm&&i18n.t("admin.updated")}
                </button>
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
                          type="text" name="nomComplet" onChange={handleChange} disabled={true} 
                          placeholder={i18n.t('admin.enter')+""+(i18n.t('admin.users.table.nomCp')).toLowerCase()}
                          defaultValue={( props.me && props.me.nomComplet !== undefined)?  props.me.nomComplet: ""}   
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
                          type="email" name="email" onChange={handleChange} disabled={true} 
                          placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.email').toLowerCase()}
                          defaultValue={( props.me && props.me.email !== undefined)?  props.me.email: ""}   
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
                          type="text" name="login" onChange={handleChange} disabled={true} 
                          placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.username').toLowerCase()}
                          defaultValue={( props.me && props.me.login !== undefined)?  props.me.login: ""} 
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
                          type="password" name="password" onChange={handleChange} disabled={true} 
                          placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.password').toLowerCase()}
                          defaultValue={( props.me && props.me.password !== undefined)?  props.me.password: "youbeyou"} 
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
                          type="date" name="birthday" onChange={handleChange} disabled={true} 
                          placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.birthday').toLowerCase()}
                          defaultValue={( props.me && props.me.birthday !== undefined)?  "2013-01-08": ""} 
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
                          type="text" name="numero" onChange={handleChange} disabled={true} 
                          placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.phone_number').toLowerCase()}
                          defaultValue={( props.me && props.me.numero !== undefined)?  props.me.numero: ""} 
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>
                </div>

                {/* <hr className="mt-6 border-b-1 border-blueGray-300" />

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
                          type="text" name="matricule" onChange={handleChange} disabled={true} 
                          placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.matricule').toLowerCase()}
                          defaultValue={( props.me && props.me.matricule !== undefined)?  props.me.matricule: ""} 
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
                          type="text" name="specialite" onChange={handleChange} disabled={true} 
                          placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.specialite').toLowerCase()}
                          defaultValue={( props.me && props.me.specialite !== undefined) ?  props.me.specialite: ""} 
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
                          type="text" name="classe" onChange={handleChange} disabled={true} 
                          placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.classe').toLowerCase()}
                          defaultValue={( props.me && props.me.classe !== undefined)?  props.me.classe: ""} 
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
                          type="text" name="tuteur" onChange={handleChange} disabled={true} 
                          placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.mentor').toLowerCase()}
                          defaultValue={( props.me && props.me.tuteur !== undefined)?  props.me.tuteur: ""} 
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>
                </div> */}
                {/* <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        About me
                      </label>
                      <textarea
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                </div> */}
              </form>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/12 px-4">
          {/* <CardProfile />@ */}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) =>{
  return {
    session:state.session,
    authLoadingForm:state.authLoadingForm,
    loadingResource:state.loadingResource,
    valid:state.valid,
    loadingForm:state.loadingForm,
    me:state.me,
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
    userInfo:(val)=>{
      dispatch(userInfo(val))
    },
    
   

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Settings)
