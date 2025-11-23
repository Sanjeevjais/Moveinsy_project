import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Navbar() {
  const navigate = useNavigate();
 const token = useAuthStore((state) => state.token);
const role = useAuthStore((state) => state.role);
const logout = useAuthStore((state) => state.logout);

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAdmin = role === "ADMIN";
  const isLoggedIn = Boolean(token);

  const linkBase =
    "px-3 py-2 rounded-md text-sm font-medium transition hover:bg-slate-200";
  const activeClass =
    "bg-slate-900 text-white hover:bg-slate-800";

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          {/* Left side: logo / brand */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                MIS
              </div>
              <span className="hidden sm:inline text-sm font-semibold text-slate-800">
                MoveInSync – Driver Sentiment
              </span>
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-3">
            {/* Common links */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeClass : "text-slate-700"}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/feedback"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeClass : "text-slate-700"}`
              }
            >
              Feedback
            </NavLink>

            {isLoggedIn && (
              <NavLink
                to="/my-rides"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeClass : "text-slate-700"}`
                }
              >
                My Rides
              </NavLink>
            )}

            {/* Admin only link */}
            {isLoggedIn && isAdmin && (
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `${linkBase} ${
                    isActive
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-blue-600 hover:bg-blue-50"
                  }`
                }
              >
                Admin Dashboard
              </NavLink>
            )}

            {/* Auth buttons */}
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${linkBase} ${
                      isActive
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-blue-600 hover:bg-blue-50"
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `${linkBase} ${
                      isActive
                        ? "bg-slate-900 text-white hover:bg-slate-800"
                        : "text-slate-700 hover:bg-slate-200"
                    }`
                  }
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                // X icon
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth="1.8"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger icon
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth="1.8"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block ${linkBase} ${
                  isActive ? activeClass : "text-slate-700"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/feedback"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block ${linkBase} ${
                  isActive ? activeClass : "text-slate-700"
                }`
              }
            >
              Feedback
            </NavLink>

            {isLoggedIn && (
              <NavLink
                to="/my-rides"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block ${linkBase} ${
                    isActive ? activeClass : "text-slate-700"
                  }`
                }
              >
                My Rides
              </NavLink>
            )}

            {isLoggedIn && isAdmin && (
              <NavLink
                to="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block ${linkBase} ${
                    isActive
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-blue-600 hover:bg-blue-50"
                  }`
                }
              >
                Admin Dashboard
              </NavLink>
            )}

            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block ${linkBase} ${
                      isActive
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-blue-600 hover:bg-blue-50"
                    }`
                  }
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block ${linkBase} ${
                      isActive
                        ? "bg-slate-900 text-white hover:bg-slate-800"
                        : "text-slate-700 hover:bg-slate-200"
                    }`
                  }
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
