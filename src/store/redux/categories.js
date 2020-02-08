import {
    FETCH_CATEGORIES_START, 
    FETCH_CATEGORIES_SUCCESS, 
    FETCH_CATEGORIES_ERROR,
    FETCH_ADD_CATEGORY_SUCCESS,
    FETCH_DELETE_CATEGORY_SUCCESS,
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

        case FETCH_DELETE_CATEGORY_SUCCESS:
            let categoriesD = state.myCategories.filter(
                category => category._id !== action.categoryID
            );
            return { ...state, categoreisIsLoading: false, myCategories: categoriesD };

        case FETCH_ADD_CATEGORY_SUCCESS:
            let categories = [...state.myCategories, action.category];
            return { ...state, myCategories: categories };
  
        default: 
            return state
    }
}