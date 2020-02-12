import {
    FETCH_CONTACTS_START, 
    FETCH_CONTACTS_SUCCESS, 
    FETCH_CONTACTS_ERROR,
    FETCH_DELETE_SUCCESS,
    FETCH_ADD_SUCCESS,
    FETCH_READ_SUCCESS,
    FETCH_EDIT_SUCCESS
} from '../actions/actionTypes'

const initialState = {
    loading: false,
    myContacts: [],
    myContactsFull: [],
    error: null
  };

  export default function contacts(state = initialState, action) {

    let usersList = []
    let usersListFull = []

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
            usersList = state.myContacts.filter(
                user => user._id !== action.userID
            );
            usersListFull = state.myContactsFull.filter(
                user => user._id !== action.userID
            );
            return { ...state, loading: false, myContacts: usersList, myContactsFull: usersListFull };

        case FETCH_READ_SUCCESS:
            usersListFull = [...state.myContactsFull, action.user]
            return { ...state, loading: false, myContactsFull: usersListFull };

        case FETCH_ADD_SUCCESS:
            usersList = [...state.myContacts, action.newUser];
            usersListFull = [...state.myContactsFull, action.newUser]
            return { ...state, loading: false, myContacts: usersList, myContactsFull: usersListFull };

        case FETCH_EDIT_SUCCESS:
            usersList = state.myContacts.filter(
                user => user._id !== action.user._id 
            );
            usersListFull = state.myContactsFull.filter(
                user => user._id !== action.user._id
            );
            usersList = [ ...usersList, action.user];
            usersListFull = [...usersListFull, action.user]
            return { ...state, loading: false, myContacts: usersList, myContactsFull: usersListFull };
  
        default: 
            return state
    }
}
