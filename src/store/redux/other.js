import {
    OPEN, 
    CLOSE, 
} from '../actions/actionTypes.js'

export const initialState = {
    loading: false,
    sideBarIsOpen: false,
    myContacts: [],
    myFullContacts: []
  };

 const other = (state = initialState, action) => {
    switch (action.type) {
      case OPEN:
        return { ...state, sideBarIsOpen: true };
  
      case CLOSE:
        return { ...state, sideBarIsOpen: false };
  
      default:
        return state;
    }
  }

  export default other