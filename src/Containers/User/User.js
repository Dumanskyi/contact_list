import React, {Component} from 'react';
import './User.scss';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import Loader from '../../Components/UI/Loader/Loader'


class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasErrored: false,
      isLoading: false,
      userInfo: {}
    };
  }

  fetchData(url) {
    this.setState({ isLoading: true });

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            this.setState({ isLoading: false });

            return response;
        })
        .then((response) => response.json())
        .then((userInfo) => {
          
          console.log(userInfo)
          userInfo.phoneNumber = userInfo.phone[0].value;
          userInfo.year = userInfo.bornDate.slice(0,4);
          userInfo.month = userInfo.bornDate.slice(5,7);
          userInfo.date = userInfo.bornDate.slice(8,10);
          userInfo.email = userInfo.email[0];
          userInfo.bornDate = userInfo.bornDate.slice(0,10)
          this.setState({ userInfo: userInfo }) 
        })
        .catch(() => this.setState({ hasErrored: true }));
  }

  componentDidMount() {

    const userID = this.props.match.params.id

    this.fetchData(`http://localhost:3000/phonebook/${userID}`)

  }

  renderUser() {
        return (
          <>
            <div className="photo">
                <img src={ require('../../img/photo.jpg') } alt="some-alt" />
            </div>

            <div className="title">
              <p className="name">{this.state.userInfo.name} {this.state.userInfo.surname}</p>
              <p className="info">{this.state.userInfo.information}</p>
            </div>

            <div className="name">
              <p className="tag">Name</p>
              <p className="data">{this.state.userInfo.name}</p>
            </div>

            <div className="surname">
              <p className="tag">Surname</p>
              <p className="data">{this.state.userInfo.surname}</p>
            </div>

            <div className="phone">
              <p className="tag">Phone</p>
              <p className="data">{this.state.userInfo.phoneNumber}</p>
            </div>

            <div className="email">
              <p className="tag">Email</p>
              <p className="data">{this.state.userInfo.email}</p>
            </div>

            <div className="birthday">
              <p className="tag">Birthday</p>
              <p className="data">{this.state.userInfo.bornDate}</p>
            </div>

            <div className="position">
              <p className="tag">Position</p>
              <p className="data">{this.state.userInfo.position}</p>
            </div>
          </>   
        );
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
                {
                  this.state.isLoading ? <Loader />:  this.renderUser()      
                } 
            </div>
      
    </div>

    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    closeSideBar: () => dispatch({type: 'CLOSE'}),
  }
}


export default connect(null, mapDispatchToProps)(User);