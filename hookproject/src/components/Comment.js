import React from 'react'



const Comment = () => {
  const [usercomment,setUserComment]=React.useState([])
  const [search,setSearch]=React.useState("")
    
  React.useEffect( ()=>{
    const fetchdata=async()=>{
    const response= await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${search}`)
    const data=await response.json()
    console.log(data)
    setUserComment(data)
    }
    fetchdata()
    },[search])

  return (
   
    <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",backgroundColor:"lightgray",height:"90vh",paddingLeft:"20px",paddingRight:"20px",width:"85%",flexGrow:"1",paddingTop:"5px"}}>
    <label style={{fontWeight:"bold",fontFamily:"cursive"}} htmlFor="searchUser">
        Search <input type="search" id="searchUser" onChange={(e)=>setSearch(e.target.value)}/>
    </label>
    
    <ul style={{listStyleType:"none",padding:"5px",overflowY:"auto"}}>
       {usercomment.map(each=>
      
        <li key={each.id}>
            <p><span style={{fontWeight:"bold"}}>Email : </span>{each.email}</p>
            <p><span style={{fontWeight:"bold"}}>Comment :</span> {each.body}</p>
            <hr/>
        </li>
        
        )}
    </ul>
    </div>
   
  )
}

export default Comment