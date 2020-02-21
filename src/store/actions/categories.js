import {
    FETCH_CATEGORIES_START, 
    FETCH_CATEGORIES_SUCCESS, 
    FETCH_CATEGORIES_ERROR,
} from './actionTypes'
import axios from 'axios'


export function fetchCategories() {
    return async dispatch => {
        dispatch(fetchCategoriesStart())

        try {
            const response = await axios.get("http://localhost:3000/categories")
            dispatch(fetchCategoriesSuccess(response.data))
        } catch (e) {
            dispatch(fetchCategoriesError(e))
        }    
    }
}

export function fetchCategoriesStart() {
    return {
         type: FETCH_CATEGORIES_START
    }
}



export function fetchCategoriesError(e) {
    return {
        type: FETCH_CATEGORIES_ERROR,
        error: e
   } 
}

export function fetchCategoriesSuccess(myCategories) {
    return {
        type: FETCH_CATEGORIES_SUCCESS,
        myCategories: myCategories
   } 
}
