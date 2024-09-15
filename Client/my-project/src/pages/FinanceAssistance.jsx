import React from "react";
import { FaHome, FaChartLine, FaDollarSign, FaUser } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import NewsCarousel from "../components/NewsCrousel";
const FinanceAssistance = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 h-full bg-white p-6 flex flex-col shadow-lg">
        {/* Navigation Links */}
        <div className="my-2">
          
        <NewsCarousel />
        </div>
        <nav className="mb-4 space-y-8">
          <ul className="flex flex-col gap-4">
            {/* Dashboard */}
            <li>
              <a
                href="#"
                className="flex items-center p-4 bg-white text-gray-800 rounded-lg shadow hover:bg-gray-100 hover:shadow-lg transition-all"
              >
                <FaHome className="w-6 h-6 mr-3 text-black" />
                <span className="text-md  font-semibold text-black">
                  Dashboard
                </span>
              </a>
            </li>
            {/* Investments */}
            <li>
              <a
                href="#"
                className="flex items-center p-4 bg-white text-gray-800 rounded-lg shadow hover:bg-gray-100 hover:shadow-lg transition-all"
              >
                <FaChartLine className="w-6 h-6 mr-3 text-black" />
                <span className="text-md font-semibold text-black">
                  Investments
                </span>
              </a>
            </li>
            {/* Transactions */}
            <li>
              <a
                href="#"
                className="flex items-center p-4 bg-white text-gray-800 rounded-lg shadow hover:bg-gray-100 hover:shadow-lg transition-all"
              >
                <FaDollarSign className="w-6 h-6 mr-3 text-black" />
                <span className="text-md font-semibold text-black">
                  Transactions
                </span>
              </a>
            </li>
            {/* Profile */}
            <li>
              <a
                href="#"
                className="flex items-center p-4 bg-white text-gray-800 rounded-lg shadow hover:bg-gray-100 hover:shadow-lg transition-all"
              >
                <FaUser className="w-6 h-6 mr-3 text-black" />
                <span className="text-md font-semibold text-black">
                  Profile
                </span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Notifications Section */}
      
      </div>

      {/* Dashboard */}
      <div className="lg:w-3/4 p-6 flex flex-col justify-between">
        <div>
          {" "}
          <h1 className="text-2xl font-bold mb-6">
            Personal Finance Dashboard
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-sm font-semibold text-gray-500">
                Total Balance
              </h3>
              <p className="text-3xl font-bold text-gray-800">$12,345.67</p>
              <p className="text-green-500 text-sm">+2.5% from last month</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-sm font-semibold text-gray-500">
                Investments
              </h3>
              <p className="text-3xl font-bold text-gray-800">$8,765.43</p>
              <p className="text-green-500 text-sm">+5.2% overall return</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-sm font-semibold text-gray-500">
                Monthly Spending
              </h3>
              <p className="text-3xl font-bold text-gray-800">$2,345.67</p>
              <p className="text-red-500 text-sm">-12% from last month</p>
            </div>
          </div>
        </div>
        {/* Stats Section */}
        <div>
          {/* Finance Assistant Section */}
          <div className="bg-white mt-6 p-6 rounded-lg shadow-md sticky">
            <h3 className="text-xl font-bold mb-4">
              Ask Your Finance Assistant
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Get answers to your financial questions
            </p>

            <div className="flex">
              <input
                type="text"
                className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none"
                placeholder="Ask a question..."
              />
              <button className="bg-black text-white p-3 px-10 rounded-r-lg">
                Ask
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceAssistance;
