import React, {useState} from 'react'
import Cards from '../cards/Cards'

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useStyles } from './RightPanelStyles';
import { Search, SearchIconWrapper, StyledInputBase, DrawerHeader, AppBar, Main } from '../StyledComponents/StyledComponents';
import { StylesContext } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Leftpanel from '../leftpanel/Leftpanel';
import Button from '@mui/material/Button';
import AddProduct from '../AddProduct/AddProduct';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/actions/actions';
import { initialState } from '../../redux/reducers/reducers';



function RightPanel() {
  const dispatch = useDispatch()
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [header, setHeader] = useState('');

 const {productArray: getProducts} = useSelector((state) => ({
   productArray: state.productArray
 }))

  const drawerWidth = 240
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const styles = useStyles()

  return (
    <div>
      
       <Box sx={{ flexGrow: 1 }} >
      <AppBar position="fixed" className={styles.main} open={open}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            მანქანის ნაწილები
          </Typography>
          <AddProduct/>
          <Typography>ძებნა</Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        
<Leftpanel></Leftpanel>

      </Drawer>
    </Box>
    <Main open={open}>
       <div className={styles.cards}>
      {getProducts.map((item, index) => (
        <Cards key={index} product={item} />
      ))}
       </div>
    
       </Main>
        </div>
  )
}

export default RightPanel