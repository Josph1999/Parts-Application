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



const AddProduct = () =>{

  const dispatch = useDispatch()
    const styles = useStyles()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = ()=> setOpen(false)
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [header, setHeader] = useState('');

 const {productArray: getProducts} = useSelector((state) => ({
   productArray: state.productArray
 }))

 const product = {
  photo: photo,
  description: description,
  header: header
 }

const handleAddProduct = async() => {
try {
  dispatch(addProduct(product))
  setPhoto('')
  setDescription('')
  setHeader('')
}catch(error){
  console.log(error.message)
}
setOpen(false)

}
console.log(getProducts, "!!!!!!!!!!!!!1")
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
        <div className={styles.input}><TextField id="outlined-basic" label="სათაური" variant="outlined" onChange={(event) => setHeader(event.target.value)}/></div>
        <div className={styles.input}><TextField id="outlined-basic" label="აღწერა" variant="outlined" onChange={(event) => setDescription(event.target.value)}/></div>    
        <div className={styles.input}><TextField id="outlined-basic" label="ფოტო" variant="outlined" onChange={(event) => setPhoto(event.target.value)}/></div>
        <Button variant="contained" onClick={handleAddProduct}>პროდუქტის დამატება</Button>
    </Box>
      </Modal>

    </div>
  )
}

export default AddProduct