import {
    FETCH_CONTACTS_START, 
    FETCH_CONTACTS_SUCCESS, 
    FETCH_CONTACTS_ERROR,
    FETCH_DELETE_SUCCESS,
    FETCH_ADD_USER 
} from '../actions/actionTypes'

const initialState = {
    loading: false,
    myContacts: [],
  };

  export default function contacts(state = initialState, action) {

    switch (action.type) {

        case FETCH_CONTACTS_START:
            return {
                ...state, loading: true
            }

        case FETCH_CONTACTS_SUCCESS:
            return {
                ...state, loading: false, myContacts: action.myContacts
            }

        case FETCH_CONTACTS_ERROR:
            return {
                ...state, loading: false, error: action.error
            }

        case FETCH_DELETE_SUCCESS:
            let contacts = state.myContacts.filter(
                user => user._id !== action.userID
            );
            return { ...state, loading: false, myContacts: contacts };

        case FETCH_ADD_USER:
            let usersList = [...state.myContacts, action.payload];
            return { ...state, myContacts: usersList };
        
        default: 
            return state
    }
}
