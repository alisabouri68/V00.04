import Header from "BOX/BOX_header";
import { Outlet } from "react-router-dom";

function index() {
    const isAuthenticated = true;
    if (!isAuthenticated) return (<div></div>)
    return (
 <>
        <div className="flex flex-col w-full h-screen bg-gray-200 dark:bg-stone-800">
            <div className="w-full h-20 py-1">
                <Header />
            </div>
            <div className="flex w-full h-full ">
                <Outlet />
            </div>
        </div>
        <div id="modal_root"></div>
 </>
    );
}

export default index
