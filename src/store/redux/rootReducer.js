
import {combineReducers} from 'redux'
import contacts from './contacts'
import other from './other'


export default combineReducers({
    contacts: contacts,
    other: other,
})


