import React, { useState ,useEffect} from 'react'
import { FaUser } from 'react-icons/fa'
import {useNavigate,useParams} from 'react-router-dom'
import {getUser,reset} from '../features/admin/adminSlice'
import { editUser } from '../features/admin/adminSlice'
import { useSelector,useDispatch } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { toast } from "react-toastify";
function UserEdit() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const { id } = useParams();
  console.log(id+'---------------');
    const {isLoading,isError,message}=useSelector(
        (state)=>state.auth
        )
        const data=useSelector((state)=>
        state.auth.user
        )
        console.log(data._id+'=================');
        const { user } =useSelector((state)=>{ return state.auth
        })
        // console.log(user._id+'=============');
      
        const [formData, setFormData] = useState({});
      
        useEffect(() => {
          dispatch(getUser(user));
        }, []);

        useEffect(()=>{

        if (!data) {
      navigate("/login");
    }
    // if (data && !data.isAdmin) {
    //   navigate("/");
    // }
    let name = user?.name;
    let email = user?.email;
    let phone=user?.phone;
    setFormData({ name, email,phone });
  }, [user, navigate]);

        const onSubmit=(e)=>{

          e.preventDefault()
          let {name,email,phone}=formData
          
          const userData = {
            name,
            email,
            phone,
            id,
          };

          if (!name) {
            toast.error("Name is required");
          } else if (!email) {
            toast.error("Email is required");
          }else{
            dispatch(editUser(userData));
           // navigate("/admin");
          }


      }

    
    const {name,email,phone}=formData;

    // useEffect(()=>{
    //     if(isError){
    //         console.log(message);
    //       }
    //     dispatch(getUser())
    // },[isError,message,user,dispatch])

    const onChange=(e)=>{
        setFormData((prevState)=>({
           ...prevState,[e.target.name]:e.target.value 
        }))
    }
    if (isLoading) {
        return <Spinner />;
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