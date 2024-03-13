import React , {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useFetchBlogQuery } from '../services/Blogsapi'
import { skipToken } from '@reduxjs/toolkit/query'
import {MDBCard,MDBCardBody,MDBCardImage, MDBCardText, MDBCardTitle,MDBTypography} from "mdb-react-ui-kit"
import { toast } from 'react-toastify'

export default function Detail() {
    const id = useParams()
    const { data: dat, isLoading, isError, error } = useFetchBlogQuery(id.id);


    useEffect(()=>{ isError && toast.error(error)},[isError])
  
    if (id.id.length <= 0) {
        return (<>
        No data
        </>)
    }

    return (
  
    <>
      <MDBCard className="mb-5">
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>        <MDBCardImage position='top' src ={dat?.img} alt={dat?.title} style={{marginTop:"20px",height:"600px" ,width:"500px",borderRadius:"25px", objectFit:"cover"}}/>
</div>
        <MDBCardBody>
            <MDBCardTitle className='h3 fw-bold'>{dat?.title}</MDBCardTitle>
            <MDBCardText className='text-start'>
                <span className='fw-bld'>Created at -&nbsp;</span>
                  <small className="text-muted h6">
                    {dat?.timestamp.toDate().toLocaleString()}
                  </small>
            </MDBCardText>
            <MDBTypography blockquote className="text-start mb-0">{dat?.description}</MDBTypography>
        </MDBCardBody>
      </MDBCard>
    </>
  )
}
