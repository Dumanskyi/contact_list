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


// export function fetchAddCategorySuccess(newCategory) {
//     return {
//         type: FETCH_ADD_CATEGORY_SUCCESS,
//         newCategory: newCategory
//    } 
// }


// export function fetchDeleteCategorySuccess(categoryID) {
//     return {
//         type: FETCH_DELETE_CATEGORY_SUCCESS,
//         categoryID: categoryID
//    } 
// }


// export function fetchDeleteCategory(categoryID) {
//     return async dispatch => {
//         dispatch(fetchCategoriesStart())

//         try {
//             let response = await axios.delete(`http://localhost:3000/categories/${categoryID}`)
//             console.log(response)
//             console.log(categoryID)
//             dispatch(fetchDeleteCategorySuccess(categoryID))
//         } catch (e) {
//             dispatch(fetchCategoriesError(e))
//         }    
//     }
// }

// export function fetchAddCategory(category) {
//     return async dispatch => {
//         dispatch(fetchCategoriesStart())
//         try {
//             await axios.post(`http://localhost:3000/categories/`, category)
//             const response = await axios.get("http://localhost:3000/categories")
//             dispatch(fetchCategoriesSuccess(response.data))
//         } catch (e) {
//             dispatch(fetchCategoriesError(e))
//         }    
//     }
// }
