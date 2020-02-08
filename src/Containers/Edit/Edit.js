import React, { Component } from "react";
import "./Edit.scss";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Loader from "../../Components/UI/Loader/Loader";

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasErrored: false,
      isLoading: false,
      userInfo: {
        _id: "",
        email: [],
        name: "",
        surname: "",
        phone: [],
        bornDate: "",
        position: "",
        information: "",
        phoneNumber: "",
        year: "",
        month: "",
        date: ""
      }
    };

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
    let changedUser = this.state.userInfo;
    changedUser.name = event.target.value;
    this.setState({ userInfo: changedUser });
  }

  onChangeSurname(event) {
    let changedUser = this.state.userInfo;
    changedUser.surname = event.target.value;
    this.setState({ userInfo: changedUser });
  }

  onChangePhone(event) {
    let changedUser = this.state.userInfo;
    changedUser.phone = [{ value: event.target.value }];
    changedUser.phoneNumber = event.target.value;
    this.setState({ userInfo: changedUser });
  }

  onChangeEmail(event) {
    let changedUser = this.state.userInfo;
    changedUser.email = event.target.value;
    this.setState({ userInfo: changedUser });
  }

  onChangeYear(event) {
    let changedUser = this.state.userInfo;
    changedUser.year = event.target.value;
    this.setState({ userInfo: changedUser });
  }

  onChangeMonth(event) {
    let changedUser = this.state.userInfo;
    changedUser.month = event.target.value;
    this.setState({ userInfo: changedUser });
  }

  onChangeDate(event) {
    let changedUser = this.state.userInfo;
    changedUser.date = event.target.value;
    this.setState({ userInfo: changedUser });
  }

  onChangePosition(event) {
    let changedUser = this.state.userInfo;
    changedUser.position = event.target.value;
    this.setState({ userInfo: changedUser });
  }

  onChangeInformation(event) {
    let changedUser = this.state.userInfo;
    changedUser.information = event.target.value;
    this.setState({ userInfo: changedUser });
  }

  fetchPut(url, user) {
    let prop = this.props;
    this.setState({ isLoading: true });
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        this.setState({ isLoading: false });
        prop.history.push("/layout/contacts");

        return response;
      })

      .catch(() => this.setState({ hasErrored: true }));
  }

  submitFunction(event) {
    event.preventDefault();
    let prop = this.props;
    let userID = prop.match.params.id;

    const user = {
      name: this.state.userInfo.name,
      surname: this.state.userInfo.surname,
      phone: this.state.userInfo.phone,
      email: [this.state.userInfo.email],
      bornDate: `${this.state.userInfo.year}-${this.state.userInfo.month}-${this.state.userInfo.date}`,
      position: this.state.userInfo.position,
      information: this.state.userInfo.information
    };

    user._id = userID;
    this.fetchPut(`http://localhost:3000/phonebook/${userID}`, user);
  }

  fetchData(url) {
    this.setState({ isLoading: true });

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        this.setState({ isLoading: false });

        return response;
      })
      .then(response => response.json())
      .then(userInfo => {
        userInfo.phoneNumber = userInfo.phone[0].value;
        userInfo.year = userInfo.bornDate.slice(0, 4);
        userInfo.month = userInfo.bornDate.slice(5, 7);
        userInfo.date = userInfo.bornDate.slice(8, 10);
        userInfo.email = userInfo.email[0];
        userInfo.bornDate = userInfo.bornDate.slice(0, 10);
        this.setState({ userInfo: userInfo });
      })
      .catch(() => this.setState({ hasErrored: true }));
  }

  componentDidMount() {
    const userID = this.props.match.params.id;

    this.fetchData(`http://localhost:3000/phonebook/${userID}`);
  }

  renderUser() {
    return (
      <>
        <div className="photo">
          <img src={require("../../img/picture.jpg")} alt="user-some-alt" />
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
                value={this.state.userInfo.name}
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
                value={this.state.userInfo.surname}
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
                value={this.state.userInfo.phoneNumber}
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
                value={this.state.userInfo.email}
                onChange={this.onChangeEmail}
              />
            </div>

            <div className="info-line">Birthday date</div>
            <div className="info-birthday">
              <div className="date-block">
                <input
                  required
                  maxLength="4"
                  type="text"
                  id="year"
                  name="year"
                  placeholder="yyyy"
                  value={this.state.userInfo.year}
                  onChange={this.onChangeYear}
                />
              </div>

              <div className="date-block">
                <input
                  required
                  maxLength="2"
                  type="text"
                  id="month"
                  name="month"
                  placeholder="mm"
                  value={this.state.userInfo.month}
                  onChange={this.onChangeMonth}
                />
              </div>

              <div className="date-block">
                <input
                  required
                  maxLength="2"
                  type="text"
                  id="date"
                  name="date"
                  placeholder="dd"
                  value={this.state.userInfo.date}
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
                value={this.state.userInfo.position}
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
                value={this.state.userInfo.information}
                onChange={this.onChangeInformation}
              />
            </div>

            <div className="submit">
              <input className="submit-button" type="submit" value="Change" />
            </div>
          </form>
        </div>
      </>
    );
  }

  render() {
    return (
      <div className="Edit">
        <div className="header">
          <div className="burger"></div>
          <div className="center">Edit contact</div>
          <div className="option">
            <NavLink to="/layout/contacts">
              <i className="fas fa-times"></i>
            </NavLink>
          </div>
        </div>

        <div className="content">
          {this.state.isLoading ? <Loader /> : this.renderUser()}
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
    getUserFullInfo: userData =>
      dispatch({ type: "GET_USER_FULL_INFO", payload: userData })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
