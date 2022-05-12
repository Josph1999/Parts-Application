import {
    ADD_MOVIE
} from '../constants/constants'


const addProduct = (payload) => ({
    type: ADD_MOVIE,
    payload
})

export {addProduct}