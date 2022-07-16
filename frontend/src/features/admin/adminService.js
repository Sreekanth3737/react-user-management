import axios from "axios";
const API_URL='/api/admin/'
const API_DELETE='/api/admin/deleteuser/'
const API_EDIT='/api/admin/edituser/'
//Get user 
const getUser=async (token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`,

        },
    }
    const response=await axios.get(API_URL,config)
    console.log(response.data);

    return response.data
}

//Delete user 
const deleteUser=async (userId,token)=>{


const config={
    headers:{
        Authorization: `Bearer ${token}`,
    }
}
const response = await axios.delete(API_DELETE + userId,config)
return response.data
}

//Edit user
const editUser=async(userId,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }
    const response=await axios.put(API_EDIT + userId,config)
    return response.data
}

const adminService={
    getUser,deleteUser,editUser
}
export default adminService