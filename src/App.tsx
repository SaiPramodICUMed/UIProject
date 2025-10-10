import "tailwindcss";
import './App.css'
//import Sidebar from "./components/Sidebar";
import LayOut from "./layout/layout";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Inbox from "./pages/Inbox/Inbox";
import Inprogress from "./pages/Inbox/Inprogress";
function App() {
  

  return (
    <>
    {/* <Sidebar/> */}
    <Router>
    <LayOut>
     <Routes>
      <Route path="/" element={< Inbox/>} />
      <Route path="/inbox" element={< Inbox/>} />
      <Route path="/inprogress" element={< Inprogress/>} />

      {/* <Route path="/GateDashboard" element={<GateDashboard />} />

      <Route path="/DriverCheckIn" element={<DriverCheckIn />} /> */}
    </Routes>
    </LayOut>
    </Router>
      
    </>
  )
}

export default App
