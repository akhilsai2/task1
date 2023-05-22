import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs'
import Axios from 'axios'

const RegisterUser = () => {
  const [Username,setUsername]=useState("")
  const [Password,setPassword]=useState("")
  const [Email,setEmail]=useState("")
  const [Name,setName]=useState("")
  const [rePassword,setRepassword]=useState("")
  const [passerr,setPassErr]=useState(false)
  const [show,setShow]=useState(false)
  const [register,setRegister]=useState("")
  const navigate=useNavigate()

  const fileSubmit= async (e)=>{

    e.preventDefault()
    
    const response= await Axios.post("http://localhost:5000/register",{Name,Username,Email,Password})
    const data=response.data
    console.log(data)
    setShow(true)
    setRegister(data)
    
    
  }
  return (
   
   
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
      
         <div className="createCard">
         <BsArrowLeft style={{fontSize:"20px",alignSelf:"flex-start",paddingLeft:"10px"}} onClick={()=>navigate("/login")}/>
          
    <form className="form"  onSubmit={fileSubmit}>
      <label  htmlFor="name" className="label">Name</label>
      <input id="name" type="text" placeholder="Enter Name" className="input" value={Name} onChange={(e)=>setName(e.target.value)}/>
      <label htmlFor="username" className="label">Username</label>
      <input id="username" type="text" placeholder="Enter Username" className="input"  value={Username} onChange={(e)=>setUsername(e.target.value)}/>
      <label htmlFor="email" className="label">Email</label>
      <input id='email' type="text" placeholder="Enter Email" className="input" value={Email} onChange={(e)=>setEmail(e.target.value)}/>
      <label htmlFor="password" className="label">Create Password</label>
      <input id="password" type="password" placeholder="Create Password" className="input" value={Password} onChange={(e)=>setPassword(e.target.value)}/>
      <label htmlFor="reenterpassword" className="label">Re-Enter Password</label>
      <input style={{marginBottom:"5px"}} id="reenterpassword" type="password" placeholder="Re-Enter Password" className="input" value={rePassword} onChange={(e)=>{
        setRepassword(e.target.value)
        if (Password!==e.target.value){
          setPassErr(true)
        }else{
          setPassErr(false)
        }
      }}/>
      {passerr && <p style={{color:"red"}}>*Password must be same</p>}
      <button className="btn" type="submit">Create User</button>
    </form>
    {show && <p style={{color:"green"}}>{register} </p>}
  </div>
  </div>
    
  )
}

export default RegisterUser