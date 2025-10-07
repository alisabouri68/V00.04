import ConsolweSheet from "./consoleSheet";
import ThemeSheet from "./themeSheet";
import LanguageSheet from "./languageSheet";
import UserProfileSheet from "./userProfileSheet";
function index() {
  return (
    <div className="w-full h-full flex ">
      <div className="flex w-full h-full px-3">
        <ConsolweSheet />
        <div className="flex flex-1 items-center justify-evenly h-full">
          <ThemeSheet />
          <LanguageSheet />
          <UserProfileSheet />
        </div>
      </div>
    </div>
  );
}

export default index;
