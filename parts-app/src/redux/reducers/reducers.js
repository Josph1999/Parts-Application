import { ADD_MOVIE } from "../constants/constants";


export const initialState = {
    productArray: []
}

const rootReducer = (state = initialState,action) => {

    const {type, payload} = action

    switch (type) {
        case ADD_MOVIE: {
            console.log(initialState)
            return {
                productArray: [...state.productArray, payload]
            }
        }
        default:
    return state
    }

}

export default rootReducer