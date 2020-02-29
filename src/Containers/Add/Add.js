import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../Components/UI/button/button.js'
import { fetchAddContact } from '../../store/actions/contacts';
import { closeSideBar } from '../../store/actions/other';
import moment from 'moment';
import DatePicker from "react-datepicker";
import Input from '../../Components/UI/input/input';
import Select from 'react-select';
import './Add.scss';

const Add = props =>  {

  const [userInfo, setUserInfo] = useState({
    name: '', 
    surname: '', 
    phone: '', 
    email: '', 
    bornDate: '', 
    position: '', 
    information: '',
    date: '',
    category: ''
  })

  const myCategories = useSelector(state => state.categories.myCategories)
  const dispatch = useDispatch();

  const {surname, name, phone, email, date, category, position, information} = userInfo

  const onChangeParameter = event => {
    setUserInfo({...userInfo, [event.target.name]: event.target.value})
  }

  const onChangeCategory = category => {
    setUserInfo({...userInfo, category})
  }

  const onChangeDatePicker = date => {
    setUserInfo({...userInfo, date})
  }

  const submitFunction = event => {
    event.preventDefault();

    const user = {
      name: name, 
      surname: surname, 
      phone: [{ value: phone }], 
      email: [email],
      bornDate: (moment(date).format('YYYY-MM-DD')), 
      position: position, 
      information: information,
    };

    if (category) {
      user.category = category._id
    }

    dispatch(fetchAddContact(user))
    props.history.push("/layout/contacts")
  }
  
    return (

        <div className="add">

              <div className="header">
                <div className="burger">
                  <button>
                    <i className="fas fa-bars" onClick={() => dispatch(closeSideBar())}></i>
                  </button>
                </div>
                <div className="center">
                  Add new contact
                </div>  
              </div>

              <div className="content">
  
                  <div className='add-form'>
                    <form onSubmit={submitFunction}>

                      <Input
                        type="text"
                        parameter="name"
                        value={name}
                        onChange={onChangeParameter}
                      >
                      </Input>

                      <Input
                        type="text"
                        parameter="surname"
                        value={surname}
                        onChange={onChangeParameter}
                      >
                      </Input>

                      <Input
                        type="text"
                        parameter="phone"
                        value={phone}
                        onChange={onChangeParameter}
                      >
                      </Input>

                      <Input
                        type="email"
                        parameter="email"
                        value={email}
                        onChange={onChangeParameter}
                      >
                      </Input>

                      <div className='info-line elem'>Birthday date</div>
                      <div className='info-birthday'>
                        <DatePicker
                          placeholderText={" select date ..."}
                          selected={date}
                          onChange={onChangeDatePicker}
                        />
                      </div>

                      <div className='info-line elem'>Category</div>
                      <Select
                        getOptionLabel={option => option.name}
                        getOptionValue={option => option._id}
                        value={category}
                        onChange={onChangeCategory}
                        options={myCategories}
                      />
                      
                      <Input
                        type="text"
                        parameter="position"
                        value={position}
                        onChange={onChangeParameter}
                      >
                      </Input>

                      <div className='info-line'>
                        <label htmlFor="information">Information</label><br />
                        <textarea 
                          id="information" 
                          name="information" 
                          placeholder="Type some notes" 
                          rows="4"
                          value={information}
                          onChange={onChangeParameter}
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
};

export default Add;