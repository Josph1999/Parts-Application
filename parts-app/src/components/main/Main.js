import React from 'react'
import RightPanel from '../RightPanel/RightPanel'
import LeftPanel from '../leftpanel/Leftpanel'
import { useStyles } from './useStyles';



function Main() {
  const styles= useStyles()
  return (
    <div className={styles.main}>
      <LeftPanel></LeftPanel>
        <RightPanel/>
    </div>
  )
}

export default Main