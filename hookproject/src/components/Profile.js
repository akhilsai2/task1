import React,{useState} from 'react'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {useNavigate} from 'react-router-dom'
import "./profile.css"



function Profile() {
  const [image,setImage]=useState("")
    const navigate=useNavigate()
    const { result, uploader } = useDisplayImage();
    

    function useDisplayImage() {
      const [result, setResult] = React.useState("");
  
      function uploader(e) {
        const imageFile = e.target.files[0];
  
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
          setResult(e.target.result);
        });
  
        reader.readAsDataURL(imageFile);
      }
  
      return { result, uploader };
    }
   
    console.log(result)
    
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",backgroundColor:"white",height:"90vh",paddingLeft:"20px",paddingRight:"20px",width:"85%",flexGrow:"1"}}>             
        {/* <h3>Hi {localStorage.getItem("username")}</h3> 
        <button type="button" onClick={()=>{ Cookies.remove("jwt_token")
        navigate("/login")
  }}>Logout</button> */}
  <div className="profile-container">
    <div style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start",height:"120px",width:"100px",borderRadius:"50px"}}>
    <img src={result} alt="noprofile"  style={{width:"100px",height:"100px",borderRadius:"50px"}}/>
    <IconButton color="primary" aria-label="upload picture" component="label" style={{alignSelf:"flex-end"}}>
        <input hidden accept="image/*" type="file" onChange={(e) => {
          setImage(e.target.files[0]);
          uploader(e);
        }}/>
        <PhotoCamera />
      </IconButton>
    </div>
    
   
  </div>
  </div>
  )
}

export default Profile