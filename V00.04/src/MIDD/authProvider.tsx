/******************************************
 * Component:      AuthProvider
 * Last Update:    2025.07.14
 * By:             APPS.00
 *
 * Description:
 * This component handles layout rendering (header, aside, screen)
 * based on the layout settings passed from the route object.
 ******************************************/

/*------------------------------------------------------------
 * Meta Data
 *
 * ID:             MIDD_template
 * Title:          Component Template - React Version
 * Version:        V00.04
 * VAR:            (Layout-driven route rendering)
 *
 * Last Update:    D2025.07.12
 * Owner:          APPS.00
 * Description:    Conditional layout renderer for protected routes.
 *------------------------------------------------------------*/

/**************************************
 * Step 01 - Import dependencies
 * ------------------------------------
 * - Navigation: Sidebar component
 * - Header: Top header component
 * - RoutsType: Type definition for route config
 **************************************/
import Navigation from "../BOX/BOX_nav";
import Header from "../BOX/BOX_headerr";
import { type RoutsType } from "../TYPE/index";

/**************************************
 * Step 05 - Define property interface
 * ------------------------------------
 * Props:
 * - route: Route config object containing layout info & element
 **************************************/
interface Props {
  route: RoutsType;
}

/**************************************
 * Step 06 - Define AuthProvider component
 * ------------------------------------
 * Description:
 * - Determines visibility of Header, Aside, and main Screen
 * - Renders corresponding sections conditionally based on route layout config
 **************************************/
const AuthProvider = ({ route }: Props) => {
  // Destructure layout and page element from the route
  const { layout, element } = route;

  // Determine which parts of the layout should be visible
  const showHeader = layout?.header !== false;
  const showAside = layout?.aside !== false;
  const showscreen = layout?.screen !== false;

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen w-full bg-zinc-200 dark:bg-zinc-950">
      {/* Optional Header section */}
      {showHeader && <Header />}

      {/* Main content area with optional sidebar and screen */}
      <main className="relative overflow-hidden">
        <div className="2xl:container mx-auto flex w-full h-full">
          {/* Optional Sidebar (Navigation) */}
          {showAside && (
            <div className="py-1 h-full">
              <Navigation />
            </div>
          )}

          {/* Main Screen content */}
          {showscreen && (
            <section className="flex-1 h-full overflow-y-auto">
              {element}
            </section>
          )}
        </div>
      </main>

      {/* Portal root for modals or overlays */}
      <div id="modal_root"></div>
    </div>
  );
};

export default AuthProvider;
