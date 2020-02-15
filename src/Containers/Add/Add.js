import React, {Component} from 'react';
import './Add.scss';
import {connect} from 'react-redux';
import Button from '../../Components/UI/button/button.js'
import { fetchAddContact } from '../../store/actions/contacts';

import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from '../../Components/UI/input/input';
import Select from 'react-select';

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
      information: '',
      category: '',
      date: new Date(),
      category: ''
    };

    this.onChangeParameter = this.onChangeParameter.bind(this);
    this.onChangeDatePicker = this.onChangeDatePicker.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.submitFunction = this.submitFunction.bind(this);   
  };

  onChangeCategory = (category) => {
    this.setState({ category });
  }

  onChangeParameter(event){
    this.setState({[event.target.name]: event.target.value})
  }

  onChangeDatePicker(date){
    this.setState({date: date});
  }

  submitFunction(event){
    event.preventDefault();
  
    const user = {
      name: this.state.name, 
      surname: this.state.surname, 
      phone: [{ value: this.state.phone }], 
      email: [this.state.email],
      bornDate: (moment(this.state.date).format('YYYY-MM-DD')), 
      position: this.state.position, 
      information: this.state.information,
    };

    if (this.state.category){
      user.category = this.state.category._id
    }

    this.props.fetchAddContact(user)
    this.props.history.push("/layout/contacts")

  }

  render() {
    const { category } = this.state.category;
    
    const options = this.props.myCategories
    console.log(options)
  
    return (

        <div className="add">

              <div className="header">
              
                <div className="burger">
                  <button>
                    <i className="fas fa-bars" onClick={this.props.closeSideBar}></i>
                  </button>
                </div>
                <div className="center">
                  Add new contact
                </div>  
              </div>

              <div className="content">
                  <div className="photo">
                    <img src={ require('../../img/picture.jpg') } alt="user-some-alt" />
                  </div>

                  <div className='add-form'>
                    <form onSubmit={this.submitFunction}>

                      <Input
                        type="text"
                        parameter="name"
                        value={this.state.name}
                        onChange={this.onChangeParameter}
                      >
                      </Input>

                      <Input
                        type="text"
                        parameter="surname"
                        value={this.state.surname}
                        onChange={this.onChangeParameter}
                      >
                      </Input>

                      <Input
                        type="text"
                        parameter="phone"
                        value={this.state.phone}
                        onChange={this.onChangeParameter}
                      >
                      </Input>

                      <Input
                        type="email"
                        parameter="email"
                        value={this.state.email}
                        onChange={this.onChangeParameter}
                      >
                      </Input>

                      <div className='info-line'>Birthday date</div>
                      <div className='info-birthday'>
                        <DatePicker 
                          selected={this.state.date}
                          onChange={this.onChangeDatePicker}
                        />
                      </div>

                      <div className='info-line'>Category</div>
                      <Select
                        getOptionLabel={option => option.name}
                        getOptionValue={option => option._id}
                        value={category}
                        onChange={this.onChangeCategory}
                        options={this.props.myCategories}
                      />
                      
                      <Input
                        type="text"
                        parameter="position"
                        value={this.state.position}
                        onChange={this.onChangeParameter}
                      >
                      </Input>

                      <div className='info-line'>
                        <label htmlFor="information">Information</label><br />
                        <textarea 
                          id="information" 
                          name="information" 
                          placeholder="Type some notes" 
                          rows="4"
                          value={this.state.information}
                          onChange={this.onChangeParameter}
                        />
                      </div>

                      <div className="submit-wrapper">
                          <Button purpose="form-submit" type="submit">Save</Button>    
                      </div>

                    </form>
                  </div>

              </div>
        </div>
      )
    }
};

function mapStateToProps(state) {
  return {
    sideBarIsOpen: state.sideBarIsOpen,
    myContacts: state.contacts.myContacts,
    myContactsFull: state.contacts.myContactsFull,

    loading: state.categories.categoreisIsLoading,
    myCategories: state.categories.myCategories,
    error: state.categories.error
  }
}

function mapDispatchToProps(dispatch){
  return {
    openSideBar: () => dispatch({type: 'OPEN'}),
    closeSideBar: () => dispatch({type: 'CLOSE'}),
    fetchAddContact: (newUser) => dispatch(fetchAddContact(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);


