import React, { Component } from "react";
import "./Edit.scss";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Loader from "../../Components/UI/loader/loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Input from '../../Components/UI/input/input';
import {
    fetchEditFullContact,
    fetchEditContact
} from '../../store/actions/contacts';
import Select from 'react-select';
import Button from '../../Components/UI/button/button.js'
import { fetchCategories } from '../../store/actions/categories';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasErrored: false,
      isLoading: false,
      userInfo: {
        _id: "",
        email: [],
        name: "",
        surname: "",
        phone: [],
        bornDate: "",
        position: "",
        information: "",
        category: {},
      },
    };

  }

  async componentDidMount() {
    if (this.props.myCategories.length === 0) {
      await this.props.fetchCategories();
    }
    
    const index = this.props.myContactsFull.findIndex((user) => user._id === this.props.match.params.id)
    if (index !== -1) {
      const userInfo = this.props.myContactsFull[index]
      userInfo.bornDate = moment(userInfo.bornDate).toDate()

      if (userInfo.category) {
        if (userInfo.category.hasOwnProperty('_id')){
          userInfo.category = userInfo.category._id
        }
        const category = this.props.myCategories.find(el => el._id === userInfo.category)
        userInfo.category = category
      }
      this.setState({ userInfo })
    } else {
      const userID = this.props.match.params.id
      const categories = this.props.myCategories
      await this.props.fetchEditFullContact(userID, categories).then((res) => {
        this.setState({ userInfo: res })
      })
    }  
  }

  onChangeParameter = (event) => {
    let changedUser = this.state.userInfo;
    if (event.target.name !== 'phone') {
      changedUser[event.target.name] = event.target.value;
    } else {
      changedUser[event.target.name] = [{ value: event.target.value }];
    }
    this.setState({ userInfo: changedUser });
  }

  onChangeDatePicker = (date) => {
    let changedUser = this.state.userInfo;
    changedUser.bornDate = date;
    this.setState({userInfo: changedUser});
  }

  onChangeCategory = (category) => {
    let changedUser = this.state.userInfo;
    changedUser.category = category;
    this.setState({ userInfo: changedUser });
  }

  submitFunction = (event) => {
    event.preventDefault();
    const {surname, name, phone, email, bornDate, category, position, information} = this.state.userInfo
    
    const user = {
      name,
      surname,
      phone,
      email: Array.isArray(email) ? email : [email],
      bornDate: moment(bornDate).format('YYYY-MM-DD'),
      position,
      information,
      category: category._id
    };

    const userID = this.props.match.params.id;
    user._id = userID;

    this.props.fetchEditContact(userID, user)
    this.props.history.push("/layout/contacts")
    
  }

  renderUser() {

    const options = this.props.myCategories
    const {surname, name, phone, email, bornDate, category, position, information} = this.state.userInfo

    return (
      <>
        <div className="add-form">
          <form onSubmit={this.submitFunction}>
            <Input
              type="text"
              parameter="name"
              value={name}
              onChange={this.onChangeParameter}
            >
            </Input>

            <Input
              type="text"
              parameter="surname"
              value={surname}
              onChange={this.onChangeParameter}
            >
            </Input>

            <Input
              type="text"
              parameter="phone"
              value={ !phone.length ? phone : phone[0]['value'] }
              onChange={this.onChangeParameter}
            >
            </Input>

            <Input
              type="email"
              parameter="email"
              value={email}
              onChange={this.onChangeParameter}
            >
            </Input>

            <div className='info-line elem'>Birthday date</div>
            <div className='info-birthday'>
              <DatePicker 
                selected={bornDate}
                onChange={this.onChangeDatePicker}
              />
            </div>

            <div className='info-line elem'>Category</div>
            <Select
                getOptionLabel={option => option.name}
                getOptionValue={option => option._id}
                value={category}
                defaultValue={ category }
                onChange={this.onChangeCategory}
                options={options}
            />
                      
            <Input
              type="text"
              parameter="position"
              value={position}
              onChange={this.onChangeParameter}
            >
            </Input>

            <div className="info-line">
              <label htmlFor="information">Information</label>
              <br />
              <textarea
                id="information"
                name="information"
                placeholder="Type some notes"
                rows="4"
                value={information}
                onChange={this.onChangeParameter}
              />
            </div>
            
            <div className="submit-wrapper">
              <Button purpose="form-submit" type="submit">Save</Button> 
            </div>
          </form>
        </div>
      </>
    );
  }

  render() {
    return (
      <div className="Edit">
        <div className="header">
          <div className="burger"></div>
          <div className="center">Edit contact</div>
          <div className="option">
            <NavLink to="/layout/contacts">
              <i className="fas fa-times"></i>
            </NavLink>
          </div>
        </div>

        <div className="content">
          {this.props.loading ? <Loader /> : this.renderUser()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sideBarIsOpen: state.sideBarIsOpen,
    myContacts: state.contacts.myContacts,
    myContactsFull: state.contacts.myContactsFull,

    loading: state.contacts.loading,
    myCategories: state.categories.myCategories,
    error: state.categories.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openSideBar: () => dispatch({ type: "OPEN" }),
    closeSideBar: () => dispatch({ type: "CLOSE" }),
    fetchEditFullContact: (user, categories) => dispatch(fetchEditFullContact(user, categories)),
    fetchEditContact: (userID, user) => dispatch(fetchEditContact(userID, user)),
    fetchCategories: () => dispatch(fetchCategories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
