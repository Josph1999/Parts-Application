import React from 'react'
import RightPanel from '../RightPanel/RightPanel'
import LeftPanel from '../leftpanel/Leftpanel'
import { useStyles } from './useStyles';
import Button from '@mui/material/Button';




function Main() {
  const styles= useStyles()
  return (
    <div className={styles.main}>
        <RightPanel/>
      
    </div>
  )
}

export default Main