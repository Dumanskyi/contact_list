import {
    OPEN, 
    CLOSE, 
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
  
      default:
        return state;
    }
  }