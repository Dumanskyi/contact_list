import React, { Component } from "react";
import "./Registration.scss";

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
      
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeSurname = this.onChangeSurname.bind(this);
      
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
  
      this.registrationFunction = this.registrationFunction.bind(this);
    }
  
    onChangeEmail(event) {
      this.setState({ email: event.target.value });
    }
  
    onChangeName(event) {
      this.setState({ name: event.target.value });
    }

    onChangeSurname(event) {
      this.setState({ surname: event.target.value });
    }

    onChangePassword(event) {
      this.setState({ password: event.target.value });
    }

    onChangeConfirmPassword(event) {
      this.setState({ confirmPassword: event.target.value });
    }
  
    registrationFunction(event) {
      event.preventDefault();
      // const domain = "http://phonebook.hillel.it";
      const urlRegistration = "users/register";
  
      let registrationData = {
        email: this.state.email,
        name: this.state.name,
        surname: this.state.surname,
        password: this.state.password,
      };
  
      console.log(registrationData);
      
      if (this.state.password === this.state.confirmPassword) {

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
              <div className="info-line">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Type email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="info-line">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Type name"
                  value={this.state.name}
                  onChange={this.onChangeName}
                />
              </div>
  
              <div className="info-line">
                <label htmlFor="surname">Surname</label>
                <br />
                <input
                  type="Text"
                  id="surname"
                  name="surname"
                  placeholder="Type surname"
                  value={this.state.surname}
                  onChange={this.onChangeSurname}
                />
              </div>

              <div className="info-line">
                <label htmlFor="password">Password</label>
                <br />
                <input
                  type="Text"
                  id="password"
                  name="password"
                  placeholder="Type password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </div>

              <div className="info-line">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <br />
                <input
                  type="Text"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={this.state.confirmPassword}
                  onChange={this.onChangeConfirmPassword}
                />
              </div>
  
              <div className="loginButtons">
                <button>Cancel</button>
                <button type="submit">Create account</button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
  
  // export default User;
  
  export default Registration;
  