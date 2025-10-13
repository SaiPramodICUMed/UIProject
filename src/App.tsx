import "tailwindcss";
import './App.css'
//import Sidebar from "./components/Sidebar";
import LayOut from "./layout/layout";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Inbox from "./pages/Inbox/Inbox";
import Inprogress from "./pages/Inbox/Inprogress";
import AwaitingResults from "./pages/Inbox/AwaitingResults";
import Drafts from "./pages/Inbox/Drafts";
import Completed from "./pages/Inbox/Completed";
import Cancelled from "./pages/Inbox/Cancelled";
import Trash from "./pages/Inbox/Trash";
import All from "./pages/Inbox/All";
import Accounts from "./pages/Pricing/Accounts/Accounts";
import Sites from "./pages/Pricing/Accounts/Site";
import Groups from "./pages/Pricing/Groups/Groups";
import PriceLists from "./pages/Pricing/PriceLists";
import CompletedTasks from "./pages/Pricing/ERPLoad/CompletedTasks";
import AwaitingLoad from "./pages/Pricing/ERPLoad/AwaitingLoad";
import ManuallyUpdating from "./pages/Pricing/ERPLoad/ManuallyUpdating";
import LettingExpire from "./pages/Pricing/ERPLoad/LettingExpire";
import RecentlyLoaded from "./pages/Pricing/ERPLoad/RecentlyLoaded";

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
      <Route path="/awaitingResults" element={< AwaitingResults/>} />
      <Route path="/drafts" element={< Drafts/>} />
      <Route path="/completed" element={< Completed/>} />
      <Route path="/cancelled" element={< Cancelled/>} />
      <Route path="/trash" element={< Trash/>} />
      <Route path="/all" element={< All/>} />
      <Route path="/accounts" element={< Accounts/>} />
      <Route path="/sites" element={< Sites/>} />
      <Route path="/groups" element={< Groups/>} />
      <Route path="/priceLists" element={< PriceLists/>} />
      <Route path="/erpLoadCompletedTasks" element={< CompletedTasks/>} />
      <Route path="/erpLoadAwaitingLoad" element={< AwaitingLoad/>} />
      <Route path="/erpLoadManuallyUpdating" element={< ManuallyUpdating/>} />
      <Route path="/erpLoadLettingExpire" element={< LettingExpire/>} />
      <Route path="/erpLoadRecentlyLoaded" element={< RecentlyLoaded/>} />
    </Routes>
    </LayOut>
    </Router>
      
    </>
  )
}

export default App
