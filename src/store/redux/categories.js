import {
    FETCH_CATEGORIES_START, 
    FETCH_CATEGORIES_SUCCESS, 
    FETCH_CATEGORIES_ERROR,
} from '../actions/actionTypes'

const initialState = {
    myCategories: [],
    categoreisIsLoading: false,
    error: null 
  };

export default function contacts(state = initialState, action) {

    switch (action.type) {

        case FETCH_CATEGORIES_START:
            return {
                ...state, categoreisIsLoading: true
            }

        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state, categoreisIsLoading: false, myCategories: action.myCategories
            }

        case FETCH_CATEGORIES_ERROR:
            return {
                ...state, categoreisIsLoading: false, error: action.error
            }
  
        default: 
            return state
    }
}