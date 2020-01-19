import React, { Component } from "react";
import "./Edit.scss";
import Sidebar from "../SideBar/Sidebar";
import { connect } from "react-redux";
import { fetch_request } from "../common/helpers";
import {NavLink} from 'react-router-dom';

class Edit extends Component {
  constructor(props) {
    super(props);

    const userId = this.props.match.params.id;
    const usersData = this.props.myFullContacts;
    const userData = usersData.find(user => user._id === userId);

    this.state = userData;
    
    this.state.year = userData.bornDate.slice(0,4);
    this.state.month = userData.bornDate.slice(5,7);
    this.state.date = userData.bornDate.slice(8,10);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);

    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeMonth = this.onChangeMonth.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.onChangeInformation = this.onChangeInformation.bind(this);

    this.submitFunction = this.submitFunction.bind(this);
  }

  onChangeName(event) {
    this.setState({ name: event.target.value });
  }

  onChangeSurname(event) {
    this.setState({ surname: event.target.value });
  }

  onChangePhone(event) {
    let phoneArr = [];
    let obj = {};
    obj = { ...obj, value: event.target.value };
    phoneArr = [...phoneArr, obj];
    this.setState({ phone: phoneArr });
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onChangeYear(event) {
    this.setState({ year: event.target.value });
  }

  onChangeMonth(event) {
    this.setState({ month: event.target.value });
  }

  onChangeDate(event) {
    this.setState({ date: event.target.value });
  }

  onChangePosition(event) {
    this.setState({ position: event.target.value });
  }

  onChangeInformation(event) {
    this.setState({ information: event.target.value });
  }

  submitFunction(event) {
    event.preventDefault();
    let prop = this.props;
    let userID = prop.match.params.id;
    let urlUser = "phonebook/" + userID;

    const user = {
      name: this.state.name,
      surname: this.state.surname,
      phone: this.state.phone,
      email: this.state.email,
      bornDate: `${this.state.year}-${this.state.month}-${this.state.date}`, 
      position: this.state.position,
      information: this.state.information,
    };

    user._id = userID;
    fetch_request(urlUser, "PUT", user).then(function(data) {

      let obj = {
        data,
        Id : userID
      }
      prop.editUser(obj);
      prop.editUserFull(obj);
      prop.history.push("/contacts");
    });
  }

  render() {
    return (
      <div className={this.props.sideBarIsOpen ? "Add open" : "Add"}>
        <Sidebar />

        <div className="module">
          <div className="header">
            <div className="burger">
            </div>
            <div className="center">Edit contact</div>
            <div className="option">
                <NavLink to="/contacts">
                  <i className="fas fa-times"></i>
                </NavLink>
            </div>
          </div>

          <div className="content">
            <div className="photo">
              <img src={require("../img/picture.jpg")} alt="user-some-alt" />
            </div>

            <div className="add-form">
              <form onSubmit={this.submitFunction}>
                <div className="info-line">
                  <label htmlFor="user-name">Name</label>
                  <br />
                  <input
                    type="text"
                    id="user-name"
                    name="user-name"
                    placeholder="Type name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                  />
                </div>

                <div className="info-line">
                  <label htmlFor="user-surname">Surname</label>
                  <br />
                  <input
                    type="text"
                    id="user-surname"
                    name="user-surname"
                    placeholder="Type surname"
                    value={this.state.surname}
                    onChange={this.onChangeSurname}
                  />
                </div>

                <div className="info-line">
                  <label htmlFor="phone">Phone</label>
                  <br />
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="+38(XXX)-XXX-XX-XX"
                    value={this.state.phone[0].value}
                    onChange={this.onChangePhone}
                  />
                </div>

                <div className="info-line">
                  <label htmlFor="email">Email</label>
                  <br />
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Type Email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  />
                </div>

                <div className='info-line'>Birthday date</div>
                  <div className='info-birthday'>
                     <div className='date-block'>
                    
                        <input
                          required
                          maxLength="4"
                          type="text" 
                          id="year" 
                          name="year" 
                          placeholder="yyyy"
                          value={this.state.year}
                          onChange={this.onChangeYear}
                        />
                      </div>

                      <div className='date-block'>
                        
                        <input
                          required
                          maxLength="2"  
                          type="text" 
                          id="month" 
                          name="month" 
                          placeholder="mm"
                          value={this.state.month}
                          onChange={this.onChangeMonth}
                        />
                      </div>

                      <div className='date-block'>
                        
                        <input
                          required
                          maxLength="2" 
                          type="text" 
                          id="date" 
                          name="date" 
                          placeholder="dd"
                          value={this.state.date}
                          onChange={this.onChangeDate}
                        />
                      </div>

                  </div>

                <div className="info-line">
                  <label htmlFor="position">Position</label>
                  <br />
                  <input
                    type="text"
                    id="position"
                    name="position"
                    placeholder="Type position"
                    value={this.state.position}
                    onChange={this.onChangePosition}
                  />
                </div>

                <div className="info-line">
                  <label htmlFor="information">Information</label>
                  <br />
                  <textarea
                    id="information"
                    name="information"
                    placeholder="Type some notes"
                    rows="4"
                    value={this.state.information}
                    onChange={this.onChangeInformation}
                  />
                </div>

                <div className="submit">
                  <input
                    className="submit-button"
                    type="submit"
                    value="Change"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sideBarIsOpen: state.sideBarIsOpen,
    myContacts: state.myContacts,
    myFullContacts: state.myFullContacts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openSideBar: () => dispatch({ type: "OPEN" }),
    closeSideBar: () => dispatch({ type: "CLOSE" }),
    editUser: editedUser => dispatch({ type: "EDIT_USER", payload: editedUser }),
    editUserFull: editedUserFull => dispatch({ type: "EDIT_USER_FULL_INFO", payload: editedUserFull })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
