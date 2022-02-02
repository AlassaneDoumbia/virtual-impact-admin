import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {Redirect} from 'react-router-dom'
import Toast from "light-toast";
import {setLoadingAuthForm,setSession} from './../../store/actions/index';
import {setEmailLogin, } from './../../store/actions/auth'
import _ from 'lodash'
import {connect} from 'react-redux'

// export default function Login() {
const Login = (props) => {
  const {  i18n } = useTranslation();
  const [loginInfo, setLoginInfo] = useState({
    login:"",
    password:""
  })

  const handleChange = (event) =>{
    setLoginInfo({...loginInfo,[event.target.name]: event.target.value})
  }

  
  const handleSubmitform = (event) =>{
    if(event.which === 13 || event.keyCode === 13){
      (controlInput(loginInfo))?
      props.setEmailLogin(loginInfo): Toast.fail(i18n.t('admin.controlInput'), 4000);
    }
  }

  const controlInput = (loginInfo) =>{
    if (loginInfo.hasOwnProperty("login") && loginInfo.hasOwnProperty("password") &&
          loginInfo.login !== undefined && loginInfo.password !== undefined &&
      loginInfo.login.length > 3 && loginInfo.password.length > 3) {

      return true
    }else{
      return false
    }
  }

  if(!_.isNull(props.session)){
    return <Redirect to='/admin' />
  }else{
    return (
      <>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-sm font-bold">
                      {i18n.t("admin.login.signWith")}
                    </h6>
                  </div>
                  <div className="btn-wrapper text-center">
                    <button
                      className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      type="button"
                    >
                      <img
                        alt="..."
                        className="w-5 mr-1"
                        src={require("assets/img/github.svg").default}
                      />
                      Github
                    </button>
                    <button
                      className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      type="button"
                    >
                      <img
                        alt="..."
                        className="w-5 mr-1"
                        src={require("assets/img/google.svg").default}
                      />
                      Google
                    </button>
                  </div>
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-blueGray-900 text-center mb-3 font-bold">
                    <small>{i18n.t("admin.login.signIntoin")}</small>
                  </div>
                  <form onKeyDown={handleSubmitform}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        {i18n.t("admin.login.username")}
                      </label>
                      <input
                        type="text" name="login"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder={i18n.t("admin.login.username")} onChange={handleChange}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        {i18n.t("admin.login.password")}
                      </label>
                      <input
                        type="password" name="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder={i18n.t("admin.login.password")} onChange={handleChange}
                      />
                    </div>
                    {/* <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        />
                        <span className="ml-2 text-sm font-semibold text-blueGray-600">
                          Remember me
                        </span>
                      </label>
                    </div> */}

                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button" onClick={()=>{
                          (controlInput(loginInfo))? props.setEmailLogin(loginInfo): Toast.fail(i18n.t('admin.controlInput'), 4000);
                        }}  disabled={props.authLoadingForm&&true}
                      >
                        {props.authLoadingForm&&<><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span> {i18n.t("admin.loading") }</> } {!props.authLoadingForm&&i18n.t("admin.login.toLogin")}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex flex-wrap mt-6 relative">
                <div className="w-1/2">
                  <a
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    className="text-blueGray-200"
                  >
                    <small>{i18n.t("admin.login.forgot")}</small>
                  </a>
                </div>
                <div className="w-1/2 text-right">
                  <Link to="/auth/register" className="text-blueGray-200">
                    <small>{!props.authLoadingForm&&i18n.t("admin.register.creataccount")}</small>
                  </Link>
                </div>
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
    setEmailLogin:(payload)=>{
      dispatch(setEmailLogin(payload))
    },
   

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
