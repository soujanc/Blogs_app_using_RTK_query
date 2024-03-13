import React, { useEffect } from 'react'

import { useDleletBlogMutation, useFetchBlogsQuery } from '../services/Blogsapi'
import Spinnr from '../components/Spinnr';
import { MDBRow,MDBCard,MDBCol,MDBCardImage, MDBCardBody, MDBCardTitle, MDBBtn,MDBIcon ,MDBCardText} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { truncate } from 'lodash';
export default function Hom() {
    const {data,isLoading,isError,error} = useFetchBlogsQuery();
   
   
  
    const [dleletBlog] = useDleletBlogMutation()
    useEffect(()=>{
        isError && toast.error(error)
    },[isError])
    if(isLoading){
        return <Spinnr/>

    }

 
    const handledelete =async (id)=>{
        if(window.confirm("are yu sure to delete?")){
          await dleletBlog(id)
          toast.success("blog deleted sucessfully")
        }
    }
  return (
    <div style={{margin:"auto",padding:"15px",maxWidth:"12000px",alignContent:"center"}}>
      <MDBRow

       className="row-cols-1 row-cols-md-3 g-6">
      {data?.map((item)=>(
        
        <MDBCol key={item.id}>
            <MDBCard className="h-100 mt-10">
                <MDBCardImage src={item.img} alt={item.title} style={{maxHeight:"100%"}}position='top'/>
                <MDBCardBody>
                    <MDBCardTitle className='text-start'>{item.title}</MDBCardTitle>
                    <MDBCardText className='text-start'>{truncate(item.description, { length: 80 })}

                    <Link to={`/detail/${item.id}`}>Read more</Link></MDBCardText>
                    <div style={{marginLeft:"5px", float:"right"}}>
                        <MDBBtn className='mt-1' tag='a' color='none'>
                            <MDBIcon
                            fas
                            icon="trash"
                            style={{color:"#dd4b39"}}
                            onClick={()=>handledelete(item.id)}
                            size="lg"/>
                        </MDBBtn>
                        <Link to={`/update/${item.id}`}>
                        <MDBIcon
                             fas
                             icon="edit"
                            style={{color:"#55acee" ,marginLeft:"10px"}}
                            size="lg"/> </Link>
                    </div>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
      ))}
       </MDBRow>
      
    </div>
  )
}
