import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
 main:{
     backgroundColor: '#D27B0E !important'
 },
 cards:{
     display:'flex',
     flexDirection:'row',
     flexWrap:'wrap',
     justifyContent:'center',
     marginLeft:240,
     transition:0.5,
     marginTop: '50px'
 }
})

export {useStyles}