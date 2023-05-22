import React from 'react'
import Card from './Card'
// import {useAuth} from './Auth'

// const ListNum=[{id:1,value:"one1"},{id:2,value:"two2"},{id:3,value:"three3"},{id:4,value:"four4"},{id:5,value:"five5"},{id:6,value:"six6"},{id:7,value:"seven7"},{id:8,value:"eight8"},{id:9,value:"nine9"},{id:10,value:"ten10"}]
const ListNum=Array.from(Array(15).keys())
function Services() {
  
  return (

    <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",backgroundColor:"lightgray",height:"90vh",width:"85%",flexGrow:"1",overflowY:"scroll"}}>
        <h1 style={{fontFamily:"sans-serif",color:"darkBlue",fontSize:"40px"}}>Services</h1>
        <ul style={{listStyleType:"none",display:"flex",justifyContent:"center",alignItems:"flex-start" ,flexWrap:"wrap",width:"100%"}}>
          {ListNum.map(each=><Card item={each} key={each.id}/>)}
        </ul>
    </div>
   
  )
}

export default Services