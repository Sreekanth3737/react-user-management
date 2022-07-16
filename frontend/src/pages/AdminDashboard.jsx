import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate ,useParams} from "react-router-dom";
// import UserEdit from "./UserEdit";
//import { Button, } from 'react-bootstrap'
import Spinner from "../components/Spinner";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import {deleteUser, editUser, getUser,reset} from '../features/admin/adminSlice'
import MainScreen from "../components/MainScreen";
function AdminDashboard() {
const {id}=useParams();
console.log(id+'---------------------');
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const UserUpdate=(id)=>{
    
    navigate(`/useredit/${id}`)
   // dispatch(editUser())
  }



  const { user } = useSelector((state) => state.auth);
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  );
  useEffect(()=>{
    if(isError){
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }
    if (user.role==='user') {
      navigate('/login');
    }
    if(user.role==="admin")
    {
      navigate('/admin')
      dispatch(getUser())
    }
    
    
    
      dispatch(deleteUser())
      //navigate('/admin')
    
    
    

    return ()=>{
         dispatch(reset())
       } 

  },[isError,message,dispatch,user,navigate]);



  if (isLoading) {
    return <Spinner />;
  }


  return (
    <>
    

    <MainScreen title={'Admin Dashboard'} >
    <h1>Welcome {user && user.name}</h1>
    <hr />
 <h2>User Details</h2>
 <hr />
      
 <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">User Id</TableCell>
            <TableCell align="center">User Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Mobile</TableCell>
            <TableCell align="center">Delete</TableCell>
            <TableCell align="center">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {users.map((userData,index)=>
            <TableRow key={userData._id}
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             
              {/* <TableCell component="th" scope="row">
              
              </TableCell> */}

              <TableCell align="center">{userData._id}</TableCell>
              <TableCell align="center">{userData.name}</TableCell>
              <TableCell align="center">{userData.email}</TableCell>
              <TableCell align="center">{userData.phone}</TableCell>
              <TableCell align="center"> <Button onClick={()=>dispatch(deleteUser(userData._id))} variant="contained">Delete</Button> </TableCell>
              <TableCell align="center"> <Button onClick={()=>{UserUpdate(userData._id)}} variant="contained" >Edit</Button></TableCell>

            </TableRow>
            )}
        </TableBody>
      </Table>
    </TableContainer>
     
    </MainScreen>
    </>
  )
}

export default AdminDashboard