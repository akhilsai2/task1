import {useState,useEffect,useRef} from 'react'
import {useParams} from 'react-router-dom'
import { Subject } from 'rxjs'
import Axios from 'axios'

function Profile() {
    const [persondata,setPersonData]=useState("")
    const person=new Subject("")
    person.subscribe(x=>setPersonData(x))

    let {id}=useParams()
   
    const  singleData=useRef(async (userId)=>{
      const response= await Axios.get(`http://localhost:5000/users/${userId}`)
      const data=await response.data
      person.next(data[0])
      // setPersonData(data[0])
  })
    useEffect(()=>{
      
        singleData.current(id)
    },[id])
 
  return (
    <div style={{display:"flex",justifyContent:"center",height:"250px"}}>
    <div style={{backgroundColor:"#f9f9f9",paddingLeft:"20px",border:"1px solid #cbd357",borderRadius:"5px",boxShadow:"0px 4px 16px 0px gray", width:"50%",height:"200px"}}>
        <h3>Name : {persondata.Name}</h3>
        <p>username : {persondata.Username}</p>
        <p>Email: {persondata.Email}</p>
        <p>Password : {persondata.Password}</p>
       
    </div>
    </div>
  )
}

export default Profile