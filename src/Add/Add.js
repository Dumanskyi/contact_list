import React, { Component } from 'react';
import './Add.scss';
import Sidebar from '../SideBar/Sidebar';
import {connect} from 'react-redux';

class Add extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '', 
      surname: '', 
      phone: '', 
      email: '', 
      bornDate: '', 
      position: '', 
      information: ''
    };

    
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);

    this.onChangeBornDate = this.onChangeBornDate.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.onChangeInformation = this.onChangeInformation.bind(this);

    this.submitFunction = this.submitFunction.bind(this);

  };

  

  onChangeName(event){
    this.setState({name: event.target.value});
  }

  onChangeSurname(event){
    this.setState({surname: event.target.value});
  }

  onChangePhone(event){
    this.setState({phone: event.target.value});
  }

  onChangeEmail(event){
    this.setState({email: event.target.value});
  }


  onChangeBornDate(event){
    this.setState({bornDate: event.target.value});
  }

  onChangePosition(event){
    this.setState({position: event.target.value});
  }

  onChangeInformation(event){
    this.setState({information: event.target.value});
  }
  
  submitFunction(event){
    event.preventDefault();
    let prop = this.props;

    let urlUser = "phonebook";
    const user = {
      name: this.state.name, 
      surname: this.state.surname, 
      phone: [
        {
          value: this.state.phone
        }
      ], 
      email: [this.state.email],
      bornDate: this.state.bornDate, 
      position: this.state.position, 
      information: this.state.information,
    };

    fetch(urlUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        let userObject = user;
        userObject._id = data.id
        prop.addUser(userObject);
      });
    
    console.log(this.props);
    this.props.history.push('/contacts');    
  }

  
  render(){
    console.log(this.props);
    return (
      <div className={this.props.sideBarIsOpen ? "Add open" : "Add"}>

        <Sidebar/>

        <div className="module">

          <div className="header">
          
            <div className="burger">
              <button>
                <i className="fas fa-bars" onClick={this.props.closeSideBar}></i>
              </button>
            </div>
            <div className="center">
              Add new contact
            </div>
            <div className="option">
              <button><i className="fas fa-ellipsis-h"></i></button>
            </div>
          </div>

          <div className="content">
              <div className="photo">
                <img src={ require('../img/picture.jpg') } alt="user-some-alt" />
              </div>

              <div className='add-form'>
                <form onSubmit={this.submitFunction}>

                  <div className='info-line'>
                    <label htmlFor="user-name">Name</label><br />
                    <input 
                      type="text" 
                      id="user-name" 
                      name="user-name" 
                      placeholder="Type name" 
                      value={this.state.name}
                      onChange={this.onChangeName}
                    />
                  </div>

                  <div className='info-line'>
                    <label htmlFor="user-surname">Surname</label><br />
                    <input 
                      type="text" 
                      id="user-surname" 
                      name="user-surname" 
                      placeholder="Type surname"
                      value={this.state.surname}
                      onChange={this.onChangeSurname}
                    />
                  </div>

                  <div className='info-line'>
                    <label htmlFor="user-phone">Phone</label><br />
                    <input 
                      type="text" 
                      id="user-phone" 
                      name="phone" 
                      placeholder="+38(XXX)-XXX-XX-XX"
                      value={this.state.phone}
                      onChange={this.onChangePhone}
                    />
                  </div>

                  <div className='info-line'>
                    <label htmlFor="email">Email</label><br />
                    <input 
                      type="text" 
                      id="email" 
                      name="email" 
                      placeholder="Type Email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                    />
                  </div>

                  <div className='info-line'>
                    <label htmlFor="bornDate">Birthday</label><br />
                    <input 
                      type="text" 
                      id="bornDate" 
                      name="bornDate" 
                      placeholder="Type birthday"
                      value={this.state.bornDate}
                      onChange={this.onChangeBornDate}
                    />
                  </div>

                  <div className='info-line'>
                    <label htmlFor="position">Position</label><br />
                    <input 
                      type="text" 
                      id="position" 
                      name="position" 
                      placeholder="Type position"
                      value={this.state.position}
                      onChange={this.onChangePosition}
                    />
                  </div>

                  <div className='info-line'>
                    <label htmlFor="information">Information</label><br />
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
                      <input className="submit-button" type="submit" value="Save"/>

                  </div>

                </form>
              </div>

          </div>
        </div>

      </div>
    )}
};

function mapStateToProps(state) {
  return {
    sideBarIsOpen: state.sideBarIsOpen,
    myContacts: state.myContacts,
  }
}

function mapDispatchToProps(dispatch){
  return {
    openSideBar: () => dispatch({type: 'OPEN'}),
    closeSideBar: () => dispatch({type: 'CLOSE'}),
    addUser: (newUser) => dispatch({type: 'ADD_USER', payload: newUser})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);


