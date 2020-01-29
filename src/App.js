import React from 'react';
import './App.scss';
import {Route} from 'react-router-dom';
import Contacts from './Containers/Contacts/Contacts';
import Add from './Containers/Add/Add';
import User from './Containers/User/User';
import Edit from './Containers/Edit/Edit';
import Login from './Containers/Login/Login';
import Registration from './Containers/Login/Registration';

import {BrowserRouter} from 'react-router-dom';


function App() {

  return (
    <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/registration" exact component={Registration} />


        <Route path="/contacts" exact component={Contacts} />
        <Route path="/add" exact component={Add} />
        <Route path="/user" exact component={User} />
        <Route 
          path="/user/:id"
          render={props =>
            <User {...props} />
          }
        />
        <Route 
          path="/edit/:id"
          render={props =>
            <Edit {...props} />
          }
        />
    </BrowserRouter>   
  );
 
}

export default App;
