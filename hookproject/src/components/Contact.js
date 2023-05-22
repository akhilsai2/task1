import React from 'react'
import Card from './Card'

// 
const ListNum=Array.from(Array(15).keys())
function Contact() {
  return (
    <>
    
   
    <div style={{flexGrow:"1",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",backgroundColor:"lightgray",height:"90vh",width:"85%",overflowY:"scroll"}}>
        <h1 style={{fontFamily:"sans-serif",color:"darkBlue",fontSize:"40px"}}>Contact User</h1>
        <ul style={{listStyleType:"none",display:"flex",justifyContent:"center",alignItems:"flex-start" ,flexWrap:"wrap",width:"100%"}}>
          {ListNum.map(each=><Card item={each} key={each.id}/>)}
        </ul>
    </div>
   
   </>
  )
}

export default Contact