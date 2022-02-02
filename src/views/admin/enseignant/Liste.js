import React, { useEffect } from "react";
// import React, { useState, useEffect, lazy } from "react";
// import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useHistory} from 'react-router-dom'
import {navTo} from "helpers/helperFunctions";
// import Toast from "light-toast";
import {getEnseignants,set_enseignants, set_enseignant, deleteEnseignant} from 'store/actions/enseignant/enseignant';
import {useSelector} from "react-redux";
import {setLoadingAuthForm} from 'store/actions/index';
import {setFormValid} from 'store/actions/auth';
// import _ from 'lodash'
import {connect} from 'react-redux'
// import CardTable from "components/Cards/CardTable.js";
// import CustomCardTable from "components/Cards/CustomCardTable";
import CustomTableDropdown from "components/Dropdowns/CustomTableDropdown.js";

const EnseignantListe = (props) => {
  const {  i18n } = useTranslation();
  const history = useHistory()
  const accessToken = useSelector(state => state.accessToken)
//   const [loginInfo, setLoginInfo] = useState({
//     login:"",
//     password:""
//   })

  const editClick = (val)=>{
    console.log('/admin/enseignant-form/'+val.identifiant)
    // let type = checkRoles(val.roles)
    navTo(history, '/admin/enseignant-form/'+val.identifiant, { type: null })
  }

  const infoClick = (val)=>{
    console.log("val ::", val)
    navTo(history, '/admin/enseignant-info/'+val.identifiant, { type: null })
  }
  const deleteClick = (val)=>{
    console.log("delete")
    console.log("val ::", val)
    const payload={"id":val.identifiant,"token":accessToken}
    props.deleteEnseignant(payload)
  }
  const headers = () => {
      return[
          i18n.t('admin.users.table.id'),
          i18n.t('admin.users.table.birthday'),
          i18n.t('admin.users.table.phone_number'),
          i18n.t('admin.users.table.email'),
          i18n.t('admin.users.table.nomCp')
      ]
  }

  useEffect(() => {
      props.setFormValid(false)
      props.set_enseignant(null)
      props.set_enseignants(null)
      props.getEnseignants(accessToken)
      let tab = props.enseignants
      console.log("tab ::::",tab);
      // console.log(_.isUndefined(tab) ? null : Object.values(tab[0]) );
      // console.log(tab[0].values);
      // console.log(Object.values(tab[0]));
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
                  // onClick={navTo(history, "/admin/enseignant-form/", null)}
                  onClick={() => navTo(history, "/admin/enseignant-form", null)}
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
                  {(headers()) &&
                      headers() !== undefined && headers().length > 0
                          && headers()?.map((item, i) => {
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
                  (props.enseignants !== null) &&
                      props.enseignants !== undefined && props.enseignants.length > 0
                          && props.enseignants.map((item, i) => {
                        return(
                            <tr key={i}>
                              <td className={
                                    "px-6 align-middle py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                                  }>{item.login}</td> 
                              <td className={
                                    "px-6 align-middle py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                                  }>{item.birthday}</td> 
                              <td className={
                                    "px-6 align-middle py-3 text-xs uppercase border-l-0 border-r-0 font-semibold text-left "
                                  }>{item.numero}</td> 
                              <td className={
                                    "px-6 align-middle py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                                  }>{item.email}</td> 
                              <td className={
                                    "px-6 align-middle py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                                  }>{item.nomComplet}</td> 
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
          {/* <CardTable />
          <CustomCardTable theadData={headers()} tbodyData={props.enseignants} elt={5} color={"light"} 
            icon={"fas fa-user-plus"} addEndpoint={"/admin/enseignant-form"} navHeader={()=> navTo(history, "/admin/enseignant-form/", { type: "admin" })} /> */}
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
    enseignants:state.enseignants,
  }
}

const mapDispatchToProps = (dispatch)=>{

  return{
    setLoadingAuthForm: (val)=>{
      dispatch(setLoadingAuthForm(val))
    },
    getEnseignants:(val)=>{
      dispatch(getEnseignants(val))
    },
    set_enseignants:(val)=>{
      dispatch(set_enseignants(val))
    },
    set_enseignant:(val)=>{
      dispatch(set_enseignant(val))
    },
    setFormValid:(val)=>{
      dispatch(setFormValid(val))
    },
    deleteEnseignant:(val)=>{
      dispatch(deleteEnseignant(val))
    },
   

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EnseignantListe)


// import React from "react";

// // components

// import CardSettings from "components/Cards/CardSettings.js";
// import CardProfile from "components/Cards/CardProfile.js";

// export default function Liste() {
//   return (
//     <>
//       <div className="flex flex-wrap">
//         <div className="w-full lg:w-8/12 px-4">
//           <CardSettings />
//         </div>
//         <div className="w-full lg:w-4/12 px-4">
//           <CardProfile />
//         </div>
//       </div>
//     </>
//   );
// }
