import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT } from "../constants/constants";


export const initialState = {
    productArray: []
}

const rootReducer = (state = initialState,action) => {

    const {type, payload} = action

    switch (type) {
        case ADD_PRODUCT: {
            console.log(initialState)
            return {
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
        default:
           return state
    }

}

export default rootReducer