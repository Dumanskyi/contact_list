import React from 'react';
import './User.scss';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';


const User = (props) => {

  const userId = props.match.params.id;
  const usersData = props.myFullContacts;

  const userData = usersData.find(user => user._id === userId);
  
  return (
    <div className="User">
    
      <div className="module">
          <div className="header">
          
            <div className="burger">
              <button></button>
            </div>
            <div className="center">
              Contact info
            </div>
            <div className="option">
              <button>
                <NavLink to="/contacts">
                  <i className="fas fa-times"></i>
                </NavLink>
              </button>
            </div>
          </div>

          <div className="user-info">
              <div className="photo">
                  <img src={ require('../img/photo.jpg') } alt="some-alt" />
              </div>

              <div className="title">
                <p className="name">{userData.name} {userData.surname}</p>
                <p className="info">{userData.information}</p>
              </div>

              <div className="name">
                <p className="tag">Name</p>
                <p className="data">{userData.name}</p>
              </div>

              <div className="surname">
                <p className="tag">Surname</p>
                <p className="data">{userData.surname}</p>
              </div>

              <div className="phone">
                <p className="tag">Phone</p>
                <p className="data">{userData.phone[0].value}</p>
              </div>

              <div className="email">
                <p className="tag">Email</p>
                <p className="data">{userData.email[0]}</p>
              </div>

              <div className="birthday">
                <p className="tag">Birthday</p>
                <p className="data">{userData.bornDate.slice(0,10)}</p>
              </div>

              <div className="position">
                <p className="tag">Position</p>
                <p className="data">{userData.position}</p>
              </div>   
          </div>
    </div>
  </div>

  )
  
}


// export default User;

function mapStateToProps(state) {
  return {
    counter: state.counter,
    myContacts: state.myContacts,
    myFullContacts: state.myFullContacts,
  }
}

export default connect(mapStateToProps)(User);