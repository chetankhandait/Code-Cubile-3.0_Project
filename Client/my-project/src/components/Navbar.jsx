import { useState } from "react";
import StockNotification from "./Notification";

const Navbar = () => {
  // Function to toggle the drawer by controlling the checkbox
  const toggleDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer");
    drawerCheckbox.checked = !drawerCheckbox.checked; // Toggle the checkbox state
  };


  const [notifications, setNotifications] = useState([
    { id: 1, stockName: 'AAPL', currentPrice: 150.25, previousPrice: 145.00, percentageChange: 3.62 },
    { id: 2, stockName: 'GOOGL', currentPrice: 2800.50, previousPrice: 2810.00, percentageChange: -0.34 },
  ]);

  const removeNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };



  return (
    <>
      {/* Navbar */}
      <header className="w-full fixed px-8 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-purple-500">CapitalCoach</h1>
        </div>
        <nav className="flex items-center space-x-4">
          <a href="#" className="text-gray-800 hover:underline">
            Docs
          </a>
          <a href="#" className="text-gray-800 hover:underline">
            Components
          </a>
          <a href="#" className="text-gray-800 hover:underline">
            Blog
          </a>
          <a href="#" className="text-gray-800 hover:underline">
            Showcase
          </a>
          {/* Notification Icon that opens the drawer */}
          <div className="relative h-8 w-8" onClick={toggleDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-800 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V4a2 2 0 10-4 0v1.083A6 6 0 004 11v3.159c0 .538-.214 1.054-.595 1.437L2 17h5m5 0v2a2 2 0 11-4 0v-2m4 0H9"
              />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
              3
            </span>
          </div>
        </nav>
      </header>

      {/* Drawer */}
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-base-200 text-base-content min-h-full w-96 p-4">
            <div className="">
                <h1 className="text-xl font-bold mb-2 mx-1">Notifications:</h1>
      {notifications.map((notification) => (
        <StockNotification
          key={notification.id}
          stockName={notification.stockName}
          currentPrice={notification.currentPrice}
          previousPrice={notification.previousPrice}
          percentageChange={notification.percentageChange}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
