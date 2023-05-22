import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiFillCaretRight } from 'react-icons/ai'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Cookies from 'js-cookie'
import { globleState } from './rxstore';


import { useAuth } from './Auth'
import './header.css'



const List = Array.from(Array(6).keys())
const newList = List.map(each => each + 1)
function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);

  };

  return (
    <div>
      {/* <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="btn"
      >
         <AiFillCaretRight className="arrow"/>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      > */}
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}

        className="butn"
      >
        <AiFillCaretRight style={{ color: "white" }} className="arrow" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
        <MenuItem onClick={() => navigate("active-users")}>User</MenuItem>
        <MenuItem onClick={() => navigate("/products/search")}>Products</MenuItem>
        <MenuItem onClick={() => {
          Cookies.remove("jwt_token")
          localStorage.removeItem("username")
          navigate("/login")
        }}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

function MouseOverPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        style={{ fontWeight: "600", cursor: "pointer", fontSize: "15px", color: "white" }}
      >
        Contact Us
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1, height: "100px" }}>Contact Us:<br />Akashavani Radio<br />Assembly<br />Hyderabad
        </Typography>
      </Popover>
    </div>
  );
}

function MouseOverPopoverServices() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        style={{ fontWeight: "600", cursor: "pointer", fontSize: "15px", color: "white" }}
      >
        Services
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ pl: 3, pr: 3, height: "150px" }}>Client Server<hr />Main Server<hr />User Manually<hr />Automation
        </Typography>
      </Popover>
    </div>
  );
}

const routeComponents = [{ value: "Home", path: "/" }, { value: "Products", path: "/products/search" }, { value: "About", path: "/about" }, { value: "Comment", path: "/comment" }, { value: "Profile", path: "/profile" }, { value: "Services", path: "/services" }, { value: "Patners", path: "/patners" }, { value: "Contact", path: "/contact" }]

function Header() {
  const [numvalue, setNumvalue] = useState(1)
  const [searchInput, setSearchInput] = useState("")
  const [err, setErr] = useState(false)
  const auth = useAuth()
  const navigate = useNavigate()


  const handleSearch = () => {
    // e.preventDefault() 
  
    const routeContent = routeComponents.filter(x => x.value === searchInput)
    if (routeContent.length > 0) {
      navigate(`${routeContent[0].path}`)
     
    } else {
      setErr(true)
    }
    setSearchInput("")
  }


  useEffect(() => {
    globleState.getFullStateStore().subscribe((v) => setNumvalue(v))
  }, [searchInput])

  

  if (err) {
    throw new Error("App carshed due to wrong route")
  }
  return (
    
    <nav style={{ height: "10vh", backgroundColor: "rgba(0,0,0)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px" }}>
      <GiHamburgerMenu className="hamburger" onClick={() => { auth.display() }} />
      {/* <div style={{display:"flex",flexDirection:"row"}}>
       <input type="search" placeholder="Search Page" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} /> */}

      {/* <button type="button" style={{marginLeft:"5px"}} onClick={handleSearch}>Go To</button>
       </div> */}

      <input list="route" name="content" id="content" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} style={{
        background:"transparent",border:"1px solid #bfbfbf",borderRadius:"5px",color:"white",outline:"none",
        height:"25px",width:"80px"}} />
      <datalist id="route">
        {routeComponents.map(x => <option value={x.value} />)}
      </datalist>
      <input type="Submit" onClick={handleSearch} style={{background:"transparent",border:"1px solid #f5333f",borderRadius:"10px",color:"#f5333f",width:"80px",fontSize:"10px",height:"25px"}}/>


      {/* <select style={{width:"80px",height:"20px"}}>
            {List.map(each=><option value={each}>{each+1}</option>)}
        </select> */}
      {/* <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={List}
      sx={{ width: 120 ,color:"white"}}
      className="drop"
      renderInput={(params) => <TextField {...params} label="Layout" />}
    /> */}
      <div style={{ width: "65%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <MouseOverPopover />
          <MouseOverPopoverServices />
         
          <select defaultValue={numvalue} name="select" style={{ width: "80px", height: "20px" }} onChange={(e) => {
            globleState.setFullStateStore(e.target.value)
          }}>
            {newList.map(each => <option name="option" value={each}>{each}</option>)}
          </select>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar >{localStorage.getItem("username")[0].toUpperCase()}</Avatar>
            <p style={{ marginLeft: "10px", color: "white", fontSize: "20px", fontWeight: "500" ,marginTop:"10px"}}>HI {localStorage.getItem("username").toUpperCase()}</p>
          </div>
          <PositionedMenu />
        </div>
      </div>
    </nav>

  )
}

export default Header