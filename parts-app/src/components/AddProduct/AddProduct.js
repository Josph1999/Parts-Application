import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './AddProductStyles';
import { addProduct } from '../../redux/actions/actions';
import { initialState } from '../../redux/reducers/reducers';
import Cards from '../cards/Cards'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { useForm } from "react-hook-form";
const Yup = require('yup');

const AddProduct = () =>{
 const {errors} = useForm()
  const dispatch = useDispatch()
    const styles = useStyles()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = ()=> setOpen(false)
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [header, setHeader] = useState('');
  const small_id = uuid().slice(0,8)


  const yupObject = Yup.object().shape({
    header: Yup.string().required('სათაური აუცილებელია!'),
    description: Yup.string().required('აღწერა აუცილებელია!'),
    photo: Yup.string().required('ფოტო აუცილებელია!')
    
  });

 const product = {
  photo: photo,
  description: description,
  header: header,
  id: small_id.toLocaleUpperCase()
 }

const handleAddProduct = async() => {
try {
  await yupObject.validate(product);
  dispatch(addProduct(product))
  setOpen(false)
  setPhoto('')
  setDescription('')
  setHeader('')
  return true
}catch(error){
  toast.error('გთხოვთ შეავსოთ ყველა ველი!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
}


}
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };

  return (
    <div>
        <Button variant="contained" onClick={handleOpen}>პროდუქტის დამატება</Button>
        <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
            <Typography>პროდუქტის დამატება</Typography>
        <div className={styles.input}><TextField required id="outlined-basic" label="სათაური" variant="outlined" onChange={(event) => setHeader(event.target.value)}/></div>
        <div className={styles.input}><TextField required id="outlined-basic" label="აღწერა" variant="outlined" onChange={(event) => setDescription(event.target.value)}/></div>    
        <div className={styles.input}><TextField required id="outlined-basic" label="ფოტო" variant="outlined" onChange={(event) => setPhoto(event.target.value)}/></div>
        <Button variant="contained" onClick={handleAddProduct}>პროდუქტის დამატება</Button>
    </Box>
      </Modal>

    </div>
  )
}

export default AddProduct