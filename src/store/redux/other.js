import {
    OPEN, 
    CLOSE, 
    GET_USER_FULL_INFO,
    EDIT_USER,
    EDIT_USER_FULL_INFO,
} from '../actions/actionTypes.js'

const initialState = {
    loading: false,
    sideBarIsOpen: false,
    myContacts: [],
    myFullContacts: []
  };

export default function other(state = initialState, action) {
    switch (action.type) {
      case OPEN:
        return { ...state, sideBarIsOpen: true };
  
      case CLOSE:
        return { ...state, sideBarIsOpen: false };
  
      case GET_USER_FULL_INFO:
        let fullUsersList = [...state.myFullContacts, action.payload];
        return { ...state, myFullContacts: fullUsersList};
  
      case EDIT_USER:
        let usersListEdit = state.myContacts.filter(
          user => user._id !== action.payload.Id
        );
        usersListEdit = [...usersListEdit, action.payload.data];
        return { ...state, myContacts: usersListEdit};
  
      case EDIT_USER_FULL_INFO:
        let fullUsersListEdit = state.myFullContacts.filter(
          user => user._id !== action.payload.Id
        );
        fullUsersListEdit = [...fullUsersListEdit, action.payload.data];
        return {...state, myFullContacts : fullUsersListEdit};
  
      default:
        return state;
    }
  }