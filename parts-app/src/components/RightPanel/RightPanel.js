import React from 'react'
import Cards from '../cards/Cards'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useStyles } from './RightPanelStyles';
import { Search, SearchIconWrapper, StyledInputBase } from '../StyledComponents/StyledComponents';
import { StylesContext } from '@mui/styles';



function RightPanel() {
  const styles = useStyles()
  return (
    <div>
       <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" className={styles.main}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
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
    </Box>
       <div className={styles.cards}>
       <Cards/>
       <Cards/>
       <Cards/>
       <Cards/>
       <Cards/>
       <Cards/>
       <Cards/>
       <Cards/>
       <Cards/>
       <Cards/>
       <Cards/>
       <Cards/>
       <Cards/>
       <Cards/>
       <Cards/>
       <Cards/>
       <Cards/>

       </div>
        </div>
  )
}

export default RightPanel