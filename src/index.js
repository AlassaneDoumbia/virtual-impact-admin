import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import {Provider} from 'react-redux'
import configureStore from './store/storeConfig'
import throttle from 'lodash.throttle'
import {saveState} from "./helpers/helperFunctions";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import Home from './App'
// layouts


const store = configureStore();


store.subscribe(throttle(()=>{
     saveState(store.getState())
    },500)
);

ReactDOM.render(
  // <Provider store={store}>
  //   <BrowserRouter>
  //     <Switch>
  //       {/* add routes with layouts */}
  //       <Route path="/admin" component={Admin} />
  //       <Route path="/auth" component={Auth} />
  //       {/* add routes without layouts */}
  //       <Route path="/landing" exact component={Landing} />
  //       <Route path="/profile" exact component={Profile} />
  //       <Route path="/" exact component={Index} />
  //       {/* add redirect for first page */}
  //       <Redirect from="*" to="/" />
  //     </Switch>
  //   </BrowserRouter>
  // </Provider>
  <Provider store={store}>
        <React.StrictMode>
            <Router>
                <Switch>
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        </React.StrictMode>
    </Provider>
  ,
  document.getElementById("root")
);
