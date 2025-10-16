import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addTaskCount } from "../store/userSlice";

export default function layOut({ children }: { children: React.ReactNode }) {
  const subitems: any = {
    inbox: "inbox",
    pricing: "accounts",
    strategy: "segmentationAccounts",
    email: "allMails",
    admin: "user",
  };
  const menusFrom: any = {
    drafts: "inbox",
    inprogress: "inbox",
    completed: "inbox",
    accounts: "pricing",
    sites: "pricing",
    locations: "pricing",
    segmentationAccounts: "strategy",
    segmentationGroups: "strategy",
    analysis: "strategy",
    forecast: "strategy",
    allMails: "email",
    archived: "email",
    unread: "email",
    user: "admin",
    transilation: "admin",
    contrySettings: "admin",
    templates: "admin",
    groups: "pricing",
    priceLists: "pricing",
    erpLoadCompletedTasks: "pricing",
    erpLoadAwaitingLoad: "pricing",
    erpLoadManuallyUpdating: "pricing",
    erpLoadLettingExpire: "pricing",
    erpLoadRecentlyLoaded: "pricing",
    renewalsCalendar: "pricing",
    targetsAndFloors: "strategy",
    approvalControls: "strategy",
    competitors: "strategy",
    promotions: "strategy",
    aboutToExpire: "pricing",
  };

  const location = useLocation();
  const cleanPath = location.pathname.startsWith("/")
    ? location.pathname.slice(1)
    : location.pathname;
  if (cleanPath === "login" || cleanPath === "") {
    return <>{children}</>;
  }

  //console.log(menusFrom[cleanPath],cleanPath);

  const [activeMenu, setActiveMenu] = useState("inbox");
  const [activeSub, setActiveSub] = useState("inbox");
  const [drawerOpen, setDrawerOpen] = useState(false);
  //const [showSubmenu, setShowSubmenu] = useState(false);
  const [showSegmentation, setShowSegmentation] = useState(false);
  const [showErpLoad, setShowErpLoad] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);
  //const [showRenewvals,setshowRenewvals]=useState(false);
  const [activeSubSub, setActiveSubSub] = useState("");
  const priceSubItems: any = [
    "erpLoadAwaitingLoad",
    "erpLoadManuallyUpdating",
    "erpLoadLettingExpire",
    "erpLoadRecentlyLoaded",
    "erpLoadCompletedTasks",
  ];
  const subchildItems: any = {
    sites: "accounts",
    accounts: "accounts",
    erpLoadAwaitingLoad: "erpLoadCompletedTasks",
    erpLoadManuallyUpdating: "erpLoadCompletedTasks",
    erpLoadLettingExpire: "erpLoadCompletedTasks",
    erpLoadRecentlyLoaded: "erpLoadCompletedTasks",
    erpLoadCompletedTasks: "erpLoadCompletedTasks",
    segmentationAccounts:"segmentationAccounts",
    segmentationGroups:"segmentationAccounts"
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.users);
  // console.log('reduxData', user);
  const activeSUbMenu = (sub: string) => {
    setActiveSub(sub);
    navigate(`/${sub}`);
  };
  const taskCount = useSelector((state: any) => state.user.taskCount);
  const activeMenuItem = (menu: string) => {
    setActiveMenu(menu);
    setActiveSub(subitems[menu] || "inbox");
    navigate(`/${subitems[menu] || "/inbox"}`);
  };
  const activeSubSubMenu = (sub: string) => {
    console.log("menu", sub, subchildItems[sub]);
    setActiveSubSub(sub);
    setActiveSub(subchildItems[sub]);
    navigate(`/${sub}`);
  };

  useEffect(() => {
    const path = location.pathname.startsWith("/")
      ? location.pathname.slice(1)
      : location.pathname;

    // If we have a mapping (menusFrom[path]) use it, otherwise default to 'inbox'
    let mainMenu: any;
    const subchilditems = [...priceSubItems, "accounts", "sites","segmentationGroups","segmentationAccounts"];
    console.log(subchilditems);
    if (subchilditems.includes(path)) {
      setActiveSubSub(path);
      setActiveSub(subchildItems[path] || "inbox");
      mainMenu = menusFrom[subchildItems[path]] || "inbox";
      console.log(path, subchildItems[path], menusFrom[subchildItems[path]]);
    } else {
      mainMenu = menusFrom[path] || "inbox";

      setActiveMenu(mainMenu);
      setActiveSub(path || "inbox");
    }
  }, [location.pathname]);

  const fetchTasksCount = async () => {
    try {
      const response = await axios.get(
        `https://vm-www-dprice01.icumed.com:5000/api/Inbox/taskCounts/8375`,
        { headers: { "Content-Type": "application/json" } } // optional config
      );

      console.log("Task count API Response:", response.data);
      dispatch(addTaskCount(response.data));
      return response.data;
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
      return null;
    }
  };

  useEffect(() => {
    fetchTasksCount();
  }, []);

  return (
    <div className=" flex flex-col text-gray-800 overflow-hidden">
      {/* Top Navbar */}
      <nav className="bg-[#0f59ac] text-white text-sm border-b border-white">
        <div className=" mx-auto px-4 py-1 flex justify-between items-center mr-2">
          {/* <h1 className="text-lg font-bold">My Web App</h1> */}
          <div className="flex items-center gap-2">
            <img
              src="/ICU-Medical-logo.jpg"
              alt="Logo"
              className="h-14
               p-0 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <button
              onClick={() => activeMenuItem("inbox")}
              className={
                "font-medium " +
                (activeMenu == "inbox"
                  ? "bg-white text-blue-900 font-semibold px-5 py-1 rounded"
                  : " xl:px-2 hover:text-blue-200")
              }
            >
              Inbox
            </button>
            <button
              onClick={() => activeMenuItem("pricing")}
              className={
                "font-medium " +
                (activeMenu == "pricing"
                  ? "bg-white text-blue-900 font-semibold px-5 py-1 rounded"
                  : " xl:px-2 hover:text-blue-200")
              }
            >
              Pricing
            </button>
            <button
              onClick={() => activeMenuItem("strategy")}
              className={
                "font-medium " +
                (activeMenu == "strategy"
                  ? "bg-white text-blue-900 font-semibold px-5 py-1 rounded"
                  : "xl: px-2 hover:text-blue-200")
              }
            >
              Strategy
            </button>
            <button
              onClick={() => activeMenuItem("email")}
              className={
                "font-medium " +
                (activeMenu == "email"
                  ? "bg-white text-blue-900 font-semibold px-5 py-1 rounded"
                  : " xl:px-2 hover:text-blue-200")
              }
            >
              Email
            </button>
            <button
              onClick={() => activeMenuItem("admin")}
              className={
                " mr-11 font-medium " +
                (activeMenu == "admin"
                  ? "bg-white text-blue-900 font-semibold px-5 py-1 rounded"
                  : "xl: px-2 hover:text-blue-200")
              }
            >
              Admin
            </button>
            <button
              // onClick={() => activeMenuItem("profile")}
              className={
                activeMenu == ""
                  ? "bg-white text-blue-900 font-semibold px-5 py-1 rounded"
                  : "font-medium flex items-center space-x-2bg-white text-white font-semibold px-5 rounded hover:text-blue-200"
              }
            >
              <FaUserCircle className="text-2xl  m-2" />
              <span>{user.userName}</span>
            </button>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Submenu (Desktop) */}
      {activeSub && (
        <div className="hidden md:block bg-white text-sm shadow-md shadow-gray-300 mb-4">
          <div className="mx-auto px-4 flex space-x-4">
            {activeMenu == "inbox" && (
              <>
                <button
                  onClick={() => activeSUbMenu("inbox")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "inbox"
                      ? "bg-[#0f59ac] text-white "
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  Inbox ({taskCount.inbox})
                </button>
                <button
                  onClick={() => activeSUbMenu("drafts")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "drafts"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  Drafts ({taskCount.draft})
                </button>
                <button
                  onClick={() => activeSUbMenu("inprogress")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "inprogress"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  In progress ({taskCount.inProgress})
                </button>
                <button
                  onClick={() => activeSUbMenu("awaitingResults")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "awaitingResults"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  Awaiting Results ({taskCount.awaitingResults})
                </button>
                <button
                  onClick={() => activeSUbMenu("completed")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "completed"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  Completed
                </button>
                <button
                  onClick={() => activeSUbMenu("cancelled")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "cancelled"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  Cancelled
                </button>
                <button
                  onClick={() => activeSUbMenu("trash")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "trash"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  Trash
                </button>
                <button
                  onClick={() => activeSUbMenu("all")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "all"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  All
                </button>
              </>
            )}

            {activeMenu == "pricing" && (
              <>
                <button
                  // onClick={() => activeSUbMenu("accounts")}
                  className={
                    "px-3 py-2 font-medium border-b-2 relative " +
                    (activeSub == "accounts" || activeSub == "sites"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                  onMouseEnter={() => setShowAccounts(true)}
                  onMouseLeave={() => setShowAccounts(false)}
                >
                  Accounts
                  {showAccounts && (
                    <ul className="absolute left-0 top-full mt-0 text-[#0f59ac] bg-white border shadow-lg rounded w-48 z-[9999]">
                      <li
                        className="px-4 py-2 border hover:bg-blue-100 cursor-pointer"
                        onClick={() => activeSUbMenu("accounts")}
                      >
                        Account
                      </li>
                      <li
                        className="px-4 py-2 border hover:bg-blue-100 cursor-pointer"
                        onClick={() => activeSUbMenu("sites")}
                      >
                        Site
                      </li>
                    </ul>
                  )}
                </button>
                <button
                  onClick={() => activeSUbMenu("groups")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "groups"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  Groups
                </button>
                <button
                  onClick={() => activeSUbMenu("priceLists")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "priceLists"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  Price Lists
                </button>
                <button
                  className={
                    "px-3 py-2 font-medium border-b-2 relative " +
                    // (activeSub == "erpLoadCompletedTasks"
                    (priceSubItems.includes(activeSub)
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                  onMouseEnter={() => setShowErpLoad(true)}
                  onMouseLeave={() => setShowErpLoad(false)}
                >
                  ERP Load
                  {/* Sub-submenu */}
                  {showErpLoad && (
                    <ul className="absolute left-0 top-full mt-0 text-[#0f59ac] border bg-white shadow-lg  rounded w-48 z-[9999]">
                      <li
                        className="px-4 py-2 border border  hover:bg-blue-100 cursor-pointer"
                        onClick={() => activeSUbMenu("erpLoadCompletedTasks")}
                      >
                        Completed Tasks
                      </li>
                      <li
                        className="px-4 py-2 border hover:bg-blue-100 cursor-pointer"
                        onClick={() => activeSUbMenu("erpLoadAwaitingLoad")}
                      >
                        Awaiting Load
                      </li>
                      <li
                        className="px-4 py-2 border hover:bg-blue-100 cursor-pointer"
                        onClick={() => activeSUbMenu("erpLoadManuallyUpdating")}
                      >
                        Manually Updating
                      </li>
                      <li
                        className="px-4 py-2 border hover:bg-blue-100 cursor-pointer"
                        onClick={() => activeSUbMenu("erpLoadLettingExpire")}
                      >
                        Letting Expire
                      </li>
                      <li
                        className="px-4 py-2 border hover:bg-blue-100 cursor-pointer"
                        onClick={() => activeSUbMenu("erpLoadRecentlyLoaded")}
                      >
                        Recently Loaded
                      </li>
                    </ul>
                  )}
                </button>
                {/* <button
                 // onClick={() => activeSUbMenu("renewalsCalendar")}
                   className={
                    "px-3 py-2 font-medium border-b-2 relative " +
                    (activeSub == "renewalsCalendar"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                  onMouseEnter={() => setshowRenewvals(true)}
                  onMouseLeave={() => setshowRenewvals(false)}
     
                >
                  Renewals Calendar
                  {showRenewvals && (
    <ul className="absolute left-0 top-full mt-0 text-[#0f59ac] bg-white shadow-lg border rounded w-48 z-[9999]">
      <li className="px-4 py-2 border hover:bg-blue-100 cursor-pointer" onClick={() => activeSUbMenu("aboutToExpire")}>About to expire</li>
      <li className="px-4 py-2 border hover:bg-blue-100 cursor-pointer" onClick={() => activeSUbMenu("expired")}>Expired</li>
      <li className="px-4 py-2 border hover:bg-blue-100 cursor-pointer" onClick={() => activeSUbMenu("manual")}>Manual</li>
      <li className="px-4 py-2 border hover:bg-blue-100 cursor-pointer" onClick={() => activeSUbMenu("error")}>Error</li>
      <li className="px-4 py-2 border hover:bg-blue-100 cursor-pointer" onClick={() => activeSUbMenu("renewalAll")}>All</li>
    </ul>
  )}
                </button> */}
              </>
            )}

            {activeMenu == "strategy" && (
              <>
                <button
                  // onClick={() => activeSUbMenu("segmentationAccounts")}
                  className={
                    "px-3 py-2 font-medium border-b-2 relative " +
                    (activeSub == "segmentationAccounts" ||
                    activeSub == "segmentationGroups"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                  onMouseEnter={() => setShowSegmentation(true)}
                  onMouseLeave={() => setShowSegmentation(false)}
                >
                  Segmentation
                  {showSegmentation && (
                    <ul className="absolute left-0 top-full mt-0 text-[#0f59ac] bg-white shadow-lg border rounded w-48 z-[9999]">
                      <li
                        className="px-4 py-2 border hover:bg-blue-100 cursor-pointer"
                        onClick={() => activeSUbMenu("segmentationAccounts")}
                      >
                        Accounts
                      </li>
                      <li
                        className="px-4 py-2 border hover:bg-blue-100 cursor-pointer"
                        onClick={() => activeSUbMenu("segmentationGroups")}
                      >
                        Groups
                      </li>
                    </ul>
                  )}
                </button>
                <button
                  onClick={() => activeSUbMenu("targetsAndFloors")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "targetsAndFloors"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  Targets And Floors
                </button>
                <button
                  onClick={() => activeSUbMenu("approvalControls")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "approvalControls"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  Approval Controls
                </button>
                <button
                  onClick={() => activeSUbMenu("competitors")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "competitors"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  Competitors
                </button>
                <button
                  onClick={() => activeSUbMenu("promotions")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "promotions"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  Promotions
                </button>
              </>
            )}
            {activeMenu == "email" && (
              <>
                <button
                  onClick={() => activeSUbMenu("allMails")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "allMails"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  All
                </button>
                <button
                  onClick={() => activeSUbMenu("unread")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "unread"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  Unread
                </button>
                <button
                  onClick={() => activeSUbMenu("archived ")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "archived "
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  Archived
                </button>
              </>
            )}
            {activeMenu == "admin" && (
              <>
                <button
                  onClick={() => activeSUbMenu("user")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "user"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  User
                </button>
                <button
                  onClick={() => activeSUbMenu("transilation")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "transilation"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  Transilation
                </button>
                <button
                  onClick={() => activeSUbMenu("contrySettings")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "contrySettings"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  Contry Settings
                </button>
                <button
                  onClick={() => activeSUbMenu("templates")}
                  className={
                    "px-3 py-2 font-medium border-b-2 " +
                    (activeSub == "templates"
                      ? "bg-[#0f59ac] text-white"
                      : "border-transparent hover:border-blue-900 text-gray-700")
                  }
                >
                  Templates
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile Side Drawer */}
      <div
        className={
          "fixed top-0 left-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto " +
          (drawerOpen ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="bg-blue-900 text-white px-4 py-3 flex justify-between items-center">
          <h2 className="font-bold text-lg">Menu</h2>
          <button
            className="text-xl bg-blue-900 px-2 rounded"
            onClick={() => setDrawerOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Main Menu + Submenu Hardcoded  mobile*/}
        <div>
          {/* Inbox */}
          <div>
            <button
              onClick={() =>
                setActiveMenu(activeMenu == "inbox" ? "" : "inbox")
              }
              className={
                "w-full text-left px-4 py-3 font-medium flex justify-between items-center " +
                (activeMenu == "inbox"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 text-gray-800")
              }
            >
              Inbox
              <span>{activeMenu == "inbox" ? "▲" : "▼"}</span>
            </button>
            {activeMenu == "inbox" && (
              <div className="bg-gray-50">
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "inbox"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("inbox");
                    setDrawerOpen(false);
                  }}
                >
                  Inbox
                </button>
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "drafts"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("drafts");
                    setDrawerOpen(false);
                  }}
                >
                  Drafts
                </button>
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "inprogress"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("inprogress");
                    setDrawerOpen(false);
                  }}
                >
                  In progress
                </button>
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "awaitingResults"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("awaitingResults");
                    setDrawerOpen(false);
                  }}
                >
                  Awaiting Results
                </button>
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "completed"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("completed");
                    setDrawerOpen(false);
                  }}
                >
                  Completed
                </button>
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "cancelled"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("cancelled");
                    setDrawerOpen(false);
                  }}
                >
                  Cancelled
                </button>
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "trash"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("trash");
                    setDrawerOpen(false);
                  }}
                >
                  Trash
                </button>
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "all"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("all");
                    setDrawerOpen(false);
                  }}
                >
                  All
                </button>
              </div>
            )}
          </div>

          {/* Pricing */}
          <div>
            {/* <button
              onClick={() =>
                setActiveMenu(activeMenu == "pricing" ? "" : "pricing")
              }
              className={
                "w-full text-left px-4 py-3 font-medium flex justify-between items-center " +
                (activeMenu == "pricing"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 text-gray-800")
              }
            >
              Pricing
              <span>{activeMenu == "pricing" ? "▲" : "▼"}</span>
            </button>
            {activeMenu == "pricing" && (
              <div className="bg-gray-50">
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "accounts"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("accounts");
                    setDrawerOpen(false);
                  }}
                >
                  Accounts
                </button>
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "groups"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("groups");
                    setDrawerOpen(false);
                  }}
                >
                  Groups
                </button>
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "priceLists"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("priceLists");
                    setDrawerOpen(false);
                  }}
                >
                  Price Lists
                </button>
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "erpLoadCompletedTasks"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("erpLoadCompletedTasks");
                    setDrawerOpen(false);
                  }}
                >
                  ERP Load
                </button>
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "renewalsCalendar"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("renewalsCalendar");
                    setDrawerOpen(false);
                  }}
                >
                  Renewals Calendar
                </button>
              </div>
            )} */}
            <div>
              <button
                onClick={() =>
                  setActiveMenu(activeMenu === "pricing" ? "" : "pricing")
                }
                className={
                  "w-full text-left px-4 py-3 font-medium flex justify-between items-center " +
                  (activeMenu === "pricing"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 text-gray-800")
                }
              >
                Pricing
                <span>{activeMenu === "pricing" ? "▲" : "▼"}</span>
              </button>

              {activeMenu === "pricing" && (
                <div className="bg-gray-50">
                  {/* Level 2 - Accounts */}
                  <button
                    onClick={() =>
                      setActiveSub(activeSub === "accounts" ? "" : "accounts")
                    }
                    className={
                      "block w-full text-left px-8 py-2 rounded flex justify-between " +
                      (activeSub === "accounts"
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "hover:bg-gray-100 text-gray-700")
                    }
                  >
                    Accounts
                    <span>{activeSub === "accounts" ? "▲" : "▼"}</span>
                  </button>

                  {/* ✅ Level 3 - Account & Site */}
                  {activeSub === "accounts" && (
                    <div
                      className={
                        "block w-full text-left px-8 py-2 rounded " +
                          activeSub ==
                        "account"
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "hover:bg-gray-100 text-gray-700"
                      }
                    >
                      <button
                        className={
                          "block w-full text-left px-12 py-2 rounded " +
                          (activeSubSub == "accounts"
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "hover:bg-gray-100 text-gray-700")
                        }
                        onClick={() => {
                          activeSubSubMenu("accounts");
                          setDrawerOpen(false);
                        }}
                      >
                        Accounts
                      </button>
                      <button
                        onClick={() => {
                          activeSubSubMenu("sites");
                          setDrawerOpen(false);
                        }}
                        className={
                          "block w-full text-left px-12 py-2 rounded " +
                          (activeSubSub == "sites"
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "hover:bg-gray-100 text-gray-700")
                        }
                      >
                        Site
                      </button>
                    </div>
                  )}

                  {/* Level 2 - Groups */}
                  <button
                    className={
                      "block w-full text-left px-8 py-2 rounded " +
                      (activeSub == "groups"
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "hover:bg-gray-100 text-gray-700")
                    }
                    onClick={() => {
                      activeSUbMenu("groups");
                      setDrawerOpen(false);
                    }}
                  >
                    Groups
                  </button>
                  <button
                    onClick={() =>
                      setActiveSub(
                        activeSub === "erpLoadCompletedTasks"
                          ? ""
                          : "erpLoadCompletedTasks"
                      )
                    }
                    className={
                      "block w-full text-left px-8 py-2 rounded flex justify-between " +
                      
                      (activeSub === "erpLoadCompletedTasks"
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "hover:bg-gray-100 text-gray-700")
                    }
                  >
                    ERP Load
                    <span>
                      {activeSub === "erpLoadCompletedTasks" ? "▲" : "▼"}
                    </span>
                  </button>

                  {/* ✅ Level 3 - Account & Site */}
                  {activeSub === "erpLoadCompletedTasks" && (
                    <div
                      className={
                        "block w-full text-left px-8 py-2 rounded " +
                          activeSub ==
                        "erpLoadCompletedTasks"
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "hover:bg-gray-100 text-gray-700"
                      }
                    >
                      <button
                        className={
                          "block w-full text-left px-12 py-2 rounded " +
                          (activeSubSub == "erpLoadCompletedTasks"
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "hover:bg-gray-100 text-gray-700")
                        }
                        onClick={() => {
                          activeSubSubMenu("erpLoadCompletedTasks");
                          setDrawerOpen(false);
                        }}
                      >
                        Completed Tasks
                      </button>
                      <button
                        onClick={() => {
                          activeSubSubMenu("erpLoadAwaitingLoad");
                          setDrawerOpen(false);
                        }}
                        className={
                          "block w-full text-left px-12 py-2 rounded " +
                          (activeSubSub == "erpLoadAwaitingLoad"
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "hover:bg-gray-100 text-gray-700")
                        }
                      >
                        Awaiting Load
                      </button>
                      <button
                        onClick={() => {
                          activeSubSubMenu("erpLoadManuallyUpdating");
                          setDrawerOpen(false);
                        }}
                        className={
                          "block w-full text-left px-12 py-2 rounded " +
                          (activeSubSub == "erpLoadManuallyUpdating"
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "hover:bg-gray-100 text-gray-700")
                        }
                      >
                        Manually Updating
                      </button>
                      <button
                        onClick={() => {
                          activeSubSubMenu("erpLoadLettingExpire");
                          setDrawerOpen(false);
                        }}
                        className={
                          "block w-full text-left px-12 py-2 rounded " +
                          (activeSubSub == "erpLoadLettingExpire"
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "hover:bg-gray-100 text-gray-700")
                        }
                      >
                        Letting Expire
                      </button>
                      <button
                        onClick={() => {
                          activeSubSubMenu("erpLoadRecentlyLoaded");
                          setDrawerOpen(false);
                        }}
                        className={
                          "block w-full text-left px-12 py-2 rounded " +
                          (activeSubSub == "erpLoadRecentlyLoaded"
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "hover:bg-gray-100 text-gray-700")
                        }
                      >
                        Recently Loaded
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* strategy */}
          <div>
            <button
              onClick={() =>
                setActiveMenu(activeMenu == "strategy" ? "" : "strategy")
              }
              className={
                "w-full text-left px-4 py-3 font-medium flex justify-between items-center " +
                (activeMenu == "strategy"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 text-gray-800")
              }
            >
              Strategy
              <span>{activeMenu == "strategy" ? "▲" : "▼"}</span>
            </button>
            {activeMenu == "strategy" && (
              <div className="bg-gray-50">
                <button
                  className={
                     "w-full text-left px-8 py-3 font-medium flex justify-between items-center " +
                    (activeSub == "segmentationAccounts"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("segmentationAccounts");
                    setDrawerOpen(false);
                  }}
                >
                  Segmentation
                    <span>{activeSub === "segmentationAccounts" ? "▲" : "▼"}</span>
                  </button>

                  {/* ✅ Level 3 - Account & Site */}
                  {activeSub === "segmentationAccounts" && (
                    <div
                      className={
                        "block w-full text-left px-8 py-2 rounded " +
                          activeSub ==
                        "segmentationAccounts"
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "hover:bg-gray-100 text-gray-700"
                      }
                    >
                      <button
                        className={
                          "block w-full text-left px-12 py-2 rounded " +
                          (activeSubSub == "segmentationAccounts"
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "hover:bg-gray-100 text-gray-700")
                        }
                        onClick={() => {
                          activeSubSubMenu("segmentationAccounts");
                          setDrawerOpen(false);
                        }}
                      >
                        Accounts
                      </button>
                      <button
                        onClick={() => {
                          activeSubSubMenu("segmentationGroups");
                          setDrawerOpen(false);
                        }}
                        className={
                          "block w-full text-left px-12 py-2 rounded " +
                          (activeSubSub == "segmentationGroups"
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "hover:bg-gray-100 text-gray-700")
                        }
                      >
                        Groups
                      </button>
                    </div>
                  )}

                {/* </button> */}
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "targetsAndFloors"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("targetsAndFloors");
                    setDrawerOpen(false);
                  }}
                >
                  Targets And Floors
                </button>
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "approvalControls"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("approvalControls");
                    setDrawerOpen(false);
                  }}
                >
                  Approval Controls
                </button>
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "competitors"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("competitors");
                    setDrawerOpen(false);
                  }}
                >
                  Competitors
                </button>
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "promotions"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("promotions");
                    setDrawerOpen(false);
                  }}
                >
                  Promotions
                </button>
              </div>
            )}
          </div>
          {/* email */}
          <div>
            <button
              onClick={() =>
                setActiveMenu(activeMenu == "email" ? "" : "email")
              }
              className={
                "w-full text-left px-4 py-3 font-medium flex justify-between items-center " +
                (activeMenu == "email"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 text-gray-800")
              }
            >
              Email
              <span>{activeMenu == "email" ? "▲" : "▼"}</span>
            </button>
            {activeMenu == "admin" && (
              <div className="bg-gray-50">
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "allMails"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("allMails");
                    setDrawerOpen(false);
                  }}
                >
                  All
                </button>
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "unread"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("unread");
                    setDrawerOpen(false);
                  }}
                >
                  Unread
                </button>
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "archived "
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("archived ");
                    setDrawerOpen(false);
                  }}
                >
                  Archived
                </button>
              </div>
            )}
          </div>
          {/* admin */}
          <div>
            <button
              onClick={() =>
                setActiveMenu(activeMenu == "admin" ? "" : "admin")
              }
              className={
                "w-full text-left px-4 py-3 font-medium flex justify-between items-center " +
                (activeMenu == "admin"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 text-gray-800")
              }
            >
              Admin
              <span>{activeMenu == "admin" ? "▲" : "▼"}</span>
            </button>
            {activeMenu == "admin" && (
              <div className="bg-gray-50">
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "user"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("user");
                    setDrawerOpen(false);
                  }}
                >
                  User
                </button>
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "transilation"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("transilation");
                    setDrawerOpen(false);
                  }}
                >
                  Transilation
                </button>
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "contrySettings"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("contrySettings");
                    setDrawerOpen(false);
                  }}
                >
                  Contry Settings
                </button>
                <button
                  className={
                    "block w-full text-left px-8 py-2 rounded " +
                    (activeSub == "templates"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                  onClick={() => {
                    activeSUbMenu("templates");
                    setDrawerOpen(false);
                  }}
                >
                  Templates
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div>
        {children}
        {/* <main className=" mx-auto px-4 py-8 flex-1">
        <h2 className="text-2xl font-bold mb-4">{activeSub}</h2>
        <p>
          You are viewing the <b>{activeSub}</b> section under{" "}
          <b>{activeMenu || "Inbox"}</b>.
        </p>
      </main> */}
      </div>
    </div>
  );
}
