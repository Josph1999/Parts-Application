import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useStyles } from './useStyles';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { editProduct, deleteProduct } from '../../redux/actions/actions';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

function Cards({ product }) {
  const styles = useStyles()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
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

  const [photo, setPhoto] = useState(product.photo);
  const [description, setDescription] = useState(product.description);
  const [header, setHeader] = useState(product.header);

  const { productArray: getProducts } = useSelector((state) => ({
    productArray: state.productArray
  }))

  const submitEditedHome =  () => {
    const editedHome = {
      photo: photo,
      description: description,
      header: header,
      id: product.id
    }

    dispatch(editProduct(editedHome))
    setOpen(false)

  }
  const handleDeleteProduct = () => {
    dispatch(deleteProduct({ id: product.id }))
    
  }
  console.log(product.photo)
  const images = [
    {
      label: 'San Francisco – Oakland Bay Bridge, United States',
      imgPath: product.photo
    },
    {
      label: 'Bird',
      imgPath:
        'https://thumbs.dreamstime.com/b/luxury-big-modern-house-electric-car-luxury-modern-house-electric-car-141295838.jpg',
    },
    {
      label: 'Bali, Indonesia',
      imgPath:
        'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-23.jpg',
    }
  ];
  
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (
    <div className={styles.card}>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography>პროდუქტის რედაქტირება</Typography>
          <div className={styles.input}><TextField defaultValue={product.header} id="outlined-basic" label="სათაური" variant="outlined" onChange={(event) => setHeader(event.target.value)} /></div>
          <div className={styles.input}><TextField defaultValue={product.description} id="outlined-basic" label="აღწერა" variant="outlined" onChange={(event) => setDescription(event.target.value)} /></div>
          <div className={styles.input}><TextField defaultValue={product.photo} id="outlined-basic" label="ფოტო" variant="outlined" onChange={(event) => setPhoto(event.target.value)} /></div>
          <Button variant="contained" onClick={submitEditedHome}>რედაქტირება</Button>
        </Box>
      </Modal>
      <Card sx={{ width: 400 }}>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<EditIcon />} onClick={handleOpen}>
            რედაქტირება
          </Button>
          <Button variant="outlined" startIcon={<DeleteIcon />} className={styles.delete} onClick={handleDeleteProduct}>
            წაშლა
          </Button>
        </Stack>
        <CardActionArea>
        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
          <CardMedia>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      </CardMedia>
    </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.header}
            </Typography>
            <Typography variant="body2" color="text.secondary" className={styles.description}>
              {product.description}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              ID: {product.id}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default Cards