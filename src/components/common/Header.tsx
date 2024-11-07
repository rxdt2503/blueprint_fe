import { FaBell } from "react-icons/fa";
// import avatar from "../";
import Avatar from "@mui/material/Avatar";
const avatar = require("../../assets/avatar.png");

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 mb-5 shadow-md">
      {/* Search Bar */}
      {/* <div className="flex flex-grow justify-start">
        <div className="relative">
          <input
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Dashboards..."
          />
          <button
            className="absolute top-1 right-1 flex items-center rounded bg-accentColor py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
            Search
          </button>
        </div>
      </div> */}
      <div></div>

      {/* Profile Section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          {/* <Image
            src={avatar}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          /> */}

          <Avatar alt="Remy Sharp" src={avatar} />

          <span className="ml-2 font-semibold">Max</span>
        </div>
        <button className="relative">
          <FaBell className="text-gray-700" size={24} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>{" "}
        </button>
      </div>
    </header>
  );
};

export default Header;
