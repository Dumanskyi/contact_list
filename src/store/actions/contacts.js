import {
    FETCH_CONTACTS_START, 
    FETCH_CONTACTS_SUCCESS, 
    FETCH_CONTACTS_ERROR,
    FETCH_DELETE_SUCCESS,
    FETCH_ADD_SUCCESS,
    FETCH_READ_SUCCESS,
    FETCH_EDIT_SUCCESS
} from './actionTypes'

import { helper } from './helper';

export function fetchContacts() {
    return helper("phonebook", "GET", fetchContactsStart, fetchContactsSuccess, fetchContactsError)
}

export function fetchDeleteContact(userID) {
    return helper(`phonebook/${userID}`, "DELETE", fetchContactsStart, fetchDeleteSuccess, fetchContactsError, null, userID )
}

export function fetchAddContact(newUser) {
    return helper("phonebook", "POST", fetchContactsStart, fetchAddSuccess, fetchContactsError, newUser, undefined, transformDataAdd)
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

function transformDataAdd(response, data) {
    data._id = response.id
    return data
  }







