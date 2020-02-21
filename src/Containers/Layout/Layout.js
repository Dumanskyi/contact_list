import React, {Component} from 'react';
import './Layout.scss';
import {Route, Switch} from 'react-router-dom';
import { connect } from "react-redux";
import Sidebar from "../../Components/SideBar/Sidebar";
import Contacts from '../Contacts/Contacts';
import Add from '../Add/Add';
import User from '../User/User';
import Edit from '../Edit/Edit';
import Category from '../Category/Category'


class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {};
      }

    render() {
        return (
            <div className={this.props.sideBarIsOpen ? "Layout open" : "Layout"}>

                <Sidebar />
                
                <Switch>
                    <Route path="/layout/contacts" component={Contacts} />

                    <Route path="/layout/add" component={Add} />

                    <Route 
                        path="/layout/category/:id"
                        render={props =>
                        <Category {...props} />
                        }
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

            </div>
                
        );
    }
  }

  function mapStateToProps(state) {
    return {
      sideBarIsOpen: state.other.sideBarIsOpen
    };
  }
  
  export default connect(mapStateToProps)(Layout);