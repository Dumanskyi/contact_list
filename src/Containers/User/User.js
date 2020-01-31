import React, {Component} from 'react';
import './User.scss';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios'

class User extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {

    console.log(this.props)
    let prop = this.props;
    let userID = prop.match.params.id;

    console.log(userID);
    const urlRead = "/phonebook/" + userID;

    try {
      const response = await axios.get(urlRead)

      response.data.phoneNumber = response.data.phone[0].value;
      response.data.year = response.data.bornDate.slice(0,4);
      response.data.month = response.data.bornDate.slice(5,7);
      response.data.date = response.data.bornDate.slice(8,10);
      response.data.email = response.data.email[0];
      response.data.bornDate = response.data.bornDate.slice(0,10)

      this.setState({
        ...response.data
      })
    } catch (e) {
      console.log(e)
    }
  }
  
  render() {
    return (
      <div className="User">
    
            <div className="header">
            
              <div className="burger">
                <button></button>
              </div>
              <div className="center">
                Contact info
              </div>
              <div className="option">
                <button>
                  <NavLink 
                    to="/layout/contacts"
                    onClick={this.props.openSideBar}
                  >
                    <i className="fas fa-times"></i>
                  </NavLink>
                </button>
              </div>
            </div>

            <div className="user-info">
                <div className="photo">
                    <img src={ require('../../img/photo.jpg') } alt="some-alt" />
                </div>

                <div className="title">
                  <p className="name">{this.state.name} {this.state.surname}</p>
                  <p className="info">{this.state.information}</p>
                </div>

                <div className="name">
                  <p className="tag">Name</p>
                  <p className="data">{this.state.name}</p>
                </div>

                <div className="surname">
                  <p className="tag">Surname</p>
                  <p className="data">{this.state.surname}</p>
                </div>

                <div className="phone">
                  <p className="tag">Phone</p>
                  <p className="data">{this.state.phoneNumber}</p>
                </div>

                <div className="email">
                  <p className="tag">Email</p>
                  <p className="data">{this.state.email}</p>
                </div>

                <div className="birthday">
                  <p className="tag">Birthday</p>
                  <p className="data">{this.state.bornDate}</p>
                </div>

                <div className="position">
                  <p className="tag">Position</p>
                  <p className="data">{this.state.position}</p>
                </div>   
            </div>
      
    </div>

    )
  }
}


function mapStateToProps(state) {
  return {
    counter: state.counter,
    myContacts: state.myContacts,
    myFullContacts: state.myFullContacts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    closeSideBar: () => dispatch({type: 'CLOSE'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);