import React, {useEffect } from "react";
// import React, {  useState, useEffect, lazy } from "react";
// import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useHistory} from 'react-router-dom'
import {navTo} from "helpers/helperFunctions";
// import Toast from "light-toast";
import {useSelector} from "react-redux";
import {setLoadingAuthForm} from 'store/actions/index';
import {getModules, deleteModule, set_module, set_modules} from 'store/actions/module/module';
// import _ from 'lodash'
import {connect} from 'react-redux'
// components
import CustomTableDropdown from "components/Dropdowns/CustomTableDropdown.js";

const addEndpoint = "/admin/module-form/"

const ModuleListe = (props) => {
    const {  i18n } = useTranslation();
    const history = useHistory()
    const accessToken = useSelector(state => state.accessToken)
    const headers = [
            // i18n.t('admin.modules.table.id'),
            i18n.t('admin.modules.table.nom'),
            i18n.t('admin.modules.table.description'),
            i18n.t('admin.modules.table.classe'),
            i18n.t('admin.modules.table.idUtilisateur'),
        ]
    
    const editClick = (val)=>{
      console.log(addEndpoint+''+val.identifiant)
      // let type = checkRoles(val.roles)
      navTo(history, addEndpoint+''+val.identifiant, { type: null })
    }
    
    const infoClick = (val)=>{
      console.log("val ::", val)
      navTo(history, '/admin/module-info/'+val.identifiant, { type: null })
    }
    const deleteClick = (val)=>{
      console.log("delete")
      console.log("val ::", val)
      const payload={"id":val.identifiant,"token":accessToken}
      props.deleteModule(payload)
    }

    useEffect(() => {
      props.set_modules(null)
      props.set_module(null)    
      props.getModules(accessToken)
      console.log("tab ::::",props.modules);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <div
              className={
                "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white" 
              }
            >
              <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                  <h6 className="text-blueGray-700 text-xl font-bold">{i18n.t("admin.liste")}</h6>
                  <button
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button" 
                    // onClick={navTo(history, "/admin/module-form/", null)}
                    onClick={() => navTo(history, "/admin/module-form", null)}
                  >
                  <i className="fas fa-user-plus"></i> 
                  {i18n.t("admin.added")}
                  </button>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr key={0}>
                    {(headers) &&
                        headers !== undefined && headers.length > 0
                            && headers?.map((item, i) => {
                              return(
                                <th
                                  className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                  }
                                >
                                  {item}
                                </th>
                              )               
                            })
                    }
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    (props.modules !== null) &&
                        props.modules !== undefined && props.modules.length > 0
                            && props.modules.map((item, i) => {
                                return(
                                    <tr key={i}>
                                      <td className={
                                            "px-6 align-middle py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                                          }>{item.nom}</td> 
                                      <td className={
                                            "px-6 align-middle py-3 text-xs uppercase border-l-0 border-r-0 font-semibold text-left "
                                          }>{item.description}</td> 
                                      <td className={
                                            "px-6 align-middle py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                                          }>{item.classe}</td> 
                                      <td className={
                                            "px-6 align-middle py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                                          }>{item.idUtilisateur.nomComplet}</td> 
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                    <CustomTableDropdown editClick={() => editClick(item)}  infoClick={() => infoClick(item)} 
                                      deleteClick={() => deleteClick(item)} />
                                  </td>
                              </tr>
                          )               
                        })   
                    }
                  </tbody>
                </table>
              </div>
            </div>
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
    modules:state.modules,
  }
}

const mapDispatchToProps = (dispatch)=>{

  return{
    setLoadingAuthForm: (val)=>{
      dispatch(setLoadingAuthForm(val))
    },
    getModules:(val)=>{
      dispatch(getModules(val))
    },
    deleteModule:(val)=>{
      dispatch(deleteModule(val))
    },
    set_modules:(val)=>{
      dispatch(set_modules(val))
    },
    set_module:(val)=>{
      dispatch(set_module(val))
    },
   

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ModuleListe)
