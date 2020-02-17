import React, { Component } from "react";
import "./Category.scss";
import { connect } from "react-redux";
import { fetchContacts, fetchDeleteContact } from '../../store/actions/contacts';
import Contact from '../../Components/contact/contact';
import Loader from '../../Components/UI/loader/loader'


class Category extends Component {
  constructor(props) {
    super(props);
    
    this.delete = this.delete.bind(this);
    this.readContact = this.readContact.bind(this);
    this.editContact = this.editContact.bind(this)
  }

  componentDidMount() {
    if (this.props.myContacts.length === 0){
      this.props.fetchContacts()
    }
  }

  delete(userID) {
    this.props.fetchDeleteContact(userID)
  }

  readContact(userID) {
    this.props.history.push(`/layout/user/${userID}`);
  }

  editContact(userID) {
    this.props.history.push(`/layout/edit/${userID}`);
  }

  renderContacts() {
    return this.props.myContacts.map(contact => {
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

            <div className="content">
                {
                  this.props.loading
                  ? 
                  <Loader />
                  :  this.renderContacts()      
                }              
                      
            </div>
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