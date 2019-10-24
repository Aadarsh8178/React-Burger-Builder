import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const addIngredient = (name)=>{
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
}
export const removeIngredient = (name)=>{
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}
export const setIngredients = (ingredients) =>{
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}
export const fetch_ingredients_failed = ()=>{
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
export const initIngredients = ()=>{
    return dispatch => {
        axios.get( 'https://burger-builder-react-2d2be.firebaseio.com/ingredients.json' )
            .then( response => {
                dispatch(setIngredients(response.data))
            } )
            .catch( error => {
                dispatch(fetch_ingredients_failed())
            } );
    }
}