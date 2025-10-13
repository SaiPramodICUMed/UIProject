import "tailwindcss";
import './App.css'
//import Sidebar from "./components/Sidebar";
import LayOut from "./layout/layout";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Inbox from "./pages/Inbox/Inbox";
import Inprogress from "./pages/Inbox/Inprogress";
import Drafts from "./pages/Inbox/Drafts";
import AwaitingResults from "./pages/Inbox/AwaitingResults";
import Completed from "./pages/Inbox/Completed";
import Cancelled from "./pages/Inbox/Cancelled";
import Trash from "./pages/Inbox/Trash";
import All from "./pages/Inbox/All";
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
      <Route path="/drafts" element={< Drafts/>} />
      <Route path="/awaitingResults" element={<AwaitingResults/>} />
      <Route path="/completed" element={< Completed/>} />
      <Route path="/cancelled" element={< Cancelled/>} />
      <Route path="/trash" element={< Trash/>} />
      <Route path="/all" element={< All/>} />

      {/* <Route path="/GateDashboard" element={<GateDashboard />} />

      <Route path="/DriverCheckIn" element={<DriverCheckIn />} /> */}
    </Routes>
    </LayOut>
    </Router>
      
    </>
  )
}

export default App
