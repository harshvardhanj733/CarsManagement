import { NavLink, Outlet } from "react-router-dom";

const Dashboard = ({ onLogout }) => {
  return (
    <div>
      <header className="h-20 bg-gray-800 sm:max-h-20 flex items-center z-30 w-full border-b border-white">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a
            href="/"
            className="uppercase text-white font-black text-3xl transition-all duration-500 tracking-widest hover:tracking-tighter"
          >
            Car-Tunes
          </a>
          <div className="flex items-center">
            <nav className="font-sen text-white uppercase text-lg lg:flex items-center hidden">
              <NavLink
                to="all-cars"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 px-6 flex opacity-100 text-teal-400 underline"
                    : "py-2 px-6 flex opacity-70 hover:text-teal-400"
                }
              >
                All Cars
              </NavLink>
              <NavLink
                to="my-cars"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 px-6 flex opacity-100 text-teal-400 underline"
                    : "py-2 px-6 flex opacity-70 hover:text-teal-400"
                }
              >
                My Cars
              </NavLink>
              <NavLink
                to="add-cars"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 px-6 flex opacity-100 text-teal-400 underline"
                    : "py-2 px-6 flex opacity-70 hover:text-teal-400"
                }
              >
                Add Cars
              </NavLink>
            </nav>
          </div>
          <button
            onClick={onLogout}
            className="py-2 rounded-lg px-6 flex opacity-70 hover:text-gray-50 cursor-pointer bg-teal-200 hover:bg-red-500"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
