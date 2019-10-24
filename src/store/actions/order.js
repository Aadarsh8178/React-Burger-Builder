import * as actionType from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerFail = (error)=>{
    return {
        type:actionType.PURCHASE_BURGER_FAIL,
        error:error
    }
}
export const purchaseBurgerSuccess = (id,orderdata) =>{
    return {
        type:actionType.PURCHASE_BURGER_SUCCESS,
        id:id,
        order:orderdata
    }
}
export const purchase_init = ()=>{
    return {
        type:actionType.PURCHASE_INIT
    }
}
export const purchaseBurgerStart = ()=>{
    return {
        type:actionType.PURCHASE_BURGER_START
    }
}
export const purchaseBurger = (orderdata,token)=>{
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json?auth='+token, orderdata )
            .then( response => {
                dispatch(purchaseBurgerSuccess(response.data.name,orderdata));
            } )
            .catch( error => {
                dispatch(purchaseBurgerFail(error));
            } );

    } 
}
export const fetchOrdersInit = ()=>{
    return {
        type:actionType.FETCH_ORDERS_INIT
    }
}
export const fetchOrdersSuccess = (orders) =>{
    return {
        type:actionType.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}
export const fetchOrdersFail = (error) =>{
    return {
        type:actionType.FETCH_ORDERS_FAIL,
        error:error
    }
}
export const fetchOrders = (token,userId)=>{
    return dispatch =>{
        dispatch(fetchOrdersInit())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="'+ userId + '"'
        axios.get('/orders.json' + queryParams).then((res)=>{
            const fetchedorders = []
            let key=''
            for(key in res.data){
                fetchedorders.push({
                    ...res.data[key],
                    id : key
                })
            }
            dispatch(fetchOrdersSuccess(fetchedorders));
        }).catch(err =>{
            dispatch(fetchOrdersFail(err));
        })
    }
}