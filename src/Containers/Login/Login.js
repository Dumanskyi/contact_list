import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Login.scss";
import { fetch_request } from "../../common/helpers";
import Input from '../../Components/UI/input/input';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      data: ""
    };
    this.loginFunction = this.loginFunction.bind(this);
  }

  onChangeParameter = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  async loginFunction(event) {
    event.preventDefault();
    const prop = this.props;

    let loginData = {
      email: this.state.login,
      password: this.state.password
    };

    try {
      const login_data = await fetch_request("/users/login", "POST", loginData);

      if (login_data) {
        if (login_data.cookie) {
          document.cookie = `${login_data.cookie.name}=${login_data.cookie.value};path=/`;
        }
        prop.history.push("/layout/contacts");
        
      }
    } catch (e) {
      prop.history.push("/");
    }
  }

  render() {
    return (
      <div className="loginWrapper">
        <div className="loginBlock">
          <form onSubmit={this.loginFunction}>

            <Input
                type="email"
                parameter="login"
                value={this.state.login}
                onChange={this.onChangeParameter}
              >
            </Input>

            <Input
                type="password"
                parameter="password"
                value={this.state.password}
                onChange={this.onChangeParameter}
              >
            </Input>

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
    loading: state.contacts.loading,
  };
}

// export default Login

export default connect(mapStateToProps)(Login);

