import {useState} from 'react'
import {useNavigate,Navigate,NavLink,Link} from 'react-router-dom'
import { InputText } from 'primereact/inputtext';

import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox'

import Cookies from 'js-cookie'
import Axios from 'axios'
import {useAuth} from './Auth'
import 'primeflex/primeflex.css'



function 
Login() {
    const [Username,setUsername]=useState('')
    const [Password,setPassword]=useState('')
     const [errMsg,setErrmsg]=useState("")
     const [showpassword,setShowpassword]=useState(false)
    const [error,setErr]=useState(false)
    const navigate=useNavigate()
    const auth=useAuth()
    // const onLogin=  ()=>{
    //     if (username==="akhil" && email==="akhil222"){
    //         const token=uuidv4()
    //         Cookies.set("jwt_token",token,{expires:30})
    //         auth.login(username)
    //         navigate("/")
    //     }
    //     else{
    //       setError(true)
    //     }
    // }
    const onLogin= async ()=>{ 
      try{
      const response= await  Axios.post("http://localhost:5000/login", {Username,Password})
      console.log(response)
      if (response.statusText==="OK"){
        const data= await response.data
       
            Cookies.set("jwt_token",data.jwtToken,{expires:30})
            auth.login(Username)
            localStorage.setItem("username",data.result[0].Name)
            
            navigate("/")

      }
    }
    catch (err){
      console.log(err.response.data)
      setErrmsg(err.response.data.err)
      setErr(true)
      setUsername('')
      setPassword('')
    }
      
    }
    if (Cookies.get("jwt_token")!==undefined){
      return <Navigate to= "/" replace />
    }else{
  return (
    <>
    {/* <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",height:"100vh"}}>
   
    
    <div  style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",height:"350px",width:"280px",border:"1px solid #bfbfbf",boxShadow:"0px 4px 16px 0px #bfbfbf",borderRadius:"10px"}}>
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",paddingLeft:"15px"}}> 
    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
      
        <label htmlFor="username" style={{marginBottom:"10px",fontWeight:"bold"}}>
            username
        </label>
        <input id="username" style={{marginBottom:"10px"}} type="text" value={Username} onChange={(e)=>setUsername(e.target.value)} /> 
       
      
        <label htmlFor="email" style={{marginBottom:"10px",fontWeight:"bold"}}>
          Password 
        </label>
        <input id="email"   style={{marginBottom:"10px"}} type={showpassword ? "text" : "password"} value={Password} onChange={(e)=>setPassword(e.target.value)}  />
        </div>
        <div style={{display:"flex",alignItems:"center",marginBottom:"5px"}}>
        <input type="checkbox" id="showpass" checked={showpassword} onChange={()=>setShowpassword(prevState=>!prevState)}  /><label htmlFor="showpass" style={{fontSize:"12px",fontWeight:"500"}}>Show Password</label>
        </div>
        <NavLink to="/change-password" style={{marginBottom:"10px"}}>Forgot Password</NavLink>
        <button type="button" className="btn" style={{alignSelf:"center"}}onClick={onLogin}>Login</button>
        
        {error && <p style={{color:"red",fontSize:"10px",fontWeight:"bold"}}> *{errMsg}</p>}
        <NavLink to="/register" style={{marginTop:"5px"}}>Create User</NavLink>
    </div>
    </div>
    </div> */}
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
    <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6 ">
    <div className="text-center mb-5">
        {/* <img src="/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" /> */}
        <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        <span className="text-600 font-medium line-height-3">Don't have an account?</span>
        <Link as="a" className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" to="/register">Create today!</Link>
    </div>

    <div>
        <label htmlFor="email" className="block text-900 font-medium mb-2">Username</label>
        <InputText id="email" type="text" placeholder="Username" className="w-full mb-3" value={Username} onChange={(e)=>setUsername(e.target.value)} />

        <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
        <InputText type={showpassword ? "text" : "password"} placeholder="Password" className="w-full mb-3"   value={Password} onChange={(e)=>setPassword(e.target.value)}/>

        <div className="flex align-items-center justify-content-between mb-6">
            <div className="flex align-items-center">
                <Checkbox id="rememberme" className="mr-2" checked={showpassword} onChange={()=>setShowpassword(prevState=>!prevState)}/>
                <label htmlFor="rememberme" >Show Password</label>
            </div>
            <Link as="a" className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer" to="/change-password">Forgot your password?</Link>
        </div>

        <Button label="Sign In" icon="pi pi-user" onClick={onLogin} className="w-full" />
        {error && <p style={{color:"red",fontSize:"10px",fontWeight:"bold"}}> *{errMsg}</p>}
    </div>
</div>
</div>
</>
  )
    }
}

export default 
Login