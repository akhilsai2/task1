import React,{useState,useEffect} from 'react'
import {globleState} from './rxstore'

import './card.css'
const Card = () => {
    const [num,setNum]=useState(1)
   useEffect(()=>{
  globleState.getFullStateStore().subscribe((v)=>{
      setNum(v)
    })
   },[])
 
    
   
  return (
    <li className="item">
        <h1>{num}</h1>
       
    </li>
  )
}

export default Card