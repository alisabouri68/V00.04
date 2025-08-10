import ConsoleSwitcherSheet from "../BNDL/WRAP_header/index_consoleSwitche"
import ThemeSheet from "../BNDL/WRAP_header/index_themMode"
import UserProfile from "../BNDL/WRAP_header/index_userProfile"
const Header = ({ console }: { console?: string }) => {
  return (
    <>
      <header className="w-full h-14 px-5 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-300">
        <div className="2xl:container mx-auto flex w-full h-full px-1 ">
          <div className="w-h-f justify-between">
            {/* start header */}
            <div>
              <ConsoleSwitcherSheet console={console} />
            </div>
            {/* end header */}
            <div className="flex items-center w-max justify-end">
              <ThemeSheet />
              <UserProfile />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
