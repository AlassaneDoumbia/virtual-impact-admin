import React, {useEffect} from "react";
import { useLocation} from 'react-router-dom'
import {useSelector, connect} from "react-redux";
import { useTranslation } from 'react-i18next';
import { useHistory} from 'react-router-dom'
// import Toast from "light-toast";
import {setLoadingAuthForm,setSession} from 'store/actions/index';
import CardQuote from "components/Cards/CardQuote.js";
import {getModule, set_module, set_modules} from 'store/actions/module/module';

// export default function Login() {
const ModuleInfo = (props) => {
  const {  i18n } = useTranslation();
  const location = useLocation();
  const history = useHistory()
  const accessToken = useSelector(state => state.accessToken)

  useEffect(() => {   
      props.set_module(null) 
      props.set_modules(null)                                                                                                                                                                                                         
      if (props.match.params.id) {
          const payload={"id":props.match.params.id,"token":accessToken}
          props.getModule(payload)
      }  /***/
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  // if(!_.isNull(props.session)){
  //   return <Redirect to='/admin' />
  // }else{
    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-8/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
              <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                  <h6 className="text-blueGray-700 text-xl font-bold">{i18n.t("admin.modules.Gmodules")}</h6>
                  <button
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button" onClick={() => history.goBack()}
                  >
                    {i18n.t("admin.retour")}
                  </button>
                </div>
              </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              {i18n.t("admin.infoDetails")}
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    {i18n.t('admin.modules.table.nom')}
                  </label>
                  <input
                    type="text" disabled
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={( props.module && props.module.nom !== undefined)?  props.module.nom: ""}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    {i18n.t('admin.modules.table.classe')}
                  </label>
                  <input
                    type="text" disabled
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={( props.module && props.module.classe !== undefined)?  props.module.classe: ""}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    {i18n.t('admin.modules.table.idUtilisateur')}
                  </label>
                  <input
                    type="text" disabled
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={( props.module && props.module.idUtilisateur !== undefined)?  props.module.idUtilisateur?.nomComplet: ""}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    {i18n.t('admin.modules.table.description')}
                  </label>
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={( props.module && props.module.description !== undefined)?  props.module.description: ""}   
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <CardQuote />
          </div>
        </div>
      </>
    );
  // }
}


const mapStateToProps = (state) =>{
  return {
    session:state.session,
    authLoadingForm:state.authLoadingForm,
    loadingResource:state.loadingResource,
    module:state.module,
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
    getModule:(payload)=>{
      dispatch(getModule(payload))
    },

    set_module:(payload)=>{
      dispatch(set_module(payload))
    },
    set_modules:(payload)=>{
      dispatch(set_modules(payload))
    },
   

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ModuleInfo)

