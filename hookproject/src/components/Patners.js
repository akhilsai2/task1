import React, { useState } from 'react'
import Axios from 'axios'

import { BsFillSendFill } from 'react-icons/bs'
import './Partners.css'

function Patners() {
  const [searchQuery, setSearchQuery] = useState("")
  const encodedParams = new URLSearchParams();
  const [ansData, setAnsData] = useState("")
  const handleQuery = async () => {
    
    encodedParams.set('in', `${searchQuery}`);
    encodedParams.set('op', 'in');
    encodedParams.set('cbot', '1');
    encodedParams.set('SessionID', 'RapidAPI1');
    encodedParams.set('cbid', '1');
    encodedParams.set('key', 'RHMN5hnQ4wTYZBGCF3dfxzypt68rVP');
    encodedParams.set('ChatSource', 'RapidAPI');
    encodedParams.set('duration', '1');
    
    const options = {
      method: 'POST',
      url: 'https://robomatic-ai.p.rapidapi.com/api',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '0068098e7cmshd47e42b502b7cdfp1ea139jsn49e5f78f2e2b',
        'X-RapidAPI-Host': 'robomatic-ai.p.rapidapi.com'
      },
      data: encodedParams,
    };   
    try {
      const response = await Axios.request(options);
      console.log(response.data)
      setAnsData(response.data.out)
    
    } catch (error) {
      console.error(error);
    }

  }
  return (

    <div className='partners-cont' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "90vh", width: "85%", flexGrow: "1" }}>
      {/* <h1 style={{fontFamily:"sans-serif",color:"darkBlue",fontSize:"40px"}}>Patners</h1> */}
      {/* <video autoplay muted loop playsinline style={{ width: "100%",height: "100%"}}>
  <source src="/images/hero-video.mp4" type="video/mp4" />
</video> */}
      <div style={{ display: "flex", alignItems: "center", height: "20vh" }}>
        <input type="text" placeholder="Enter Query" className="inputz" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button style={{ marginBottom: "10px", marginLeft: "10px", border: "1px solid #bfbfbf", backgroundColor: "transparent", height: "40px", width: "40px", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={handleQuery}>
          <BsFillSendFill style={{ color: "white" }} />
        </button>

      </div>
      <div style={{ backgroundColor: "transparent", height: "200px", width: "50%", borderRadius: "0 50px 0 50px", border: "1px solid #bfbfbf", paddingLeft: "5px" }}>
        <p style={{ color: "white" }}> {ansData}</p>

      </div>
    </div>
  )
}

export default Patners