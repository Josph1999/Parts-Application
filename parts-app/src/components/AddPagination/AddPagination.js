
import React, {useEffect, useState} from 'react'
import { Pagination } from '@mui/material'
import {  useSelector } from 'react-redux';

const pageSize = 18

const AddPagination = ({setProducts}) => {


    const [pagination, setPagination] = useState({
        count: 0,
        from: 0,
        to: pageSize
    })


    const {productArray: getProducts} = useSelector((state) => ({
        productArray: state.productArray
      }))

    
useEffect(() => {
    const data = getProducts.slice(pagination.from, pagination.to)
    setPagination({...pagination, count: getProducts.length})
    setProducts(data)
},[pagination.from, pagination.to, getProducts])

const handlePageChange = (event, page) => {
    const from = (page -1) * pageSize
    const to = (page-1) * pageSize + pageSize

    setPagination({...pagination, from: from, to: to})
}
       
  return (
      <Pagination count={Math.ceil(pagination.count / pageSize)} onChange={handlePageChange}/>
  )
}

export default AddPagination