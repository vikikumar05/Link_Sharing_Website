// src/App.js
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import axios from "axios";

function App() {
  const [userDetails, setUserDetails] = useState(null);
// this is example of lifting state up
  const updateUserDetails = (updatedUserDetails) => {
    setUserDetails(updatedUserDetails);
  };

  const isUserLoggedIn = async ()=>{
    const response = await axios.post('http://localhost:5000/auth/isUserLoggedIn', {}, {
      withCredentials: true // this is important to send cookies with the request
     
  });
  updateUserDetails(response.data.user);
  };
  
   useEffect(() => {
    isUserLoggedIn();
  }, []);
 
  return (
    <Routes>
      <Route
        path="/"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout>
              <Home />
            </AppLayout>
          )
        }
      />

      <Route
        path="/login"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout>
              <Login updateUserDetails={updateUserDetails} />
            </AppLayout>
          )
        }
      />
   
   <Route path="/dashboard" element={<Dashboard updateUserDetails={updateUserDetails} />} />

     
    </Routes>
  );
}

export default App;


//change 1:-  <Route path="/dashboard" element={<Dashboard />} />


// learned about hard refresh and lifting state up