import Button from 'COMP/RCMP_button_V00.04';
import { FaHome, FaSearch, FaExclamationTriangle, FaArrowRight } from 'react-icons/fa';

const NotFoundPage = () => {
    return (
        <div className="w-full h-full bg-light flex items-center justify-center p-10 font-sans rounded-lg overflow-hidden">
            <div className="max-w-2xl w-full text-center">

                <div className="relative mb-8">
                    <div className="floating">
                        <svg
                            className="w-64 h-64 mx-auto text-primary"
                            viewBox="0 0 200 200"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="currentColor"
                                d="M44.9,-58.3C58.8,-50.9,71.1,-39.8,76.8,-25.5C82.5,-11.2,81.6,6.3,76.7,22.7C71.8,39.1,62.9,54.4,49.3,62.7C35.7,71,17.3,72.3,1.3,70.4C-14.7,68.5,-29.4,63.4,-41.9,54.6C-54.4,45.8,-64.7,33.3,-69.1,18.9C-73.5,4.5,-72,-11.8,-66.1,-26.8C-60.2,-41.8,-49.9,-55.5,-36.8,-63.3C-23.7,-71.1,-7.9,-73.1,5.2,-80.2C18.3,-87.3,31,-99.6,44.9,-58.3Z"
                                transform="translate(100 100)"
                            />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <FaExclamationTriangle className="text-6xl text-blue-300 mx-auto" />
                        </div>
                    </div>
                </div>

                {/* پیام خطا */}
                <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-dark">The requested page was not found</h2>
                <p className="text-dark mb-8 text-lg max-w-md mx-auto leading-relaxed">
                    Unfortunately, the page you are looking for does not exist, has been deleted, or its address has changed
                </p>

                {/* دکمه‌های عمل */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Button
                        onClick={() => window.location.href = '/'}
                        buttunTitle="Return to the home page"
                        variant='filled'
                        leftIcon={<FaHome className="text-xl" />}
                        rightIcon={<FaArrowRight className="text-xl" />}
                        className="pulse-btn px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 text-lg font-medium"
                    />





                    <button
                        onClick={() => {/* عملکرد جستجو */ }}
                        className="px-6 py-3 bg-white text-primary border border-primary rounded-lg shadow-sm hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 text-lg font-medium"
                    >
                        <FaSearch className="text-xl" />
                        Search the site
                    </button>
                </div>




            </div>
        </div>
    );
};

export default NotFoundPage;