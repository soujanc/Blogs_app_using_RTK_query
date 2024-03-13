import React from 'react'
import {useNavigate} from "react-router-dom"
import {MDBNavbar,MDBNavbarNav,MDBNavbarItem,MDBContainer,MDBNavbarBrand} from "mdb-react-ui-kit"
export default function Nav() {
    const navigate = useNavigate()
  return (
   <MDBNavbar expand="lg" dark bgColor='dark'>
    <MDBContainer fluid>
   <MDBNavbarBrand tag="span" className='mn-0 h1 fw-bold'>RTK-Blog</MDBNavbarBrand>
   <div>
    <MDBNavbarBrand className='mb-2 mb-lg-0' fullwidth="false">
        <MDBNavbarItem ><p className="header-text" onClick={()=>{navigate("/")}}>Home</p>

        </MDBNavbarItem>
        <MDBNavbarItem><p className="header-text"  onClick={()=>{navigate("/create")}}>create</p>

        </MDBNavbarItem>
    </MDBNavbarBrand>
   </div>
    </MDBContainer>
   </MDBNavbar>
  )
}
