import React, { Component } from "react";
import "./Contacts.scss";
import { connect } from "react-redux";
import Sidebar from "../SideBar/Sidebar";

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

  delete(userID) {
    const urlDelete = "phonebook/" + userID;
    const prop = this.props;

    fetch(urlDelete, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        console.log(response);
        return response.json();
      })
      .then(function(data) {
        prop.deleteUser(userID);
        alert(data.message);
      });
  }

  readContact(userID) {
    const urlRead = "phonebook/" + userID;
    const prop = this.props;

    // let index = prop.myFullContacts.findIndex(el => el._id === userID);
    // if (index === -1) {
      fetch(urlRead, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          prop.getUserFullInfo(data);
          prop.history.push(`/user/${userID}`);
          console.log(prop);
        });
    // } else {
    //   prop.history.push(`/user/${userID}`);
    //   console.log(prop);
    // }
  }

  editContact(userID) {
    const urlRead = "/phonebook/" + userID;
    const prop = this.props;

    // let index = prop.myFullContacts.findIndex(el => el._id === userID);
    // if (index === -1) {
      fetch(urlRead, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          prop.getUserFullInfo(data);
          prop.history.push(`/edit/${userID}`);
          console.log(prop);
        });
    // } else {
    //   prop.history.push(`/edit/${userID}`);
    //   console.log(prop);
    // }
  }

  render() {
    return (
      <div className={this.props.sideBarIsOpen ? "Contacts open" : "Contacts"}>
        <Sidebar />

        <div className="module">
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
              {/* <button><i className="fas fa-ellipsis-h"></i></button> */}
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    myContacts: state.myContacts,
    myFullContacts: state.myFullContacts,
    sideBarIsOpen: state.sideBarIsOpen
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openSideBar: () => dispatch({ type: "OPEN" }),
    closeSideBar: () => dispatch({ type: "CLOSE" }),
    deleteUser: userID => dispatch({ type: "DELETE_USER", payload: userID }),
    getUserFullInfo: userData =>
      dispatch({ type: "GET_USER_FULL_INFO", payload: userData })
  };
}

// addUser: (newUser) => dispatch({type: 'ADD_USER', payload: newUser})

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
