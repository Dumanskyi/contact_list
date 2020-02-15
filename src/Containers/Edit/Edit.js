import React, { Component } from "react";
import "./Edit.scss";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Loader from "../../Components/UI/loader/loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Input from '../../Components/UI/input/input';
import { fetchEditSuccess, fetchReadSuccess } from '../../store/actions/contacts'
import Select from 'react-select';

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
      options: {}
    };

    this.onChangeParameter = this.onChangeParameter.bind(this);
    this.onChangeDatePicker = this.onChangeDatePicker.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
    this.handleChange = this.handleChange.bind(this);  
  }

  handleChange = (category) => {
    let changedUser = this.state.userInfo;
    changedUser.category = category;
    this.setState({ userInfo: changedUser });
    console.log(this.state.userInfo.category)
  }

  onChangeParameter(event) {
    let changedUser = this.state.userInfo;
    if (event.target.name !== 'phone') {
      changedUser[event.target.name] = event.target.value;
    } else {
      changedUser[event.target.name] = [{ value: event.target.value }];
    }
    this.setState({ userInfo: changedUser });
  }

  onChangeDatePicker(date){
    let changedUser = this.state.userInfo;
    changedUser.bornDate = date;
    this.setState({userInfo: changedUser});
  }

  fetchPut(url, user) {
    let prop = this.props;
    this.setState({ isLoading: true });
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        console.log(user)
        this.setState({ isLoading: false });
        this.props.fetchEditSuccess(user);
        prop.history.push("/layout/contacts");
        
        return response;
      })

      .catch(() => this.setState({ hasErrored: true }));
  }


  submitFunction(event) {
    event.preventDefault();
    const user = {
      name: this.state.userInfo.name,
      surname: this.state.userInfo.surname,
      phone: this.state.userInfo.phone,
      email: [this.state.userInfo.email],
      bornDate: moment(this.state.userInfo.bornDate).format('YYYY-MM-DD'),
      position: this.state.userInfo.position,
      information: this.state.userInfo.information,
      category: this.state.userInfo.category.value
    };

    console.log(user)

    const userID = this.props.match.params.id;
    user._id = userID;
    this.fetchPut(`http://localhost:3000/phonebook/${userID}`, user);
    
  }

  fetchData(url) {
    this.setState({ isLoading: true });
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        this.setState({ isLoading: false });
        return response;
      })
      .then(response => response.json())
      .then(userInfo => {
        userInfo.phoneNumber = userInfo.phone[0].value;
        userInfo.email = userInfo.email[0];
        userInfo.bornDate = moment(userInfo.bornDate).toDate()
        if (userInfo.category) {
          const options = this.props.myCategories.map(el => {
            return {value: el._id, label: el.name}
          })
          const category = options.find(el => el.value === userInfo.category)
          userInfo.category = category
        }

        this.setState({ userInfo: userInfo });
        this.props.fetchReadSuccess(userInfo); 
      })
      .catch(() => this.setState({ hasErrored: true }));
  }


  componentDidMount() {
    const index = this.props.myContactsFull.findIndex((user) => user._id === this.props.match.params.id)
    if (index !== -1) {
      const userInfo = this.props.myContactsFull[index]

      userInfo.bornDate = moment(userInfo).toDate()
      userInfo.email = userInfo.email[0]

      if (userInfo.category) {
        const options = this.props.myCategories.map(el => {
          return {value: el._id, label: el.name}
        })
        const category = options.find(el => el.value === userInfo.category)
        userInfo.category = category
      }

      this.setState({ userInfo: userInfo })
    } else {
      const userID = this.props.match.params.id
      this.fetchData(`http://localhost:3000/phonebook/${userID}`)
    }  

    const options = this.props.myCategories.map(el => {
      return {value: el._id, label: el.name}  
    })
    this.setState( {options: options} )

  }

  renderOptions() {
    return this.state.options.map( (option, index) => {
      return (
        <option key={index} value={option.value}>{option.label}</option>
      )
    })
  }

  renderUser() {

    const category = this.state.userInfo.category

    const options = this.props.myCategories.map(el => {
      return {value: el._id, label: el.name}
    })

    return (
      <>
        <div className="photo">
          <img src={require("../../img/picture.jpg")} alt="user-some-alt" />
        </div>

        <div className="add-form">
          <form onSubmit={this.submitFunction}>
            <Input
              type="text"
              parameter="name"
              value={this.state.userInfo.name}
              onChange={this.onChangeParameter}
            >
            </Input>

            <Input
              type="text"
              parameter="surname"
              value={this.state.userInfo.surname}
              onChange={this.onChangeParameter}
            >
            </Input>

            <Input
              type="text"
              parameter="phone"
              value={ !this.state.userInfo.phone.length ? this.state.userInfo.phone : this.state.userInfo.phone[0]['value'] }
              onChange={this.onChangeParameter}
            >
            </Input>

            <Input
              type="email"
              parameter="email"
              value={this.state.userInfo.email}
              onChange={this.onChangeParameter}
            >
            </Input>

            <div className='info-line'>Birthday date</div>
            <div className='info-birthday'>
              <DatePicker 
                selected={this.state.userInfo.bornDate}
                onChange={this.onChangeDatePicker}
              />
            </div>

            <div className='info-line'>Category</div>
            <Select
                value={category}
                defaultValue={ this.state.userInfo.category }
                onChange={this.handleChange}
                options={options}
            />
                      
            <Input
              type="text"
              parameter="position"
              value={this.state.userInfo.position}
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
                value={this.state.userInfo.information}
                onChange={this.onChangeParameter}
              />
            </div>

            <div className="submit">
              <input className="submit-button" type="submit" value="Change" />
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
          {this.state.isLoading ? <Loader /> : this.renderUser()}
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

    loading: state.categories.categoreisIsLoading,
    myCategories: state.categories.myCategories,
    error: state.categories.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openSideBar: () => dispatch({ type: "OPEN" }),
    closeSideBar: () => dispatch({ type: "CLOSE" }),
    fetchReadSuccess: user => dispatch(fetchReadSuccess(user)),
    fetchEditSuccess: user => dispatch(fetchEditSuccess(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
