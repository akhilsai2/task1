import React ,{memo} from 'react'
import {useBoolean} from '@chakra-ui/react'
import {NavLink,Outlet} from 'react-router-dom'
import {FiCornerDownLeft} from 'react-icons/fi'
import {AiOutlineDown} from 'react-icons/ai'
import {useAuth} from './Auth'
// import {MdOutlineRestore,MdOutlineFavorite,MdLocationOn} from 'react-icons/md'
// import Box from '@mui/material/Box';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Header from './Header'
import './routing.css'

const HomeList=[{id:1,value:"Company",to:"company-profile"},{id:2,value:"Events",to:"events"},{id:3,value:"Awards",to:"awards"}]



function Routing() {
    const [section,setSection] = useBoolean(false)
    const auth=useAuth()
    // console.log(auth.show)
    // const [value,setValue]=useState(0)
    const setTransition = auth.show ?  "side-bar" : "side-bar slide"
    const sectionTransition = section ?   "section-bar" :"section-bar drop" 
    const navLinkstyles=({isActive})=>{
        return {
            fontWeight:isActive ? "bold" : "normal",
            textDecoration:"none",
            fontFamily:"cursive",
            color:isActive ? "black" :"#f8f9f9",
            height:"50px",
            backgroundColor:isActive ? "#00ffffff" : null,
            opacity:"0.8",
            paddingLeft:"5px",
            paddingRight:"5px",
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between" ,
            alignItems:"center"
        }
    }
    const navStyles=(id)=>{
      return{
        fontWeight:"bold",
        textDecoration:"none",
        fontFamily:"cursive",
        color: "black",
        height:"30px",
        fontSize: "15px",                
        paddingLeft:"5px",
        paddingRight:"5px",
        display:"flex",
        flexDirection: "column",  
        justifyContent: "center",
        borderBottom : id===3 ? null : "1px solid black"
      }
    }
    
  
  return (
    <>
    <div><Header  /></div> 
    <div style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start"}}>
   
   
    
     <div className={setTransition}  > 
        <div style={{display:"flex",justifyContent:"flex-end",alignItems :"center"}} >
          <FiCornerDownLeft className="select" onClick={()=>auth.display()}/>
        
        </div>
        <div style={{height:"50px"}}>
        <NavLink to="/" style={navLinkstyles}>Home <AiOutlineDown  onClick={setSection.toggle}/>   </NavLink >
        
       </div>     
        <div  className={sectionTransition} > 
        {HomeList.map(each=>(
          <>
             <NavLink to={each.to} style={navStyles(each.id)} >{each.value}</NavLink>
            
             </>
        ))}     
         {/* <NavLink to="company-profile" style={navStyles} >Company Profile</NavLink>
          
          <NavLink to="events" style={navStyles}>Events</NavLink>
          <hr/>
          <NavLink to="awards" style={navStyles}>Awards</NavLink> */}
        </div> 
        
        <div style={{height:"50px"}}>
        <NavLink to ="about" style={navLinkstyles} >About <AiOutlineDown onClick={setSection.toggle}/></NavLink>
        </div>
       {/* <div  className={sectionTransition} >
          <div>
         <p>Company Profile</p>
          <hr/>
          <p>Company Profile</p>
          <hr/>
          <p>Company Profile</p>
          </div>
           
        </div>   */}
        
        <div style={{height:"50px"}}>
        <NavLink to ="contact" style={navLinkstyles}>Contact <AiOutlineDown /></NavLink>
        </div>
        {/* <div  className={sectionTransition} >
          <div>
         <p>Company Profile</p>
          <hr/>
          <p>Company Profile</p>
          <hr/>
          <p>Company Profile</p>
          </div>
           
        </div>  */}
        <div style={{height:"50px"}}>
        <NavLink to ="services" style={navLinkstyles}>Services</NavLink>
        </div>
        <div style={{height:"50px"}}>
        <NavLink to ="patners" style={navLinkstyles}>Patners</NavLink>
        </div>
        <div style={{height:"50px"}}>
        <NavLink to="active-users" style={navLinkstyles}>Users</NavLink>
        </div>
        <div style={{height:"50px"}}>
        <NavLink to="comment" style={navLinkstyles}>Comment</NavLink>
        </div>
        <div style={{height:"50px"}}>
        <NavLink to="products/search" style={navLinkstyles}>Products</NavLink>
        </div>
        <div style={{height:"50px"}}>
        <NavLink to ="profile" style={navLinkstyles}>Profile</NavLink>
        </div>
        <div style={{height:"50px"}}>
        <NavLink to="login" style={navLinkstyles}>Login</NavLink>   
        </div> 
      
    </div>

{/* <Box sx={{ width: 250,height:"90vh" ,display:"flex",flexDirection:"column"}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<MdOutlineRestore/>} />
        <BottomNavigationAction label="Favorites" icon={<MdOutlineFavorite/>} />
        <BottomNavigationAction label="Nearby"  icon={<MdLocationOn/>} />
      </BottomNavigation>
    </Box> */}

    <Outlet/>
 
   </div>
   </>
  )
}

export default  memo(Routing)