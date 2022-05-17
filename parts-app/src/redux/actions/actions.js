import {
    ADD_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT
} from '../constants/constants'
import { ToastContainer, toast } from 'react-toastify';

const addProduct = (payload) => ({
    type: ADD_PRODUCT,
    payload
})
const editProduct = (payload) => ({
    type: EDIT_PRODUCT,
    payload,
  });
  const deleteProduct = (payload) => ({
    type: DELETE_PRODUCT,
    payload,
  });

export {addProduct, editProduct, deleteProduct}