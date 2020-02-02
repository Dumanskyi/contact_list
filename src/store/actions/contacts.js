import {
    FETCH_CONTACTS_START, 
    FETCH_CONTACTS_SUCCESS, 
    FETCH_CONTACTS_ERROR,
    FETCH_DELETE_SUCCESS,
    FETCH_ADD_USER
} from './actionTypes'

import {helper, helper_ID} from './helper'

export function fetchContacts() {
    return helper("phonebook", "GET", fetchContactsStart, fetchContactsSuccess, fetchContactsError)
}

export function fetchDeleteContact(userID) {
    return helper_ID(`phonebook/${userID}`, "DELETE", fetchContactsStart, fetchDeleteSuccess, fetchContactsError, userID)
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

export function fetchContactsError(e) {
    return {
        type: FETCH_CONTACTS_ERROR,
        error: e
   } 
}