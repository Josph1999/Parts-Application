import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, GET_PRODUCT } from "../constants/constants";


export const initialState = {
    productArray: [],
    currentProduct: null,
}

const rootReducer = (state = initialState,action) => {

    const {type, payload} = action

    switch (type) {
        case ADD_PRODUCT: {
            return {
                ...state,
                productArray: [...state.productArray, payload]
            }
        }
        case EDIT_PRODUCT: {
        const {photo,description,header,id} = payload
        const copyProductArray = [...state.productArray]

        const movieIndex = copyProductArray.findIndex((item) => item.id === id)
        if(movieIndex === -1) return;

        copyProductArray[movieIndex].photo = photo
        copyProductArray[movieIndex].description = description
        copyProductArray[movieIndex].header = header
        return {
            ...state,
            productArray: copyProductArray
        }
         
        }
        case DELETE_PRODUCT:{
            return{
                ...state,
                productArray: state.productArray.filter((item) => item.id !== payload.id)
            }
        }
        case GET_PRODUCT: {
            const findProduct = state.productArray.find(
                (product) => (product.id) === payload.id
            )
            return {
                ...state,
                currentProduct: findProduct
            }
        }
        default:
           return state
    }

}

export default rootReducer