import { useState, KeyboardEvent } from "react";
import { LuListFilter } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineWindow } from "react-icons/md";
import { TbListCheck } from "react-icons/tb";
import ButtonIcon from "../RCMP_iconButton";
import { basketItem } from "db";
import { HeaderProps } from "TYPE";
import BasketItems from "COMP/RCMP_basket-body-item";
const Header = ({
  onSearch,
  onFilterClick,
  onCloseClick,
  onViewChange,
  title = "Console Basket",
  className = "",
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState<"grid" | "list">("list");
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
  return (
    <div className="flex flex-col w-full h-full custom-scrollbar overflow-y-auto"
    >
      <header className={`sticky top-0 z-10  custom-card ${className}`}>
        <div className="flex flex-col gap-6 sm:flex-row items-center justify-between p-3 border-b-2 border-gray-200">
          <div className="mb-3 sm:mb-0 sm:mr-4">
            <h6 className="text-xl font-bold ">{title}</h6>
          </div>
          <div className="flex items-center w-full sm:w-auto">
            <ButtonIcon
              variant="ghost"
              aria-label="Filter options"
              className="border-2 border-gray-300 mr-2"
              onClick={onFilterClick}
              leftIcon={<LuListFilter className="text-lg" />}
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
                className="w-full px-4 py-1 placeholder:text-sm placeholder:font-bold focus:border-gray-300 focus:ring-0 focus:border-2 border-2 border-gray-300 rounded-md transition-all"
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
                    className={`text-2xl  ${activeView === "grid" ? "text-primary" : ""}`}
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
                    className={`text-2xl ${activeView === "list" ? "text-primary" : ""}`}
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
      <section className="flex flex-col items-center justify-around w-full ">
        {basketItem && basketItem.map((item) => (
          <BasketItems item={item} activeView={activeView} />
        ))}
      </section>
    </div>
  );
};
export default Header;