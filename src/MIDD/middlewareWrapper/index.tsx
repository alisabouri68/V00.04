import { Outlet } from "react-router-dom";

function index() {
    const isAuthenticated = true;
    if (!isAuthenticated) return (<div></div>)
    return (
        <>
           <div className="flex flex-col w-full h-full overflow-hidden bg-gray-300 dark:bg-gray-900">
                <Outlet />
            </div>
            <div id="modal_root"></div>
        </>
    );
}

export default index
