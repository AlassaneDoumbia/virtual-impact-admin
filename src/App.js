import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {connect} from "react-redux";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

// import Landing from "views/Landing.js";
// import Profile from "views/Profile.js";
// import Index from "views/Index.js";

class Home extends React.Component {
    
    async componentDidMount() {
      console.log(window.location.hostname);
        // const payload={"data":{"refresh":this.props.refreshToken},"token":this.props.accessToken}
        //     this.props.updateRefreshToken(payload)
        // setInterval(() => {
        //     const payload={"data":{"refresh":this.props.refreshToken},"token":this.props.accessToken}
        //     console.log('This will run every 4 minutes!');
        //     this.props.updateRefreshToken(payload)
        // }, 480000);
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                {/* add routes with layouts */}
                    <Route path="/admin" component={Admin} />
                    <Route path="/auth" component={Auth} />
                    {/* add routes without layouts */}
                    {/* <Route path="/landing" exact component={Landing} />
                    <Route path="/profile" exact component={Profile} />
                    <Route path="/" exact component={Index} /> */}
                    {/* add redirect for first page */}
                    <Redirect from="*" to="/admin" />
                </Switch>
            </BrowserRouter>
        );
      }
    
}

const mapStateToProps = (state) =>{
    //console.log(state.loadingForm)
    return {
      session:state.session,
      accessToken:state.accessToken,
      refreshToken:state.refreshToken,
  
    }
  }
  
  const mapDispatchToProps = (dispatch)=>{
  
    return{
    //   updateRefreshToken:(payload)=>{
    //     dispatch(updateRefreshToken(payload))
    //   },
    //   setTokenStaffs:(payload)=>{
    //     dispatch(setTokenStaffs(payload))
    //   },
  
  
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Home)
  