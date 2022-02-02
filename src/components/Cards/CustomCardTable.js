/* eslint-disable array-callback-return */
import React from "react";
import { useTranslation } from 'react-i18next';
import { useHistory} from 'react-router-dom'
// import PropTypes from "prop-types";
// import _ from 'lodash'
import {connect} from 'react-redux'

// components
import CustomTableDropdown from "components/Dropdowns/CustomTableDropdown.js";

import {checkRoles, navTo} from "helpers/helperFunctions";
//  color="dark" 
// export default function CardTable({ color }) {

const CustomCardTable = ({ theadData, tbodyData, elt , color, addEndpoint, icon, navHeader}) => {

  const {i18n } = useTranslation();
  const history = useHistory()
  console.log(" custom data ",tbodyData);

  const editClick = (val)=>{
    console.log(addEndpoint+''+val.identifiant)
    let type = checkRoles(val.roles)
    console.log("val ::", val.roles)
    console.log("type ::", type)
    navTo(history, addEndpoint+''+val.identifiant, { type: type })
    // history.push({
    //     pathname: addEndpoint+''+val.identifiant,
    //     state: { type: type }
    // });
  }
  
  const infoClick = (val)=>{
    console.log("info")
    console.log("val ::", val)
  }
  const deleteClick = (val)=>{
    console.log("delete")
    console.log("val ::", val)
  }
  // console.log(tbodyData.length );
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        {/* <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                {i18n.t("admin.liste")}
              </h3>
              <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                Settings
              </button>
            </div>
          </div>
        </div> */}
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">{i18n.t("admin.liste")}</h6>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button" onClick={navHeader}
            >
             <i className={icon}></i> {i18n.t("admin.added")}
            </button>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
              {(theadData) ?
                  theadData !== undefined && theadData.length > 0
                      && theadData?.map((item, i) => {
                        return(
                          <th
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                            }
                          >
                            {item}
                          </th>
                        )               
                      }):
                      () =>{
                          return(
                              <div>No Element</div>
                          )
                      }
              }
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  {/* {i18n.t("admin.action")} */}
                </th>
              </tr>
            </thead>
            <tbody>
            {
              (tbodyData !== null) ?
              tbodyData !== undefined && tbodyData.length > 0
                  && tbodyData.map((item, i) => {
                      return(
                          <tr key={i}>
                            {Object.values(item)?.map((val,i) => {
                             
                             if (i > 0 && i <= elt) {
                               return(
                                <td className={
                                  "px-6 align-middle py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                                }>{val !== null ? val.toString() : ""}</td> 
                                )
                             }
                              // <><>
                              // <td className={"px-6 align-middle py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "}>
                              //   <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                              //     <i className="fas fa-heart"></i>
                              //   </button>
                              // </td> 
                              
                              
                                
                            })}  
                             {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"> */}
                             <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                <CustomTableDropdown editClick={() => editClick(item)}  infoClick={() => infoClick(item)} 
                                  deleteClick={() => deleteClick(item)} />
                              </td>
                          </tr>
                      )               
              }):
              () =>{
                  return(
                    <tr key={1}>
                      <td>No Element</td>
                    </tr>
                      
                  )
              }   
          }
            </tbody>
          </table>
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
  }
}

const mapDispatchToProps = (dispatch)=>{

  return{
    // setLoadingAuthForm: (val)=>{
    //   dispatch(setLoadingAuthForm(val))
    // },
    // setSession:(val)=>{
    //   dispatch(setSession(val))
    // },
    // setEmailLogin:(payload)=>{
    //   dispatch(setEmailLogin(payload))
    // },
   

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomCardTable)

