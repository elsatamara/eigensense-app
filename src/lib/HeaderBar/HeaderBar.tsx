import { AppBar, Box, Button, Menu, MenuItem, Toolbar } from "@mui/material";
import React from "react";
import { AlertInterface } from "../../interfaces/AlertInterface";
import { storeRecentlyViewedItems } from "../../redux/actions/AgentActions";
import { useAppDispatch } from "../../redux/hooks";
import Logo from "./logo.png";
import styles from "./HeaderBar.module.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CircleIcon from "@mui/icons-material/Circle";
import { useNavigate } from "react-router-dom";

const UserProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [endArrow, setEndArrow] = React.useState(<ArrowDropDownIcon />);
  const handleDropdownClose = () => {
    setAnchorEl(null);
    setEndArrow(<ArrowDropDownIcon />);
  };
  const handleDropdownOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEndArrow(<ArrowDropUpIcon />);
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  return (
    <>
      <Button
        sx={{ color: "white", textTransform: "none" }}
        endIcon={endArrow}
        startIcon={<CircleIcon />}
        onClick={handleDropdownOpen}
      >
        John Doe
      </Button>
      <Menu
        id="user-profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleDropdownClose}
      >
        <MenuItem>Your Profile</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </>
  );
};

const NotificationList = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | SVGSVGElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  return (
    <>
      <NotificationsNoneIcon
        sx={{ mr: 2 }}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
      />
      <Menu
        id="user-profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem sx={{ width: "400px" }}>
          <div className={styles.notificationList}>
            <div className={styles.notificationHeader}>
              October 13, 2021 05:23AM EST
            </div>
            <div className={styles.notificationText}>
              Apple oranges boba matcha latte. This notification is to notify
              the hungriness that persists most of the time.
            </div>
            <div className={styles.notificationLocationId}>
              <div className={styles.notificationLocationIdText}>
                San Francisco, CA
              </div>
              <div className={styles.notificationLocationIdText}>10012554</div>
            </div>
          </div>
        </MenuItem>
        <MenuItem sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => {
              navigate(`/notification`);
            }}
          >
            All Alert Notifications
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

const HeaderBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function logout() {
    if (localStorage.getItem("recentlyViewed")) {
      let recentlyViewedItems: AlertInterface[] = JSON.parse(
        localStorage.getItem("recentlyViewed")!
      );
      const patternId = recentlyViewedItems
        .map((item) => item.patternId)
        .join("");
      dispatch(storeRecentlyViewedItems(patternId));
    }
  }
  return (
    <AppBar
      position="fixed"
      sx={{ top: 0, bottom: "auto", bgcolor: "#202c34", height: "70px" }}
      elevation={0}
    >
      <Toolbar>
        <div className={styles.parentHeaderContainer}>
          <Box
            component="img"
            sx={{
              height: 33,
              width: 150,
              ml: 6,
              mt: 0.5,
            }}
            alt="Your logo."
            src={Logo}
            onClick={() => {
              navigate(`/dashboard`);
            }}
          />
          <div className={styles.rightItemsContainer}>
            <EventNoteIcon sx={{ mr: 2 }} />
            <NotificationList />
            <UserProfileMenu />
          </div>
        </div>
      </Toolbar>
    </AppBar>
    // <Disclosure as="nav" className="bg-gray-800">
    //   {({ open }) => (
    //     <>
    //       <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    //         <div className="relative flex items-center justify-between h-16">
    //           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
    //             {/* Mobile menu button*/}
    //             <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
    //               <span className="sr-only">Open main menu</span>
    //               {open ? (
    //                 <XIcon className="block h-6 w-6" aria-hidden="true" />
    //               ) : (
    //                 <MenuIcon className="block h-6 w-6" aria-hidden="true" />
    //               )}
    //             </Disclosure.Button>
    //           </div>
    //           <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
    //             <div className="flex-shrink-0 flex items-center">
    //               <img
    //                 className="block lg:hidden h-8 w-auto"
    //                 src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
    //                 alt="Workflow"
    //               />
    //               <img
    //                 className="hidden lg:block h-8 w-auto"
    //                 src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
    //                 alt="Workflow"
    //               />
    //             </div>
    //           </div>
    //           <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
    //             <button
    //               type="button"
    //               className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
    //             >
    //               <span className="sr-only">View notifications</span>
    //               <BellIcon className="h-6 w-6" aria-hidden="true" />
    //             </button>

    //             {/* Profile dropdown */}
    //             <Menu as="div" className="ml-3 relative">
    //               <div>
    //                 <Menu.Button className="#202c34 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
    //                   <span className="sr-only">Open user menu</span>
    //                   <img
    //                     className="h-8 w-8 rounded-full"
    //                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    //                     alt=""
    //                   />
    //                 </Menu.Button>
    //               </div>
    //               <Transition
    //                 as={Fragment}
    //                 enter="transition ease-out duration-100"
    //                 enterFrom="transform opacity-0 scale-95"
    //                 enterTo="transform opacity-100 scale-100"
    //                 leave="transition ease-in duration-75"
    //                 leaveFrom="transform opacity-100 scale-100"
    //                 leaveTo="transform opacity-0 scale-95"
    //               >
    //                 <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
    //                   <Menu.Item>
    //                     {({ active }) => (
    //                       <a
    //                         href="#"
    //                         className={classNames(
    //                           active ? "bg-gray-100" : "",
    //                           "block px-4 py-2 text-sm text-gray-700"
    //                         )}
    //                       >
    //                         Your Profile
    //                       </a>
    //                     )}
    //                   </Menu.Item>
    //                   <Menu.Item>
    //                     {({ active }) => (
    //                       <a
    //                         href="#"
    //                         className={classNames(
    //                           active ? "bg-gray-100" : "",
    //                           "block px-4 py-2 text-sm text-gray-700"
    //                         )}
    //                       >
    //                         Settings
    //                       </a>
    //                     )}
    //                   </Menu.Item>
    //                   <Menu.Item>
    //                     {({ active }) => (
    //                       <a
    //                         onClick={logout}
    //                         className={classNames(
    //                           active ? "bg-gray-100" : "",
    //                           "block px-4 py-2 text-sm text-gray-700"
    //                         )}
    //                       >
    //                         Sign out
    //                       </a>
    //                     )}
    //                   </Menu.Item>
    //                 </Menu.Items>
    //               </Transition>
    //             </Menu>
    //           </div>
    //         </div>
    //       </div>
    //     </>
    //   )}
    // </Disclosure>
  );
};

export default HeaderBar;
