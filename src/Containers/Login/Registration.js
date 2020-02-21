import React, { Component } from "react";
import "./Registration.scss";
import {NavLink} from 'react-router-dom';
import Input from '../../Components/UI/input/input';

class Registration extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        name: "",
        surname: "",
        password: "",
        confirmPassword: "",
        data: "",
      };
    }

    onChangeParameter = (event) => {
      this.setState({[event.target.name]: event.target.value})
    }
  
    registrationFunction = (event) => {
      event.preventDefault();
      const urlRegistration = "users/register";
  
      let registrationData = {
        email: this.state.email,
        name: this.state.name,
        surname: this.state.surname,
        password: this.state.password,
      };
      
      if (this.state.password === this.state.confirmPassword) {
        let prop = this.props
        let registration = function() {
          fetch(urlRegistration, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(registrationData)
          })
            .then(function(response) {
              return response.json();
            })
            .then(function(data) {
              
              if (data.cookie) {
                document.cookie = `${data.cookie.name}=${data.cookie.value};path=/`;
              }
              
              alert(data.message);
              prop.history.push("/")
            });
        };
    
        registration();
      } else {
        alert ('Input correct password!')
      }
    }
  
    render() {
      return (
        <div className="registrationWrapper">
          <div className="registrationBlock">
            <form onSubmit={this.registrationFunction}>

              <Input
                type="email"
                parameter="email"
                value={this.state.email}
                onChange={this.onChangeParameter}
              >
              </Input>

              <Input
                type="name"
                parameter="name"
                value={this.state.name}
                onChange={this.onChangeParameter}
              >
              </Input>

              <Input
                type="surname"
                parameter="surname"
                value={this.state.surname}
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

              <Input
                type="password"
                parameter="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.onChangeParameter}
              >
              </Input>
  
              <div className="loginButtons">
                <button>
                  <NavLink to="/">
                    Cancel
                  </NavLink>
                </button>
                <button type="submit">Create account</button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
  
  export default Registration;
  