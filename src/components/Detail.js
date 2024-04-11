import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EmailIcon from '@mui/icons-material/Email';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {useParams,NavLink,useNavigate} from 'react-router-dom';
const Detail = () => {
  const[getuserdata , setUserdata] = useState([]);
  console.log(getuserdata);

  const {id} = useParams("");
  console.log(id);

  const navigate = useNavigate();

  const getdata = async() => {
    
      
    try {
     
      
      const res = await fetch(`/getuser/${id}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      });
      const data = await res.json();
      console.log(data);
      if(res.status === 422 || !data ){
        console.log("error");
      }else{
        setUserdata(data)
        console.log("get data");
      }
    } catch (error) {
     console.log(error);
    }

 }
 useEffect(()=>{
  getdata();
 },[])

 const deleteuser = async(id)=>{
  const res2 = await fetch(`/deleteuser/${id}`,{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json"
    }
  });
  const deletedata = await res2.json();
  console.log(deletedata);
  if(res2.status===422 || !deletedata){
    console.log("error");
  }else{
    console.log("user deleted");
    navigate("/");
  }
}

  return (
    <div className='container mt-3'>
        <h1 style={{fontWeight:400}}>Welcome  {getuserdata.name}</h1>
        <Card sx={{maxWidth:600}}>
          <CardContent>
          <div className='add_btn'>
         <NavLink to={`/edit/${getuserdata._id}`} > <button className='btn btn-primary mx-2'><EditIcon/></button></NavLink>
        <button className='btn btn-danger' onClick={()=>deleteuser(getuserdata._id)}><DeleteTwoToneIcon/></button>
            </div>
            <div className='row'>
            <div className='left_view col-lg-6 col-md-6 col-12'>
            <img src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' style={{width:50}} alt='profile'/>
            < h3 className='mt-3'>Name: <span>{getuserdata.name}</span></ h3>
            < h3 className='mt-3'>Age: <span>{getuserdata.age}</span></h3>
            <p><EmailIcon />Email:<span>{getuserdata.email}</span></p>
            <p>< WorkOutlineIcon/>Occupation:<span>{getuserdata.work}</span></p>
            </div>
           <div className='right_view  col-lg-6 col-md-6 col-12'>
           
            <p className='mt-5'><AddIcCallIcon/>Mobile:<span>{getuserdata.mobile}</span></p>
            <p className='mt-3'><LocationOnIcon/>Location:<span>{getuserdata.address}</span></p>
            <p className='mt-3'>Description:<span> {getuserdata.desc}</span></p>
           </div>
            </div>
           

          </CardContent>
        </Card>
    </div>
  )
}

export default Detail