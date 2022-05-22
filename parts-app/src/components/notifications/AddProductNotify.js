import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
function AddProductNotify({notify}) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

 const [open, setOpen] = useState(false)
 const handleClose = () => {
setOpen(false) 
}
    const action = (
      <React.Fragment>
               <Alert severity="success" sx={{ width: '100%' }}>
          პროდუქტი დამატებულია!
        </Alert>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );

  return (
    <div>
      <Snackbar open={open} autoHideDuration={1000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} action={action}>
        </Snackbar> 
  </div>
  )
}

export default AddProductNotify