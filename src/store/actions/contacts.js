import {
    FETCH_CONTACTS_START, 
    FETCH_CONTACTS_SUCCESS, 
    FETCH_CONTACTS_ERROR,
    FETCH_DELETE_SUCCESS,
    FETCH_ADD_SUCCESS,
    FETCH_READ_SUCCESS,
    FETCH_EDIT_SUCCESS,
    CLEAR_CONTACTS
} from './actionTypes'
 
import moment from 'moment';
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

export function fetchReadFullContact(userID, categories) {
    return helper(`phonebook/${userID}`, "GET", fetchContactsStart, fetchReadSuccess, fetchContactsError, null, userID, transformDataRead, categories)
}

export function fetchEditFullContact(userID, categories) {
    return helper(`phonebook/${userID}`, "GET", fetchContactsStart, fetchReadSuccess, fetchContactsError, null, userID, transformDataEdit, categories)
}

export function fetchEditContact(userID, user){
    return helper(`phonebook/${userID}`, "PUT", fetchContactsStart, fetchEditSuccess, fetchContactsError, user, userID, transformDataRead)
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

export function clearContacts() {
    return {
         type: CLEAR_CONTACTS
    }
}

// data-converter functions

function transformDataAdd(response, data) {
    data._id = response.id
    return data
  }

function transformDataRead(response, data, categories) {
    response.phoneNumber = response.phone[0].value;
    response.email = response.email[0];
    response.bornDate = moment(response.bornDate).format("DD-MM-YYYY");

    if (response.category) {
        const category = categories.find(
            el => el._id === response.category
        );
        response.category = category;
    }
    return response
}

function transformDataEdit(response, data, categories) {
    response.phoneNumber = response.phone[0].value;
    response.email = response.email[0];
    response.bornDate = moment(response.bornDate).toDate()
    if (response.category) {
        const options = categories
        const category = options.find(el => el._id === response.category)
        response.category = category
    }
    return response
}









  







