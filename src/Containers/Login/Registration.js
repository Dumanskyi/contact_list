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
      console.log(this.state)
    }
  
    registrationFunction = (event) => {
      event.preventDefault();
      const urlRegistration = "users/register";

      const {email, name, surname, password} = this.state
  
      let registrationData = {email, name, surname, password};
      
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
                required={true}
                value={this.state.email}
                onChange={this.onChangeParameter}
              >
              </Input>

              <Input
                type="name"
                parameter="name"
                required={true}
                pattern={"[A-Za-z0-9]{4,16}"}
                value={this.state.name}
                onChange={this.onChangeParameter}
              >
              </Input>

              <Input
                type="surname"
                parameter="surname"
                required={true}
                pattern={"[A-Za-z0-9]{4,16}"}
                value={this.state.surname}
                onChange={this.onChangeParameter}
              >
              </Input>

              <Input
                type="password"
                parameter="password"
                required={true}
                pattern={"[A-Za-z0-9]{6,16}"}
                value={this.state.password}
                onChange={this.onChangeParameter}
              >
              </Input>

              <Input
                type="password"
                parameter="confirmPassword"
                required={true}
                pattern={"[A-Za-z0-9]{6,16}"}
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

  