import React from 'react';
import './App.scss';
import {Route} from 'react-router-dom';
import Contacts from './Contacts/Contacts';
import Add from './Add/Add';
import User from './User/User';
import Edit from './Edit/Edit';
import Login from './Login/Login';
import Registration from './Login/Registration';

import {BrowserRouter} from 'react-router-dom';


function App() {

  return (
    <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/contacts" exact component={Contacts} />
        <Route path="/add" exact component={Add} />
        <Route path="/user" exact component={User} />
        <Route path="/registration" exact component={Registration} />
        <Route 
          path="/user/:id"
          // exact 
          render={props =>
            <User {...props} />
          }
          // component={User}
        />
        <Route 
          path="/edit/:id"
          // exact 
          render={props =>
            <Edit {...props} />
          }
          // component={User}
        />
    </BrowserRouter>   
  );
 
}

export default App;
