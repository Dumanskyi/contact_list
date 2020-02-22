import {
    FETCH_CONTACTS_START, 
    FETCH_CONTACTS_SUCCESS, 
    FETCH_CONTACTS_ERROR,
    FETCH_DELETE_SUCCESS,
    FETCH_ADD_SUCCESS,
    FETCH_READ_SUCCESS,
    FETCH_EDIT_SUCCESS
} from './actionTypes'
import axios from 'axios'

export function fetchContacts() {
    return async dispatch => {
        dispatch(fetchContactsStart())

        try {
            const response = await axios.get("http://localhost:3000/phonebook")
            console.log(response)
            dispatch(fetchContactsSuccess(response.data))

        } catch (e) {
            dispatch(fetchContactsError(e))
        }    
    }
}

// const getContact = async (url) => {
//     const res = await fetch(url);
//     const body = await res.json();
    
//     return body
// }

// getContact("http://localhost:3000/phonebook").then((body) => {console.log(body)} )

export function fetchDeleteContact(userID) {
    return async dispatch => {
        dispatch(fetchContactsStart())

        try {
            await axios.delete(`http://localhost:3000/phonebook/${userID}`)
            dispatch(fetchDeleteSuccess(userID))

        } catch (e) {
            dispatch(fetchContactsError(e))
        }    
    }
}

export function fetchAddContact(newUser) {
    return async dispatch => {
        dispatch(fetchContactsStart())

        try {
            const response = await axios.post(`http://localhost:3000/phonebook/`, newUser)
            newUser._id = response.data.id
            console.log(newUser)
            dispatch(fetchAddSuccess(newUser))

            
        } catch (e) {
            dispatch(fetchContactsError(e))
        }    
    }
}

export function fetchContactsStart() {
    return {
         type: FETCH_CONTACTS_START
    }
}

export function fetchContactsSuccess(myContacts) {
    return {
        type: FETCH_CONTACTS_SUCCESS,
        myContacts: myContacts
   } 
}

export function fetchDeleteSuccess(userID) {
    return {
        type: FETCH_DELETE_SUCCESS,
        userID: userID
   } 
}

export function fetchAddSuccess(newUser) {
    return {
        type: FETCH_ADD_SUCCESS,
        newUser: newUser
   } 
}

export function fetchContactsError(e) {
    return {
        type: FETCH_CONTACTS_ERROR,
        error: e
   } 
}

export function fetchReadSuccess(user) {
    return {
        type: FETCH_READ_SUCCESS,
        user: user
   } 
}

export function fetchEditSuccess(user) {
    return {
        type: FETCH_EDIT_SUCCESS,
        user: user
   } 
}




