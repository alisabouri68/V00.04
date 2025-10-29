import ConsolweSheet from "./consoleSheet";
import ThemeSheet from "./themeSheet";
import LanguageSheet from "./languageSheet";
import UserProfileSheet from "./userProfileSheet";
function index() {
  return (

    <div className="flex w-full h-[75px] bg-light text-dark rounded-md">
      <ConsolweSheet />
      <div className="flex flex-1 items-center justify-evenly h-full">
        <ThemeSheet />
        <LanguageSheet />
        <UserProfileSheet />
      </div>
    </div>

  );
}

export default index;
