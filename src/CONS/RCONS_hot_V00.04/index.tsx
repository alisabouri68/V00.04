import BOX_actiomMenue from "BOXS/BOX_actionMenue";
import BOX_jini from "BOXS/BOX_Jinni";
import { Helmet } from "react-helmet-async";
import SheetServicePicker from "../../BNDL/WRAP_ActionMenuHot/SheetActionMenuHome"
import BOXAction from "../../BOXS/BOX_action"
import BOX_actiomContent from "../../BOXS/BOX_actionContent"
import { Outlet } from "react-router-dom";
function index() {
  return (
    <>
      <Helmet>
        <title>HOT</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="w-9/12 h-full bg-white dark:bg-gray-800 overflow-hidden border-b border-gray-200 dark:border-gray-700">
        <BOXAction>

          <BOX_jini />
          <BOX_actiomMenue>
            <SheetServicePicker />
          </BOX_actiomMenue>
          <BOX_actiomContent>
            <Outlet />

          </BOX_actiomContent>

        </BOXAction>
      </div>
      <div className="w-3/12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm rounded-md"></div>
    </>
  );
}

export default index;
