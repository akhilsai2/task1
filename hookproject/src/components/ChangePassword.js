import React ,{useState}from 'react'
import {useNavigate} from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs'
import {Button} from 'primereact/button'
import {InputText} from 'primereact/inputtext'
import {Checkbox} from 'primereact/checkbox'

import Axios from 'axios'
import 'primeflex/primeflex.css'


const ChangePassword = () => {
    const [changepassword,setChangepassword]=useState("") 
    const [Username,setUsername]=useState("")
    const [successmessage,setSuccessmessage]=useState("")
    const [show,setShow]=useState(false)
    const [showpassword,setShowpassword]=useState(false)
    const navigate=useNavigate()
    const handlePassword=async ()=>{
        const response= await Axios.put("http://localhost:5000/change-password",{Username,changepassword})
        const data=response.data
        setShow(true)
        setSuccessmessage(data)
        setUsername("")
        setChangepassword("")
    }   
  return (
    <div style={{height:"100vh" ,display:"flex",justifyContent:"center",alignItems:"center"}}>        
    <div  style={{padding:"20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",border:"1px solid #bfbfbf",boxShadow:"0 4px 16px 0 #bfbfbf",width:"450px",height:"350px",borderRadius:"10px"}}>
    <BsArrowLeft style={{fontSize:"20px",alignSelf:"flex-start",paddingLeft:"10px"}} onClick={()=>navigate("/login")}/>
       <label htmlFor="username" className="label mb-2">Username</label>
      <InputText id="username" type="text" placeholder="Enter Username" className="input mb-3"  value={Username} onChange={(e)=>setUsername(e.target.value)}/>
       <label htmlFor="password" className="label mb-2">Create Password</label>
      <InputText id="password" type={showpassword ? "text" : "password"}  placeholder="Create Password" className="input mb-4" value={changepassword} onChange={(e)=>setChangepassword(e.target.value)}/>
      {/* <label htmlFor="reenterpassword" className="label">Re-Enter Password</label>
      <input style={{marginBottom:"5px"}} id="reenterpassword" type="password" placeholder="Re-Enter Password" className="input" value={rePassword}/> */}
    <div style={{display:"flex",alignItems:"center",marginBottom:"5px"}} className="mb-4">
        <Checkbox id="showpass" checked={showpassword} onChange={()=>setShowpassword(prevState=>!prevState)} className="mr-2" /><label htmlFor="showpass" style={{fontSize:"12px",fontWeight:"500"}}>Show Password</label>
        </div>
     {/* <button className="btn" type="button" onClick={handlePassword}>Change Password</button> */}
     <Button label="Change Password" severity="Info" raised onClick={handlePassword}/>
    {show && <p style={{color:"green"}}> {successmessage} </p> }
    </div>
    </div>
  )
}

export default ChangePassword