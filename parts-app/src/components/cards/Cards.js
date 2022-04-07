import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useStyles } from './useStyles';

function Cards() {
    const styles = useStyles()
  return (
    <div className={styles.card}>
     <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://image.shutterstock.com/image-photo/passenger-car-assembled-new-spare-260nw-224696404.jpg"
          alt="Car Part"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ნაწილი
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  )
}

export default Cards