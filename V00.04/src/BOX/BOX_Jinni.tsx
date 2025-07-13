import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "../COMP/RCMP_swiper/swiper";
import { faAngleLeft, faAngleRight, faFile } from "@fortawesome/free-solid-svg-icons";

function Index() {
  return (
    <div className="rounded-xl shadow-lg overflow-hidden w-full flex flex-col my-custom-card">
      {/* Slider section */}
      <div className="flex items-center justify-center rounded-t-xl overflow-hidden h-48 relative ">
        <Slider />
      </div>

      {/* Buttons grid */}
      <div className="flex items-center justify-around  w-full p-4">
        <button>
          <span>
            <FontAwesomeIcon icon={faAngleLeft} className="text-lg" />
          </span>
        </button>
        {Array(8)
          .fill(null)
          .map((_, i) => (
            <button
              key={i}
              className="group flex items-center justify-between gap-2 p-1 px-3 border border-gray-200 rounded-lg 
                      hover:bg-gradient-to-r hover:bg-primary
                      hover:text-white hover:shadow-lg hover:border-transparent
                      transition-all duration-300 transform hover:-translate-y-1
                      focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
            >
              <span className="text-gray-500 group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faFile} className="text-lg" />
              </span>
              <span className="text-sm text-gray-600 group-hover:text-white font-medium transition-colors">
                Content {i + 1}
              </span>
            </button>
          ))}
          <FontAwesomeIcon icon={faAngleRight} className="text-lg" />
      </div>
    </div>
  );
}

export default Index;
