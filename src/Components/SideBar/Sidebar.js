import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import {NavLink} from 'react-router-dom'
import { fetchCategories } from '../../store/actions/categories'
import { clearContacts } from '../../store/actions/contacts'
import { openSideBar } from '../../store/actions/other'
import Loader from '../../Components/UI/loader/loader'
import './Sidebar.scss'

const Sidebar = () => {

  const loadingCategories = useSelector(state => state.categories.loadingCategories)
  const myCategories = useSelector(state => state.categories.myCategories)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories()).then((res) => console.log(res))
  }, [])

  console.log(myCategories)

  const logout = () => {
    dispatch(clearContacts())
    document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  }

  const renderCategories = () => {
      return myCategories.map( (category, index) => {
          return (
            <NavLink
              key={index}  
              to={`/layout/category/${category._id}`}
              onClick={() => dispatch(openSideBar())}
            >
              <li>{category.name}</li>
            </NavLink>          
          )
    })
  }
   
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
                    <NavLink to="/"  onClick={logout}>Log out</NavLink>
                  </button>
                </div>   
              </div>
            </div>
        
            <div className="categories">
              <span className="list-name">CATEGORIES</span>
              <ul>
                  <NavLink 
                    to="/layout/contacts"
                    onClick={() => dispatch(openSideBar())}
                  >
                    <li>All contacts</li>
                  </NavLink>

                  {
                    loadingCategories && myCategories !== 0
                    ? <Loader />
                    :  renderCategories()      
                  }  
              </ul>
            </div>

            <div className="add-user">
              <button className="add-button">
                <NavLink to="/layout/add" onClick={() => dispatch(openSideBar())}>
                  <i className="fas fa-plus-circle"></i> Add contact
                </NavLink>
              </button>
            </div>
      </div>
  )
};

export default Sidebar;



