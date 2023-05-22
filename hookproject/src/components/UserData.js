import {useEffect,useState} from 'react'
import {Outlet,Link} from 'react-router-dom'
import Axios from 'axios'




function UserData() {
    const [userprofiles,setUserprofiles]=useState([])

    useEffect(()=>{
        async function fetchData(){
            const response= await Axios.get("http://localhost:5000/users")
            const profiledata=await response.data 
            console.log(profiledata)
             setUserprofiles(profiledata)
        }
        fetchData()
    },[])
  
    return (
       
        <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",backgroundColor:"lightgray",height:"90vh",paddingLeft:"20px",paddingRight:"20px",width:"85%",overflowY:"auto",flexGrow:"1"}}>
      
    <table style={{marginTop:"10px",tableLayout:"fixed",textAlign:"center"}}>
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Mail</th>
            </tr>
        </thead>
        <tbody >
          {userprofiles.map((each)=>(
            <tr  key={each.Name}>
                <td>{userprofiles.indexOf(each)+1}</td>
                <td>{each.Name}</td>
               <td><Link to={`/active-users/${each.id}`} >{each.Email}</Link> </td>
            </tr>
          ))}
        </tbody>

    </table>
    <div>
        <h3 style={{textAlign:"center"}}>User Details</h3>
        <Outlet/>
       
    </div>
  
    </div>
    
  )
}

export default UserData