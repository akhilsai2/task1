import React from 'react'
import {useRoutes} from 'react-router-dom'
import { AuthProvider } from './components/Auth'
import Login from './components/Login'
import Home from './components/Home'
import CompanyProfile from './components/CompanyProfile'
import Events from './components/Events'
import Awards from './components/Awards'
import UserDetails from './components/UserDetails'
import UserData from './components/UserData'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import Comment from './components/Comment'
import Routing from './components/Routing'
import Patners from './components/Patners'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import RegisterUser from './components/RegisterUser'
import './App.css';
import Errorboundaries from './components/Errorboundaries'
import ChangePassword from './components/ChangePassword'
const LazyComponent= React.lazy(()=>import ('./components/Products'))



// function App() {
//   return (
//       <AuthProvider>
       
//       <Routes>
//          <Route 
//          path="login" 
//          element={<Login/>} 
//          />
//         <Route  path="" element={<ProtectedRoute><Routing/></ProtectedRoute>} > 
      
//           <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
//         <Route path="active-users"  element={<ProtectedRoute><UserData/></ProtectedRoute>} >  
//              <Route index  path=":userId" element={<ProtectedRoute><UserDetails/></ProtectedRoute>} />
//         </Route>
//        <Route path="/profile" element={ <ProtectedRoute><Profile/></ProtectedRoute> } />
//        <Route path="/about" element={ <ProtectedRoute><About/></ProtectedRoute> } />
//        <Route path="/services" element={ <ProtectedRoute><Services/></ProtectedRoute> } />
//        <Route path="/patners" element={ <ProtectedRoute><Patners/></ProtectedRoute> } />
//        <Route path="/contact" element={ <ProtectedRoute><Contact/></ProtectedRoute> } />
//        <Route path="/comment"  element={<ProtectedRoute><Comment/></ProtectedRoute>} />
//        <Route path="products/search" element={<ProtectedRoute><Products/></ProtectedRoute>} />

//          </Route> 
        
      
//         {/* <Route path="" element={<ProtectedRoute><Navigate to="products/search" /></ProtectedRoute>} /> */}
//        </Routes>  
          
//    </AuthProvider>
//   );
// }

function App(){
  let element=useRoutes([
    {
      path:"/login",
      element:<Login/>,
      

  },
  {
    path:"/register",
    element:<RegisterUser/>

  },
  {
    path:"/change-password",
    element:<ChangePassword />
  },
  {
    path:"/",
    element:<ProtectedRoute><Errorboundaries><Routing/></Errorboundaries></ProtectedRoute>,
    children:[
      {
        path:"/",
        element:<Home/>,
      },
       {
          path:"company-profile",
          element:<CompanyProfile/>
        },
        {
          path:"events",
          element:<Events/>
        },
        {
          path:"awards",
          element:<Awards/>
        },
      
      
      {
        path:"about",
        element:<About/>
      },
      {
        path:"comment",
        element:<Comment/>
      },
      {
        path:"active-users",
        element:<UserData/>,
        children:[
          {
            path:":id",
            element:<UserDetails/>
          }
        ]
      },
      {
        path:"/services",
        element:<Services/>
      },
      {
        path:"/patners",
        element:<Patners/>
      },
      {
        path:"/products/search",
        element:<React.Suspense fallback={<p>Loading...</p>}><LazyComponent/></React.Suspense>
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path:"/contact",
        element:<Contact/>
      }
     
    ]
  }
  ,
 

  ])
  return <AuthProvider>{element}</AuthProvider>
}

export default App;
