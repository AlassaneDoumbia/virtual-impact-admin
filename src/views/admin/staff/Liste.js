import React, {useEffect } from "react";
// import React, {  useState, useEffect, lazy } from "react";
// import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useHistory} from 'react-router-dom'
import {navTo} from "helpers/helperFunctions";
// import Toast from "light-toast";
import {useSelector} from "react-redux";
import {setLoadingAuthForm} from 'store/actions/index';
import {getUsers, set_users, set_user} from 'store/actions/auth';
// import _ from 'lodash'
import {connect} from 'react-redux'
import CustomCardTable from "components/Cards/CustomCardTable";

const UserListe = (props) => {
    const {  i18n } = useTranslation();
    const history = useHistory()
    const accessToken = useSelector(state => state.accessToken)
    const headers = () => {
        return[
            i18n.t('admin.users.table.username'),
            i18n.t('admin.users.table.birthday'),
            i18n.t('admin.users.table.phone_number'),
            i18n.t('admin.users.table.email'),
            i18n.t('admin.users.table.nomCp')
        ]
    }

    useEffect(() => {
      props.set_users(null)
      props.getUsers(accessToken)
      props.set_user(null)    
      console.log("tab ::::",props.users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <CustomCardTable theadData={headers()} tbodyData={props.users ? props.users  : null} elt={5} color={"light"} 
              icon={"fas fa-user-plus"} addEndpoint={"/admin/user-form/"} navHeader={()=> navTo(history, "/admin/user-form/", { type: "admin" })} />
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
    users:state.users,
  }
}

const mapDispatchToProps = (dispatch)=>{

  return{
    setLoadingAuthForm: (val)=>{
      dispatch(setLoadingAuthForm(val))
    },
    getUsers:(val)=>{
      dispatch(getUsers(val))
    },
    set_users:(val)=>{
      dispatch(set_users(val))
    },
    set_user:(val)=>{
      dispatch(set_user(val))
    },
   

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserListe)
