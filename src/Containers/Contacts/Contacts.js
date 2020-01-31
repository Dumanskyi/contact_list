import React, { Component } from "react";
import "./Contacts.scss";
import { connect } from "react-redux";
import { fetch_request } from "../../common/helpers";


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
    const prop = this.props;
    const urlContacts = "phonebook";

    fetch_request(urlContacts, "GET").then(function(data) {
      prop.addUsers(data);
    });
  }

  delete(userID) {
    
    const urlDelete = "phonebook/" + userID;
    const prop = this.props;

    fetch_request(urlDelete, "DELETE").then(function(data) {
        prop.deleteUser(userID);
        alert(data.message);
    });
  }

  readContact(userID) {

    console.log(userID)
    const prop = this.props;
    prop.history.push(`/layout/user/${userID}`);
  }

  editContact(userID) {
    console.log(userID)
    const prop = this.props;
    prop.history.push(`/layout/edit/${userID}`);
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
              {this.props.myContacts.map(contact => {
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
              })}
            </div>

        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    myContacts: state.myContacts,
    myFullContacts: state.myFullContacts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openSideBar: () => dispatch({ type: "OPEN" }),
    closeSideBar: () => dispatch({ type: "CLOSE" }),
    deleteUser: userID => dispatch({ type: "DELETE_USER", payload: userID }),
    getUserFullInfo: userData => dispatch({ type: "GET_USER_FULL_INFO", payload: userData }),
    addUsers: allContacts => dispatch({ type: "ALL_CONTACTS", payload: allContacts }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
