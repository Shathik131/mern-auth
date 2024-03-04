import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-200">
      <div
        className="flex justify-between items-center 
        max-w-6xl mx-auto p-2"
      >
        <Link to="/" className="no-underline">
          <h4 className="font-bold">Auth App</h4>
        </Link>

        <ul className="flex gap-3">
          <Link to="/home" className="no-underline ">
            <li>Home</li>
          </Link>

          <Link to="/about" className="no-underline">
            <li>About</li>
          </Link>

          <Link to="/sign-in" className="no-underline">
            <li>Sign In</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
