import React, { Component } from "react";
import "./Category.scss";
import { connect } from "react-redux";
import { fetchContacts, fetchDeleteContact } from '../../store/actions/contacts';
import Contact from '../../Components/contact/contact';
import Loader from '../../Components/UI/loader/loader';
import Search from '../../Components/UI/search/search'


class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  componentDidMount() {
    if (this.props.myContacts.length === 0){
      this.props.fetchContacts()
    }
  }

  delete = (userID) => {
    this.props.fetchDeleteContact(userID)
  }

  readContact = (userID) => {
    this.props.history.push(`/layout/user/${userID}`);
  }

  editContact = (userID) => {
    this.props.history.push(`/layout/edit/${userID}`);
  }

  onSearchChange = (text) => {
    this.setState({ text })
  }

  search = (users, text) => {
    if (text.length === 0) {
      return users
    }

    return users.filter( (user) => {
      return ( (user.surname.toLowerCase().includes(text.toLowerCase())) || (user.name.toLowerCase().includes(text.toLowerCase()))   )    
    })
  }

  renderContacts() {

    const visibleUsers = this.search(this.props.myContacts, this.state.text)
    return visibleUsers.map(contact => {
        if (contact.category.hasOwnProperty('_id')) {
          contact.category = contact.category._id
        }

        if (contact.category === this.props.match.params.id) {
            return (
                <Contact
                  readContact={this.readContact}
                  editContact={this.editContact}
                  delete={this.delete}
                  contact={contact}
                  key={contact._id}
                />
              );
        } else {
            return null
        }
      })
  }

  render() {
    return (
        <div className="Contacts">

            <div className="header">
              <div className="burger">
                <button>
                  <i
                    className="fas fa-bars"
                    onClick={this.props.closeSideBar}
                  ></i>
                </button>
              </div>
              <div className="center">All contacts</div>
              <div className="option">
              </div>
            </div>

            {
              this.props.loading
              ? <Loader />
              :  
                <div className="content">
                <Search
                  onSearchChange={this.onSearchChange}
                />
                <div className="users">
                  {this.renderContacts()}
                </div>
                </div>      
            }   
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.contacts.loading,
    myContacts: state.contacts.myContacts,
    myContactsFull: state.contacts.myContactsFull,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openSideBar: () => dispatch({ type: "OPEN" }),
    closeSideBar: () => dispatch({ type: "CLOSE" }),
    fetchContacts: () => dispatch(fetchContacts()),
    fetchDeleteContact: userID => dispatch(fetchDeleteContact(userID)), 
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);