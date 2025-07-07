import { useState, KeyboardEvent } from "react";
import { LuListFilter } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineWindow } from "react-icons/md";
import { TbListCheck } from "react-icons/tb";
import ButtonIcon from "../RCMP_iconButton";
import { dataNav } from "../../db"
interface HeaderProps {
  onSearch?: (query: string) => void;
  onFilterClick?: () => void;
  onCloseClick?: () => void;
  onViewChange?: (view: "grid" | "list") => void;
  title?: string;
  className?: string;
}

const Header = ({
  onSearch,
  onFilterClick,
  onCloseClick,
  onViewChange,
  title = "Console Basket",
  className = "",
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(searchQuery);
    }
  };

  const handleViewChange = (view: "grid" | "list") => {
    setActiveView(view);
    onViewChange?.(view);
  };
  const basketItem = [
    { id: "1", title: "Quick Access", item: dataNav, },
    { id: "2", title: "Community", item: dataNav, },
    { id: "3", title: "Mono Services", item: dataNav, },
    { id: "4", title: "Generals", item: dataNav, },
  ]
  return (
    <div className="flex flex-col w-full custom-scrollbar overflow-y-auto"
         role="menubar"
          aria-orientation="horizontal"
          >
      <header className={`sticky top-0 z-10 bg-white shadow-sm  ${className}`}>
        <div className="flex flex-col gap-6 sm:flex-row items-center justify-between p-3 border-b-2 border-gray-200">
          <div className="mb-3 sm:mb-0 sm:mr-4">
            <h6 className="text-xl font-bold text-gray-800">{title}</h6>
          </div>

          <div className="flex items-center w-full sm:w-auto">
            <ButtonIcon
              variant="ghost"
              aria-label="Filter options"
              className="border-2 border-gray-300 mr-2 hover:bg-gray-100 transition-colors"
              onClick={onFilterClick}
              leftIcon={<LuListFilter className="w-5 h-5" />}
            />

            <form
              onSubmit={handleSearch}
              className="relative flex-grow sm:flex-grow-0 md:w-28 mr-2"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md  h focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Search"
                aria-label="Search"
              />
            </form>

            <div className="flex">
              <ButtonIcon
                variant={activeView === "grid" ? "primary" : "ghost"}
                aria-label="Grid view"
                // className="mr-1 hover:bg-gray-100 transition-colors"
                onClick={() => handleViewChange("grid")}
                leftIcon={
                  <MdOutlineWindow
                    className={`text-2xl  ${activeView === "grid" ? "text-primary" : "text-gray-600"}`}
                  />
                }
              >Icon</ButtonIcon>

              <ButtonIcon
                variant={activeView === "list" ? "primary" : "ghost"}
                aria-label="List view"
                // className="mr-1 hover:bg-gray-100 transition-colors"
                onClick={() => handleViewChange("list")}
                leftIcon={
                  <TbListCheck
                    className={`text-2xl ${activeView === "list" ? "text-primary" : "text-gray-600"}`}
                  />
                }
              >List</ButtonIcon>

              <ButtonIcon
                variant="ghost"
                aria-label="Close"
                onClick={onCloseClick}
                leftIcon={<IoCloseSharp className="text-2xl" />}
              />
            </div>
          </div>
        </div >
      </header >
      <section className="flex flex-col items-center justify-around w-full">
        {basketItem && basketItem.map((item) => {
          return (
            <div key={item.id} className="flex flex-col items-center w-full min-h-[60px] py-3">
              <div className="flex items-center  w-full">
                <span className="px-5">{item.title}</span>
                {item.id !== "1" ? (<span className="flex flex-grow items-center bg-gray-300 h-0.5"></span>) : null}
              </div>
              <div className="w-full flex items-center justify-start pt-5">
                {item.item.length && item.item.map((item) => {
                  return (
                    <ButtonIcon variant="ghost" className="flex-col" key={item.id} leftIcon={item.icon}>
                      {item.title}
                    </ButtonIcon>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>
    </div>
  );
};

export default Header;