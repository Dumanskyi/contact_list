import React, { Component } from 'react';
import './Sidebar.scss';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchAddCategory, fetchCategories, fetchDeleteCategory } from '../../store/actions/categories';
import Loader from '../../Components/UI/loader/loader'



class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }

    this.onChangeName = this.onChangeName.bind(this);
    // this.addCategory = this.addCategory.bind(this);

  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  onChangeName(event){
    this.setState({name: event.target.value});
    console.log(this.state.name)
  }
   
  // addCategory(event) {
  //   event.preventDefault();
  //   let category = {
  //     name: this.state.name
  //   };
  //   console.log(category)
  //   this.props.fetchAddCategory(category)
  // }

  logout() {
    document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  }

  renderCategories() {
      return this.props.myCategories.map(category => {
          // console.log(category._id)
          return (
            <li key={category._id}>
              <NavLink to="/layout/contacts" onClick={this.props.openSideBar}>{category.name}</NavLink>
              <button onClick={() => this.props.fetchDeleteCategory(category._id)}>
                <i className="fas fa-times"></i>
              </button>
            </li>
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
                <img src={ require('../../img/photo.jpg') } alt="user-some" />;
              </div>
              <div className="user-name">
                <div className="name">Warhol Andy</div>
                <div className="log-out">
                  <button>
                    <NavLink to="/"  onClick={this.logout}>Log out</NavLink>
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
                      {
                        this.props.loading && this.props.myCategories !== 0
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
    loading: state.categories.categoreisIsLoading,
    myCategories: state.categories.myCategories,
    error: state.categories.error
  }
}

function mapDispatchToProps(dispatch){
  return {
    openSideBar: () => dispatch({type: 'OPEN'}),
    closeSideBar: () => dispatch({type: 'CLOSE'}),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchAddCategory: (category) => dispatch(fetchAddCategory(category)),
    fetchDeleteCategory: (categoryID) => dispatch(fetchDeleteCategory(categoryID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

