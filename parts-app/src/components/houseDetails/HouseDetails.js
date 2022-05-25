import React, { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import { storage } from '../../firebase/firebase';
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage'
import { v4 as uuid } from 'uuid';
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
const HouseDetails = ()=> {

  const [photos, setPhotos] = useState([])
 const [file, setFile] = useState(null)



  const { currentProduct, productArray } = useSelector((state) => ({
    productArray: state.productArray,
    currentProduct: state.currentProduct,
  }));
  const imageListRef = ref(storage, "images/")
  const [imageUpload, setImageUpload] = useState([])
  const [imageList, setImageList] = useState([])
  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const onUpload = async() => {
    const storageRef = storage.ref()
    const fileRef = storageRef.child(file.name)
   await fileRef.put(file)
   console.log(fileRef, "THIS IS FILE REF")
  }
  const small_id = uuid().slice(0,8)
  const handleAddPhoto = () => {
    const promises = []
   if(imageUpload == null) return;
   imageUpload.map((image) => {
    const imageRef = ref(storage, `images/${image.name + small_id}`)
    promises.push(imageRef)
    uploadBytes(imageRef, image)
   })
  }
  const handleChange = (event) => {
    for(let i=0; i < event.target.files.length; i++){
      const newImage = event.target.files[i]
      newImage["id"] = currentProduct.id
      setImageUpload((prevState) => [...prevState, newImage])
    }
  }
  useEffect(() => {
  listAll(imageListRef).then((response) => {
  response.items.forEach((item) => {
    getDownloadURL(item).then((url) => {
      setImageList((prev) => [...prev, {url, id: currentProduct.id}])
      imageList["id"] = currentProduct.id
    })
  })
  })
  }, [])
  
  console.log(imageList.map(item => item))
  console.log(imageList, "THIS IS IMAGE UPLOADDDDDDDDDD")
  return (
  <>
    <div>{currentProduct.header}</div>
    <Input placeholder='დაამატეთ ფოტოს ლინკი' type='file' inputProps={{multiple: true}} onChange={handleChange}></Input>   
        <Button onClick={handleAddPhoto}>ფოტოს დამატება</Button>
        {imageList.map((item, index) => (
        <img key={index} src={item} />
      ))}
    </>
  )
}

export default HouseDetails