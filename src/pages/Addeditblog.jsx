
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBValidation,
  MDBValidationItem,

  MDBBtn
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { storage} from '../firebase'
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import { toast } from "react-toastify";
import { useAddBlogMutation, useFetchBlogQuery ,useUpdateBlogMutation} from "../services/Blogsapi";
import { useNavigate,useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";

const initialState = {
  title: "",
  description: "",
};
export default function Addeditblog() {
  const [data, setdata] = useState(initialState);
  const [file, setfile] = useState(null);
  const [progress, setprogress] = useState(null);
  const { title, description } = data;
  const [addBlog] = useAddBlogMutation();
  const navigate = useNavigate()
  const {id} = useParams()
  const {data:blog} = useFetchBlogQuery(id ? id : skipToken)
  const [  updateBlog ] = useUpdateBlogMutation()
//firebase image ploading code

useEffect(()=>{
    if(id && blog){
       setdata({...blog})
    }
},[id,blog])
useEffect(()=>{

    const uploadfile=()=>{

        const storageref = ref(storage, file.name)
        const uploadTask = uploadBytesResumable(storageref,file);

        uploadTask.on(
            "state_changed",
            (sanpshot)=> {
                const progress = (sanpshot.bytesTransferred / sanpshot.totalBytes) + 100;
                console.log("Upload is" + progress + "% done");
                setprogress(progress);
                switch(sanpshot.state) {
                    case "paused":
                        console.log("Upload is Paused");
                        break;
                    case "running":
                        console.log("upoad is running")
                         break;
                    default:
                        break;

                }
            },
            (error)=>{
                console.log(error);
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    toast.info("image upload succesfull")

                    setdata((prev)=>({...prev,img: downloadURL}));
                });
            }
        )



    };
    file&&uploadfile();
},[file])






  const handlechange = (e) => {
  setdata({...data,[e.target.name]: e.target.value});}

   const handleSubmit= async (e)=>{
    if(title && description){
        if(!id){ await addBlog(data)
            toast.success("blog added successfully")
            navigate("/")}
        else {
            await updateBlog({ id, data })
            toast.success("blog updated successfully")
            navigate("/")
        }
       
    }

   }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h4 className="fw-bold">Create-blog</h4>
        <MDBCardBody>
          <MDBValidation className="row g-3" noValidate
          onSubmit={handleSubmit}>
            <MDBValidationItem
              className="col-md-12"
              feedback="please provide title
            "
              invalid
            >
              <MDBInput
              placeholder="title"
                label="title"
                type="text"
                value={title}
                name="title"
                onChange={
                  handlechange
                }
                className="form-control"
                required
              ></MDBInput>
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="please provide description
            "
              invalid
            >
              <MDBTextArea
                label="description"
                type="text"
                value={description}
                name="description"
                rows={4}
                onChange={
                  handlechange
                }
                className="form-control"
                required
              />
            </MDBValidationItem>
            <div className="col-md-12"><MDBInput type="file" onChange={(e)=>{setfile(e.target.files[0])}}/></div>
            <div className="col-12">
                <MDBBtn style={{width:"100%"}}
                disabled ={progress !==null && progress<100}> submit</MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
