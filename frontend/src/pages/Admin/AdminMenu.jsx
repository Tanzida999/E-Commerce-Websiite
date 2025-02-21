import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 right-2" : "top-5 right-7"
        } bg-[#151515] p-2 fixed rounded-lg`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-white my-1"></div>
            <div className="w-6 h-0.5 bg-white my-1"></div>
            <div className="w-6 h-0.5 bg-white my-1"></div>
          </>
        )}
      </button>
      {isMenuOpen && (
        <section className="bg-[#151515] p-4 fixed right-7 top-5">
          <ul className="list-none mt-2 space-y-2 w-[200px]">
            <li>
              <NavLink
                className="py-2 px-3 block rounded-md text-sm font-medium transition-all duration-300"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#2E2D2D" : "transparent",
                  color: isActive ? "greenyellow" : "#ffffff",
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className="py-2 px-3 block rounded-md text-sm font-medium transition-all duration-300"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#2E2D2D" : "transparent",
                  color: isActive ? "greenyellow" : "#ffffff",
                })}
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                className="py-2 px-3 block rounded-md text-sm font-medium transition-all duration-300"
                to="/admin/productlist"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#2E2D2D" : "transparent",
                  color: isActive ? "greenyellow" : "#ffffff",
                })}
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                className="py-2 px-3 block rounded-md text-sm font-medium transition-all duration-300"
                to="/admin/allproducts"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#2E2D2D" : "transparent",
                  color: isActive ? "greenyellow" : "#ffffff",
                })}
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className="py-2 px-3 block rounded-md text-sm font-medium transition-all duration-300"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#2E2D2D" : "transparent",
                  color: isActive ? "greenyellow" : "#ffffff",
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className="py-2 px-3 block rounded-md text-sm font-medium transition-all duration-300"
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#2E2D2D" : "transparent",
                  color: isActive ? "greenyellow" : "#ffffff",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};
export default AdminMenu;
