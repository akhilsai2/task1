import React,{useMemo} from 'react'
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import './companyprofile.css'
function CompanyProfile() {


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAhRAe0kicdzYKfIf4g-Nf_vqDeAUxGiKo",
  });
  const center = useMemo(() => ({ lat: 17.4537382 , lng: 78.368028 }), []);

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          <div>
           <></>
          <Marker position={{ lat: 17.4537382 , lng: 78.368028 }} />

          </div>
        </GoogleMap>
          
       
      )}
    </div>
  );
   
}

export default CompanyProfile