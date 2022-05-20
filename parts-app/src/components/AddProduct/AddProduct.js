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
import Autocomplete from '@mui/material/Autocomplete';
import { useForm } from "react-hook-form";
import { storage } from '../../firebase/firebase';
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage'
import { Input } from '@mui/material';
const Yup = require('yup');
const cities = require('../../georgian-cities.json')



const AddProduct = () =>{
  console.log(cities, "!@#!#")
 const {errors} = useForm()
  const dispatch = useDispatch()
    const styles = useStyles()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = ()=> setOpen(false)
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [header, setHeader] = useState('');
  const [imageUpload, setImageUpload] = useState(null)
  const [imageList, setImageList] = useState([])

  const imageListRef = ref(storage, "images/")
  const small_id = uuid().slice(0,8)


  const yupObject = Yup.object().shape({
    header: Yup.string().required('სათაური აუცილებელია!'),
    description: Yup.string().required('აღწერა აუცილებელია!'),
    photo: Yup.string().required('ფოტო აუცილებელია!')
    
  });

 const product = {
  photo: imageList,
  description: description,
  header: header,
  id: small_id.toLocaleUpperCase()
 }

 console.log(imageList[0], "THIS IS IT")
const handleAddProduct = async() => {
try {
  await yupObject.validate(product);
  dispatch(addProduct(product))
  setOpen(false)
  setPhoto('')
  setDescription('')
  setHeader('')
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
const defaultProps = {
  options: cities.cities,
  getOptionLabel: (option) => option.name_ka,
};
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      };
const handleAddPhoto = () => {

 if(imageUpload == null) return;
 const imageRef = ref(storage, `images/${imageUpload.name + small_id}`)
 uploadBytes(imageRef, imageUpload).then(() => {
   alert("Image Uploaded")
 })
}
useEffect(() => {
listAll(imageListRef).then((response) => {
response.items.forEach((item) => {
  getDownloadURL(item).then((url) => {
    setImageList((prev) => [...prev, url])
  })
})
})
}, [])
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
        <Input placeholder='დაამატეთ ფოტოს ლინკი' type='file' onChange={(event) => {setImageUpload(event.target.files[0])}}></Input>   
        <div className={styles.input}><Button onClick={handleAddPhoto}>ფოტოს დამატება</Button></div>
        <Autocomplete
        {...defaultProps}
        id="disable-close-on-select"
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField {...params} label="აირჩიეთ ქალაქი" variant="standard" className={styles.cityInput}/>
        )}
      />
       <Autocomplete
        {...defaultProps}
        id="disable-close-on-select"
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField {...params} label="აირჩიეთ უბანი" variant="standard" className={styles.cityInput}/>
        )}
      />
        <Button variant="contained" onClick={handleAddProduct}>პროდუქტის დამატება</Button>
    </Box>
      </Modal>

    </div>
  )
}

export default AddProduct