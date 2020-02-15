import React, { Component } from "react";
import "./Contacts.scss";
import { connect } from "react-redux";
import { fetchContacts, fetchDeleteContact } from '../../store/actions/contacts'
import Loader from '../../Components/UI/loader/loader'


class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      data: ""
    };

    this.delete = this.delete.bind(this);
    this.readContact = this.readContact.bind(this);
  }

  componentDidMount() {

    console.log(this.props.myContactsFull)
    if (this.props.myContacts.length === 0){
      this.props.fetchContacts()
    }
  }

  delete(userID) {
    this.props.fetchDeleteContact(userID)
  }

  readContact(userID) {
    const prop = this.props;
    prop.history.push(`/layout/user/${userID}`);
  }

  editContact(userID) {
    const prop = this.props;
    prop.history.push(`/layout/edit/${userID}`);
  }

  renderContacts() {
    return this.props.myContacts.map(contact => {
        return (
          <div key={contact._id} className="contact">
            <div className="photo">
              <img alt=""></img>
            </div>
            <div
              className="data"
              onClick={() => this.readContact(contact._id)}
            >
              {contact.name} {contact.surname}
              <br></br>
            </div>

            <div className="menu active">
              <button className="drop-down">
                <i className="fas fa-ellipsis-h"></i>
              </button>
              <div className="drop-down-content">
                <div className="Read">
                  <div
                    className="block"
                    onClick={() => this.readContact(contact._id)}
                  >
                    Read
                  </div>
                </div>
                <div className="name">
                  <div
                    className="block"
                    onClick={() => this.editContact(contact._id)}
                  >
                    Edit
                  </div>
                </div>
                <div
                  className="block"
                  onClick={() => this.delete(contact._id)}
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
