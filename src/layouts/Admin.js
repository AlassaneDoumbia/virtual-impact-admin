import React from "react";
import {connect} from 'react-redux'
import _ from 'lodash'
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
// import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
// import Tables from "views/admin/Tables.js";
// Enseignant import
import EnseignantForm from "views/admin/enseignant/Form";
import EnseignantInfo from "views/admin/enseignant/Info";
import EnseignantListe from "views/admin/enseignant/Liste";
// Module import
import ModuleListe from "views/admin/module/Liste";
import ModuleForm from "views/admin/module/Form";
import ModuleInfo from "views/admin/module/Info";
// Chapitre import
import ChapitreListe from "views/admin/chapitre/Liste";
import ChapitreForm from "views/admin/chapitre/Form";
import ChapitreInfo from "views/admin/chapitre/Info";

// User import
import UserListe from "views/admin/staff/Liste";
import UserForm from "views/admin/staff/Form";
// import Enseignants from "views/admin/enseignant/Enseignants.js"

// { path: '/users/:id', exact: true, name: 'User Details', component: User },
// export default function Admin() {

const Admin = (props) => {

  if(_.isNull(props.session)){
    return <Redirect to='/auth/login' />
  }else{
    return (
      <>
        <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
          <AdminNavbar />
          {/* Header */}
          <HeaderStats />
          <div className="px-4 md:px-10 mx-auto w-full -m-24">
            <Switch>
              <Route path="/admin/dashboard" exact component={Dashboard} />
              {/* user path */}
              <Route path="/admin/users" exact component={UserListe} />
              <Route path="/admin/user-form" exact component={UserForm} />
              <Route path="/admin/user-form/:id" exact component={UserForm} />
              {/* module path */}
              <Route path="/admin/modules" exact component={ModuleListe} />
              <Route path="/admin/module-form" exact component={ModuleForm} />
              <Route path="/admin/module-form/:id" exact component={ModuleForm} />
              <Route path="/admin/module-info/:id" exact component={ModuleInfo} />
              {/* chapitre path */}
              <Route path="/admin/chapitres" exact component={ChapitreListe} />
              <Route path="/admin/chapitre-form" exact component={ChapitreForm} />
              <Route path="/admin/chapitre-form/:id" exact component={ChapitreForm} />
              <Route path="/admin/chapitre-info/:id" exact component={ChapitreInfo} />
              {/* enseignants path */}
              <Route path="/admin/enseignants" exact component={EnseignantListe} />
              <Route path="/admin/enseignant-form" exact component={EnseignantForm} />
              <Route path="/admin/enseignant-form/:id" exact component={EnseignantForm} />
              <Route path="/admin/enseignant-info" exact component={EnseignantInfo} />
              <Route path="/admin/enseignant-info/:id" exact component={EnseignantInfo} />
              <Route path="/admin/settings" exact component={Settings} />
              
              {/* <Route path="/admin/maps" exact component={Maps} />
              <Route path="/admin/tables" exact component={Tables} /> */}
              <Redirect from="/admin" to="/admin/dashboard" />
            </Switch>
            <FooterAdmin />
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
  }
}

const mapDispatchToProps = (dispatch)=>{

  return{

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Admin)