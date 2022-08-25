import React, { useState ,useEffect} from 'react'
import { FaUser } from 'react-icons/fa'
import axios from 'axios'
import {useNavigate,useParams} from 'react-router-dom'
//import {getUser,reset} from '../features/admin/adminSlice'
//import { editUser } from '../features/admin/adminSlice'
import { useSelector,useDispatch } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { toast } from "react-toastify";
function UserEdit() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
 
   const [formData, setFormData] = useState({
    name:'',
    email:'',
    phone:''
   });
   const [state,setState]=useState([])  
        
   const { id } = useParams();
   console.log(id+'---------------');     
   useEffect(()=>{

      axios({
        method:'get',
        url:`/api/admin/finduser/${id}`
      }).then((res)=>setFormData(res.data))
    },[])
    
    const { name, email,phone } = formData


    const onChange=(e)=>{
      setFormData((prevState)=>({
          ...prevState,
          [e.target.name]:e.target.value
      }))

  }  

  const onSubmit=async(e)=>{
    e.preventDefault()
    const data=await axios.put(`/api/admin/edituser/${id}`,{name,email,phone})
    navigate('/admin')
  }  
  

  return (
    <>
     <section className="heading">
       <h1>
            <FaUser /> Update User
        </h1> 
        <p> Update an Account</p>
    </section>

    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
            <input type="text"
             className="form-control"
              id="name" name='name'
             value={name} 
             placeholder='Enter your name'
              onChange={onChange}/>

            </div>

            <div className="form-group">
            <input type="text"
             className="form-control"
              id="email" name='email'
             value={email} 
             placeholder='Enter your Email'
              onChange={onChange}/>

            </div>

            <div className="form-group">
            <input type="text"
             className="form-control"
              id="phone" name='phone'
             value={phone} 
             placeholder='Enter your phone Number'
              onChange={onChange}/>

            </div>

            

            


           
            <div className="form-group">
                <button type='submit' className='btn btn-block'>Submit</button>
            </div>
         </form>
    </section>
    </>
  )
}

export default UserEdit