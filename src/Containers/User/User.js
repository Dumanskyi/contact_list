import React, {Component} from 'react';
import './User.scss';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import Loader from '../../Components/UI/loader/loader'
import moment from 'moment';
import { fetchReadSuccess } from '../../store/actions/contacts'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          
          userInfo.phoneNumber = userInfo.phone[0].value;
          userInfo.email = userInfo.email[0];
          userInfo.bornDate = moment(userInfo.bornDate).format('DD-MM-YYYY')
          console.log(this.props.myCategories)
          
          if (userInfo.category) {
            const category = this.props.myCategories.find(el => el._id === userInfo.category)
            userInfo.category = category.name
          }
          console.log(userInfo)
          this.setState({ userInfo: userInfo })
          this.props.fetchReadSuccess(userInfo) 
        })
        .catch(() => this.setState({ hasErrored: true }));
  }

  componentDidMount() {
    const index = this.props.myContactsFull.findIndex((user) => user._id === this.props.match.params.id)
    if (index !== -1) {
      this.props.myContactsFull[index].phoneNumber = this.props.myContactsFull[index].phone[0].value
      this.setState({ userInfo: this.props.myContactsFull[index] })
    } else {
      const userID = this.props.match.params.id
      this.fetchData(`http://localhost:3000/phonebook/${userID}`)
    }
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

            <div className="block">
              <p className="tag">Name</p>
              <p className="data">{this.state.userInfo.name}</p>
            </div>

            <div className="block">
              <p className="tag">Surname</p>
              <p className="data">{this.state.userInfo.surname}</p>
            </div>

            <div className="block">
              <p className="tag">Phone</p>
              <p className="data">{this.state.userInfo.phoneNumber}</p>
            </div>

            <div className="block">
              <p className="tag">Email</p>
              <p className="data">{this.state.userInfo.email}</p>
            </div>

            <div className="block">
              <p className="tag">Birthday</p>
              <p className="data">{this.state.userInfo.bornDate}</p>
            </div>

            <div className="block">
              <p className="tag">Category</p>
              <p className="data">{this.state.userInfo.category}</p>
            </div>

            <div className="block">
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
                { this.state.isLoading ? <Loader /> : this.renderUser() } 
            </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    myContacts: state.contacts.myContacts,
    myContactsFull: state.contacts.myContactsFull,

    loading: state.categories.categoreisIsLoading,
    myCategories: state.categories.myCategories,
    error: state.categories.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeSideBar: () => dispatch({type: 'CLOSE'}),
    fetchReadSuccess: user => dispatch(fetchReadSuccess(user))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(User);