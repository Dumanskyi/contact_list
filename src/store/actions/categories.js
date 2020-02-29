import {
    FETCH_CATEGORIES_START, 
    FETCH_CATEGORIES_SUCCESS, 
    FETCH_CATEGORIES_ERROR,
} from './actionTypes'
import { helper } from './helper';

export function fetchCategories() {
    return helper("categories", "GET", fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesError)
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
    console.log(myCategories)
    return {
        type: FETCH_CATEGORIES_SUCCESS,
        myCategories: myCategories
   } 
}
