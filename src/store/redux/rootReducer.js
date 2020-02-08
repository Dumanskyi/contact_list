
import {combineReducers} from 'redux'
import contacts from './contacts'
import other from './other'
import categories from './categories'


export default combineReducers({
    contacts: contacts,
    other: other,
    categories: categories
})


