import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useStyles } from './useStyles';


function Cards({product}) {
    const styles = useStyles()
  return (
    <div className={styles.card}>
     <Card sx={{ width: 250 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.photo}
          alt="Car Part"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.header}
          </Typography>
          <Typography variant="body2" color="text.secondary" className={styles.description}>
    {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  )
}

export default Cards