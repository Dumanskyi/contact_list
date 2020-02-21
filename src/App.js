import React from 'react';
import './App.scss';
import {Route, Switch} from 'react-router-dom';
import Login from './Containers/Login/Login';
import Registration from './Containers/Login/Registration';
import Layout from './Containers/Layout/Layout';
import User from './Containers/User/User';
import Edit from './Containers/Edit/Edit';


function App() {

  return (
    
    <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/registration" exact component={Registration} />
        <Route path="/layout/contacts" exact component={Layout} />
        <Route path="/layout/add" exact component={Layout} />

        <Route 
            path="/layout/category/:id"
            component={Layout}
        />

        <Route 
            path="/layout/edit/:id"
            render={props =>
            <Edit {...props} />
            }
        />
        
        <Route 
            path="/layout/user/:id"
            render={props =>
            <User {...props} />
            }
        />
        
    </Switch>
      
  );
 
}

export default App;
