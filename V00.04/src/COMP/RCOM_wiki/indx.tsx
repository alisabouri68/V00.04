import { faBriefcaseClock, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet } from "react-router-dom";

const indx = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex p-5 gap-3">
        <Link
          to="wikiEditor/referenceMenu"
          className="group flex items-center justify-between gap-2 p-1 px-3 border border-gray-200 rounded-lg
                  hover:bg-gradient-to-r hover:bg-primary
                  hover:text-white hover:shadow-lg hover:border-transparent
                  transition-all duration-300 transform hover:-translate-y-1
                  focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
        >
          <span className="text-gray-500 group-hover:text-white transition-colors">
            <FontAwesomeIcon icon={faPen} className="text-lg" />
          </span>
          <span className="text-sm text-gray-600 group-hover:text-white font-medium transition-colors">
            Wiki Editor{" "}
          </span>
        </Link>
        <Link
          to="wikiManager/homeManager"
          className="group flex items-center justify-between gap-2 p-1 px-3 border border-gray-200 rounded-lg
                  hover:bg-gradient-to-r hover:bg-primary
                  hover:text-white hover:shadow-lg hover:border-transparent
                  transition-all duration-300 transform hover:-translate-y-1
                  focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
        >
          <span className="text-gray-500 group-hover:text-white transition-colors">
            <FontAwesomeIcon icon={faBriefcaseClock} className="text-lg" />
          </span>
          <span className="text-sm text-gray-600 group-hover:text-white font-medium transition-colors">
            WIKI Manager
          </span>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default indx;
