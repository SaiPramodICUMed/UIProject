import "tailwindcss";
import './App.css'
//import Sidebar from "./components/Sidebar";
import LayOut from "./layout/layout";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Inbox from "./pages/inbox";
function App() {
  

  return (
    <>
    {/* <Sidebar/> */}
    <Router>
    <LayOut>
     <Routes>
      <Route path="/" element={< Inbox/>} />

      {/* <Route path="/GateDashboard" element={<GateDashboard />} />

      <Route path="/DriverCheckIn" element={<DriverCheckIn />} /> */}
    </Routes>
    </LayOut>
    </Router>
      
    </>
  )
}

export default App
