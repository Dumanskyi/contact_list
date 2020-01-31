import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Login.scss";
import { connect } from "react-redux";
import { fetch_request } from "../../common/helpers";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      data: ""
    };

    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.loginFunction = this.loginFunction.bind(this);
  }

  onChangeLogin(event) {
    this.setState({ login: event.target.value });
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  async loginFunction(event) {
    event.preventDefault();
    const urlLogin = "users/login";
    const prop = this.props;

    let loginData = {
      email: this.state.login,
      password: this.state.password
    };

    try {
      const login_data = await fetch_request(urlLogin, "POST", loginData);
      if (login_data) {
        if (login_data.cookie) {
          document.cookie = `${login_data.cookie.name}=${login_data.cookie.value};path=/`;
        }
        console.log(login_data.message);
        prop.history.push("/layout/contacts");
        
      }
    } catch (e) {
      console.error(e);
      prop.history.push("/");
    }
  }

  render() {
    return (
      <div className="loginWrapper">
        <div className="loginBlock">
          <form onSubmit={this.loginFunction}>
            <div className="info-line">
              <label htmlFor="login">LOGIN</label>
              <br />
              <input
                type="text"
                id="login"
                name="login"
                placeholder="Type login"
                value={this.state.login}
                onChange={this.onChangeLogin}
              />
            </div>

            <div className="info-line">
              <label htmlFor="user-surname">PASSWORD</label>
              <br />
              <input
                type="text"
                id="passowrd"
                name="user-surname"
                placeholder="Type surname"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </div>

            <div className="loginButtons">
              <button>
                <NavLink to="/registration" onClick={this.props.openSideBar}>
                  Registration
                </NavLink>
              </button>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    myContacts: state.myContacts,
    sideBarIsOpen: state.sideBarIsOpen
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addUser: newUser => dispatch({ type: "ADD_USER", payload: newUser })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

