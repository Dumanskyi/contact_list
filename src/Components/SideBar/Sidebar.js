import React, { Component } from 'react';
import './Sidebar.scss';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';


class Sidebar extends Component {
  
  logout() {
    console.log(document.cookie)
    document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    console.log(document.cookie)
  }

  render(){
    return (
        <div className="Sidebar">
            <div className="header">
              Contact book
            </div>
            
            <div className="user">
              <div className="icon">
                <img src={ require('../../img/photo.jpg') } alt="user-some" />;
              </div>
              <div className="user-name">
                <div className="name">Warhol Andy</div>
                <div className="log-out">
                  <button>
                    <NavLink to="/"  onClick={this.logout}>All contacts</NavLink>
                  </button>
                </div>   
              </div>
              <div className="dotes-menu">
                <button><i className="fas fa-ellipsis-h"></i></button>
              </div>
            </div>

            <div className="search">
              <form>
                <input type="text" placeholder="Search a contact"></input>
              </form>
            </div>
        
            <div className="categories">
              <span className="list-name">CATEGORIES</span>
              <ul>
                <li>
                  <NavLink to="/layout/contacts" onClick={this.props.openSideBar}>All contacts</NavLink>
                </li>
                <li>
                  <NavLink to="/">Family</NavLink>
                </li>
                <li>
                  <NavLink to="/">Job</NavLink>
                </li> 
                
              </ul>
            </div>

        <div className="upcoming">
          <span>UPCOMING BIRTHDAY</span>

          {
            this.props.myContacts.map( contact => {
              if ( (moment(contact.birthday, "YYYY-MM-DD").format("DDD") - (moment().dayOfYear())) < 10 ) {
            
                return (
                  <div key={contact._id} className="person">
                  <div className="data">
                    <NavLink 
                      className="contact" 
                      to={`/layout/user/${contact._id}`}>
                        {contact.name} {contact.surname}<br />
                        {moment(contact.birthday, "YYYY-MM-DD").format("DD-MMM")}
                    </NavLink>
                    
                  </div>
                  
                </div>
                )
              } else {
                return undefined
              }
              
            })
          }

        </div>

        <div className="add-user">
          <button className="add-button">
            <NavLink to="/layout/add" onClick={this.props.openSideBar}>
              <i className="fas fa-plus-circle"></i> Add contact
            </NavLink>
          </button>
        </div>


      </div>
    )}
};


function mapStateToProps(state) {
  return {
    myContacts: state.other.myContacts,
    sideBarIsOpen: state.other.sideBarIsOpen,
  }
}

function mapDispatchToProps(dispatch){
  return {
    openSideBar: () => dispatch({type: 'OPEN'}),
    closeSideBar: () => dispatch({type: 'CLOSE'}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

