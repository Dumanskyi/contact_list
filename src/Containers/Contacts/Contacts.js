import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchContacts, fetchDeleteContact } from '../../store/actions/contacts'
import { closeSideBar } from '../../store/actions/other'
import Contact from '../../Components/contact/contact'
import Loader from '../../Components/UI/loader/loader'
import Search from '../../Components/UI/search/search'
import "./Contacts.scss"

const Contacts = props => {

  const [text, setText] = useState('');

  const loader = useSelector(state => state.contacts.loading)
  const myContacts = useSelector(state => state.contacts.myContacts)

  const dispatch = useDispatch();
  
  useEffect(() => {
    if (myContacts.length === 0){
          dispatch(fetchContacts())
        }
  }, [])

  const deleteContact = userID => {
    dispatch(fetchDeleteContact(userID))
  }

  const readContact = userID => {
    props.history.push(`/layout/user/${userID}`)
  }

  const editContact = userID => {
    props.history.push(`/layout/edit/${userID}`)
  }

  const onSearchChange = text => {
     setText(text)
  }

  const search = (users, text) => {
  if (text.length === 0) {
      return users
  }

  return users.filter( user => {
    return  (user.surname.toLowerCase().includes(text.toLowerCase())) || (user.name.toLowerCase().includes(text.toLowerCase())) 
      })
  }

  const renderContacts = () => {
    const visibleUsers = search(myContacts, text)
    return visibleUsers.map(contact => {
        return (
          <Contact
            readContact={readContact}
            editContact={editContact}
            delete={deleteContact}
            contact={contact}
            key={contact._id}
          />
        );
      })
  }

  return (
    <div className="Contacts">

    <div className="header">
      <div className="burger">
        <button>
          <i
            className="fas fa-bars"
            onClick={() => dispatch(closeSideBar())}
          ></i>
        </button>
      </div>
      <div className="center">All contacts</div>
      <div className="option">
      </div>
      </div>
        {
          loader
          ? <Loader />
          :  
            <div className="content">
            <Search
              onSearchChange={onSearchChange}
            />
            <div className="users">
              {renderContacts()}
            </div>
            </div>      
        }                 
    </div>
  )
}

export default Contacts;