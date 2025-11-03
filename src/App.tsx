// import "tailwindcss";
// import './App.css'
 import { Provider } from "react-redux";
 import { store, persistor } from "./store/store";
// import LayOut from "./layout1/layout";
// import AppLayout from "./layout/AppLayout";
 import { PersistGate } from "redux-persist/integration/react";
 //import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
import SegmentationAccounts from "./pages/Strategy/Segmentation/Accounts";
import SegmentationGroups from "./pages/Strategy/Segmentation/Groups";
import TargetsAndFloors from "./pages/Strategy/TargetsAndFloors";
import Promotions from "./pages/Strategy/Promotions";
import ApprovalControls from "./pages/Strategy/ApprovalControls";
import AboutToExpire from "./pages/Pricing/RenewalsCalendar/AboutToExpire";
import RenewalAll from "./pages/Pricing/RenewalsCalendar/All";
import Error from "./pages/Pricing/RenewalsCalendar/Error";
import Expired from "./pages/Pricing/RenewalsCalendar/Expired";
import Manual from "./pages/Pricing/RenewalsCalendar/Manual";
import Login from "./pages/login";
import ResetPassword from "./pages/resetPassword";
import EditSegmentation from "./pages/editSegmentation";
import ViewDetailsForm from "./pages/viewDetails";
import PricingView from "./pages/pricingView";
//import PriceListsPage from "./pages/PriceListsPage";
import Competitors from "./pages/Strategy/Competitors";

// function App() {
  

//   return (
//     <>
//     {/* <Sidebar/> */}
//      <Provider store={store}>
//        <PersistGate loading={null} persistor={persistor}>
//     <Router>
//     <LayOut>
//      <Routes>
//       <Route path="/" element={< Login/>} />
//       <Route path="/inbox" element={< Inbox/>} />
//       <Route path="/inprogress" element={< Inprogress/>} />
//       <Route path="/awaitingResults" element={< AwaitingResults/>} />
//       <Route path="/drafts" element={< Drafts/>} />
//       <Route path="/completed" element={< Completed/>} />
//       <Route path="/cancelled" element={< Cancelled/>} />
//       <Route path="/trash" element={< Trash/>} />
//       <Route path="/all" element={< All/>} />
//       <Route path="/accounts" element={< Accounts/>} />
//       <Route path="/sites" element={< Sites/>} />
//       <Route path="/groups" element={< Groups/>} />
//       <Route path="/priceLists" element={< PriceLists/>} />
//       <Route path="/erpLoadCompletedTasks" element={< CompletedTasks/>} />
//       <Route path="/erpLoadAwaitingLoad" element={< AwaitingLoad/>} />
//       <Route path="/erpLoadManuallyUpdating" element={< ManuallyUpdating/>} />
//       <Route path="/erpLoadLettingExpire" element={< LettingExpire/>} />
//       <Route path="/erpLoadRecentlyLoaded" element={< RecentlyLoaded/>} />
//       <Route path="/segmentationAccounts" element={< SegmentationAccounts/>} />
//       <Route path="/segmentationGroups" element={< SegmentationGroups/>} />
//       <Route path="/targetsAndFloors" element={< TargetsAndFloors/>} />
//       <Route path="/aboutToExpire" element={< AboutToExpire/>} />
//       <Route path="/renewalAll" element={< RenewalAll/>} />
//       <Route path="/error" element={< Error/>} />
//       <Route path="/expired" element={< Expired/>} />
//       <Route path="/manual" element={< Manual/>} />
//       <Route path="/login" element={<Login/>}/>
//       <Route path="/promotions" element={<Promotions/>}/>
//       <Route path="/approvalControls" element={<ApprovalControls/>}/>
//       <Route path="/resetPassword" element={<ResetPassword/>}/>
//       <Route path="/segmentationAccounts/editSegmentation" element={<EditSegmentation/>}/>
//       <Route path="/competitors" element={<Competitors/>} />
//       <Route path="/inbox/viewDetails" element={<ViewDetailsForm/>}/>
//       <Route path="/inbox/pricingView" element={<PricingView/>} />
//       {/* <Route path="/priceListsPage" element={<PriceListsPage/>} /> */}
//     </Routes>
//     </LayOut>
//     </Router>
//     </PersistGate>
//       </Provider>
//     </>
//   )
// }

// export default App
import { BrowserRouter as Router, Routes, Route } from "react-router";
// import SignIn from "./pages/AuthPages/SignIn";
// import SignUp from "./pages/AuthPages/SignUp";
// import NotFound from "./pages/OtherPage/NotFound";
// import UserProfiles from "./pages/UserProfiles";
// import Videos from "./pages/UiElements/Videos";
// import Images from "./pages/UiElements/Images";
// import Alerts from "./pages/UiElements/Alerts";
// import Badges from "./pages/UiElements/Badges";
// import Avatars from "./pages/UiElements/Avatars";
// import Buttons from "./pages/UiElements/Buttons";
// import LineChart from "./pages/Charts/LineChart";
// import BarChart from "./pages/Charts/BarChart";
// import Calendar from "./pages/Calendar";
// import BasicTables from "./pages/Tables/BasicTables";
// import FormElements from "./pages/Forms/FormElements";
// import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
// import { ScrollToTop } from "./components/common/ScrollToTop";
// import Home from "./pages/Dashboard/Home";

export default function App() {
  return (
    <>
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}></PersistGate>  <Router>
        {/* <ScrollToTop /> */}
        <Routes>
           <Route element={<AppLayout />}>
          {/* <Route path="/" element={< Login/>} /> */}
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
     <Route path="/erpLoadLettingExpire" element={< LettingExpire/>} />      <Route path="/erpLoadRecentlyLoaded" element={< RecentlyLoaded/>} />
      <Route path="/segmentationAccounts" element={< SegmentationAccounts/>} />
      <Route path="/segmentationGroups" element={< SegmentationGroups/>} />
     <Route path="/targetsAndFloors" element={< TargetsAndFloors/>} />
       <Route path="/aboutToExpire" element={< AboutToExpire/>} />
      <Route path="/renewalAll" element={< RenewalAll/>} />
       <Route path="/error" element={< Error/>} />
      <Route path="/expired" element={< Expired/>} />
      <Route path="/manual" element={< Manual/>} />
       {/* <Route path="/login" element={<Login/>}/> */}
      <Route path="/promotions" element={<Promotions/>}/>
       <Route path="/approvalControls" element={<ApprovalControls/>}/>
      <Route path="/resetPassword" element={<ResetPassword/>}/>
       <Route path="/segmentationAccounts/editSegmentation" element={<EditSegmentation/>}/>
     <Route path="/competitors" element={<Competitors/>} />
      <Route path="/inbox/viewDetails" element={<ViewDetailsForm/>}/>
      <Route path="/inbox/pricingView" element={<PricingView/>} />
      {/* <Route path="/priceListsPage" element={<PriceListsPage/>} /> */}
          </Route>

          {/* Auth Layout */}
           <Route path="/login" element={<Login />} />
           <Route path="/" element={<Login />} />
          {/*<Route path="/signup" element={<SignUp />} /> */}

          {/* Fallback Route */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
      </Provider>
    
    </>
  );
}

