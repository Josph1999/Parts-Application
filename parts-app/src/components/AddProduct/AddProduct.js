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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
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
  const dispatch = useDispatch()
    const [error, setError] = useState('')
    const styles = useStyles()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = ()=> {
      setOpen(false)
      setError('')
    }
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [header, setHeader] = useState('');
  const [imageUpload, setImageUpload] = useState([])
  const [imageList, setImageList] = useState([])

 const [notify, setNotify] = useState(false)
  const imageListRef = ref(storage, "images/")
  const small_id = uuid().slice(0,8)


  const yupObject = Yup.object().shape({
    description: Yup.string().required('აღწერა აუცილებელია!'),
    header: Yup.string().required('სათაური აუცილებელია!')

    
  });

 const product = {
  photo: imageList.map(item => item),
  header: header,
  description: description,
  id: small_id.toLocaleUpperCase()
 }



const handleAddProduct = async() => {
try {
  await yupObject.validate(product);
  dispatch(addProduct(product))
  setOpen(false)
  setNotify(true)
  setImageUpload([])
  setImageList([])
  setDescription('')
  setHeader('')
  setError('')
}catch(error){
  alert(error.message)
  setError(error.message)
    console.log(error.message)
}
}

console.log(error)
const handleChange = (event) => {
  for(let i=0; i < event.target.files.length; i++){
    const newImage = event.target.files[i]
    newImage["id"] = product.id
    setImageUpload((prevState) => [...prevState, newImage])
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

 
      console.log("image: ",imageUpload)

const handleAddPhoto = () => {
  const promises = []
 if(imageUpload == null) return;
 imageUpload.map((image) => {
  const imageRef = ref(storage, `images/${image.name + small_id}`)
  promises.push(imageRef)
  uploadBytes(imageRef, image)
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
}, [imageUpload])
console.log("!@#!@#!@#")
  return (
    <div>
        <Button variant="contained" onClick={handleOpen}>პროდუქტის დამატება</Button>
        <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
            <Typography>პროდუქტის დამატება</Typography>
        <div className={styles.input}><TextField required id="outlined-basic" label="სათაური" variant="outlined" onChange={(event) => setHeader(event.target.value)} error={error === 'სათაური აუცილებელია!' ? true:false}/></div>
        <div className={styles.input}><TextField required id="outlined-basic" label="აღწერა" variant="outlined" onChange={(event) => setDescription(event.target.value)} error={error === 'აღწერა აუცილებელია!' ? true:false}/></div> 
        <Input placeholder='დაამატეთ ფოტოს ლინკი' type='file' inputProps={{multiple: true}} onChange={handleChange}></Input>   
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