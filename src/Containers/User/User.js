import React, {Component} from 'react';
import './User.scss';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import Loader from '../../Components/UI/loader/loader'
import moment from 'moment';
import { fetchReadSuccess } from '../../store/actions/contacts';
import { fetchCategories } from '../../store/actions/categories';

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
          
          if (userInfo.category) {
            const category = this.props.myCategories.find(el => el._id === userInfo.category)
            userInfo.category = category
          }
      
          this.setState({ userInfo: userInfo })
          this.props.fetchReadSuccess(userInfo) 
        })
        .catch(() => this.setState({ hasErrored: true }));
  }

  componentDidMount() {
    if (this.props.myCategories.length === 0){
      this.props.fetchCategories()
    }

    const index = this.props.myContactsFull.findIndex((user) => user._id === this.props.match.params.id)
    if (index !== -1) {
      let obj = this.props.myContactsFull[index]
      obj.phoneNumber = obj.phone[0].value
      obj.bornDate = moment(obj.bornDate).format('YYYY-MM-DD')

      if (!obj.category.hasOwnProperty('_id')){
        const options = this.props.myCategories
        const category = options.find(el => el._id === obj.category)
        obj.category = category
      }

      this.setState({ userInfo: obj })
    } else {
      const userID = this.props.match.params.id
      this.fetchData(`http://localhost:3000/phonebook/${userID}`)
    }
  }

  renderUser() {
        return (
          <>
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

            {
              this.state.userInfo.category 
                  ?
                  <div className="block">
                  <p className="tag">Category</p>
                  <p className="data">{this.state.userInfo.category.name}</p>
                  </div>
                  : null
            }
            
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
    myCategories: state.categories.myCategories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeSideBar: () => dispatch({type: 'CLOSE'}),
    fetchReadSuccess: user => dispatch(fetchReadSuccess(user)),
    fetchCategories: () => dispatch(fetchCategories()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(User);