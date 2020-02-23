import React, { Component } from 'react';
import './Sidebar.scss';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchCategories } from '../../store/actions/categories';
import Loader from '../../Components/UI/loader/loader'

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {}

    this.logout = this.logout.bind(this); 
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  logout () {
    this.props.clearContacts()
    document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  }

  renderCategories() {
      return this.props.myCategories.map( (category, index) => {
          return (
            <NavLink
              key={index}  
              to={`/layout/category/${category._id}`}
              onClick={this.props.openSideBar}
            >
              <li>{category.name}</li>
            </NavLink>          
          )
    })
  }
 
  render(){
    return (
      <div className="Sidebar">

            <div className="header">
              Contact book
            </div>
            
            <div className="user">
              <div className="icon">
                <i className="fas fa-pencil-alt"></i>
              </div>
              <div className="user-name">
                <div className="name">Your contacts</div>
                <div className="log-out">
                  <button>
                    <NavLink to="/"  onClick={this.logout}>Log out</NavLink>
                  </button>
                </div>   
              </div>
            </div>
        
            <div className="categories">
              <span className="list-name">CATEGORIES</span>
              <ul>
                  <NavLink 
                    to="/layout/contacts"
                    onClick={this.props.openSideBar}
                  >
                    <li>All contacts</li>
                  </NavLink>

                  {
                    this.props.loadingCategories && this.props.myCategories !== 0
                    ? <Loader />
                    :  this.renderCategories()      
                  }  
              </ul>
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
    sideBarIsOpen: state.other.sideBarIsOpen,
    loadingCategories: state.categories.categoreisIsLoading,
    myCategories: state.categories.myCategories,
    error: state.categories.error
  }
}

function mapDispatchToProps(dispatch){
  return {
    openSideBar: () => dispatch({type: 'OPEN'}),
    closeSideBar: () => dispatch({type: 'CLOSE'}),
    clearContacts: () => dispatch({type: 'CLEAR_CONTACTS'}),
    fetchCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

