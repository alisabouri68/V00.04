import { memo, useEffect, useState, useCallback, JSX } from "react";
import Button from "../RCMP_button_V00.04/index";
import { IoBookOutline, IoFilterOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { CiGrid41, CiLock } from "react-icons/ci";
import { VscChecklist } from "react-icons/vsc";
import { FcMenu } from "react-icons/fc";
import { TiPinOutline } from "react-icons/ti";
import { HiOutlineHome } from "react-icons/hi2";
import {
  MdMyLocation,
  MdOutlineLocalFireDepartment,
  MdKeyboardArrowDown,
} from "react-icons/md";
import Text from "WIDG/RWID_TEXT_V0004";
import { FaLongArrowAltUp } from "react-icons/fa";
import { RiVoiceprintFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../RDUX/dynamanContext";

// ---------------- Types ----------------
export interface BasketItem {
  id: string;
  icon: string;
  href: string;
  title: string;
  para?: boolean;
  lock?: boolean;
  pin?: boolean;
}

export interface BasketData {
  "Quick Access": BasketItem[];
  Community: BasketItem[];
  "Mono Service": BasketItem[];
  General: BasketItem[];
}

// ---------------- Icon Map ----------------
export const iconMap: Record<string, JSX.Element> = {
  MdMyLocation: <MdMyLocation />,
  IoIosAdd: <IoIosAdd />,
  MdOutlineLocalFireDepartment: <MdOutlineLocalFireDepartment />,
  HiOutlineHome: <HiOutlineHome />,
  voiceprintfill: <RiVoiceprintFill />,
  bookoutline: <IoBookOutline />,
  MdKeyboardArrowDown: <MdKeyboardArrowDown />,
  FaLongArrowAltUp: <FaLongArrowAltUp />,
};

// ---------------- Constants ----------------
export const initialData: BasketData = {
  "Quick Access": Array.from({ length: 6 }, (_, idx) => ({
    id: `empty-${idx + 1}`,
    icon: "IoIosAdd",
    href: "#",
    title: "",
    para: false,
    lock: false,
    pin: false,
  })),
  Community: [
    {
      id: "Cast",
      icon: "voiceprintfill",
      href: "/cast",
      title: "CAST",
      para: true,
      lock: false,
      pin: false,
    },
    {
      id: "Gasma",
      icon: "FaLongArrowAltUp",
      href: "/gasma",
      title: "GASMA",
      para: true,
      lock: false,
      pin: false,
    },
  ],
  "Mono Service": [
    {
      id: "wikiCnter",
      icon: "bookoutline",
      href: "/mono",
      title: "WikiCnter",
      para: true,
      lock: false,
      pin: false,
    },
  ],
  General: [
    {
      id: "homeServiceGeneral",
      icon: "HiOutlineHome",
      href: "/",
      title: "HOME",
      para: true,
      lock: false,
      pin: false,
    },
    {
      id: "hotserviceGeneral",
      icon: "MdOutlineLocalFireDepartment",
      href: "/hot",
      title: "Hot",
      para: true,
      lock: false,
      pin: false,
    },
  ],
};

const BasketItems = () => {
  const { globalState, updateGlobalState } = useGlobalState();

  const [basketData, setBasketData] = useState<BasketData>(initialData);
  const [openCategory, setOpenCategory] =
    useState<keyof BasketData>("Community");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    const filteredData: BasketData = {
      "Quick Access": [...initialData["Quick Access"]],
      Community: [...initialData.Community],
      "Mono Service": [...initialData["Mono Service"]],
      General: [...initialData.General],
    };

    // پر کردن Quick Access با آیتم‌های فعال از globalState
    const updatedQuickAccess = [...filteredData["Quick Access"]];

    Object.entries(globalState.consoleItem).forEach(([itemId, isActive]) => {
      if (isActive) {
        // پیدا کردن آیتم در بخش‌های اصلی
        let itemToAdd: BasketItem | undefined;

        for (const [category, items] of Object.entries(initialData) as [
          keyof BasketData,
          BasketItem[]
        ][]) {
          if (category === "Quick Access") continue;

          const item = items.find((i) => i.id === itemId);
          if (item) {
            itemToAdd = item;
            break;
          }
        }
        if (itemToAdd) {
          const emptyIndex = updatedQuickAccess.findIndex(
            (item) => !item.title
          );
          if (emptyIndex !== -1) {
            updatedQuickAccess[emptyIndex] = { ...itemToAdd, pin: true };
          }
        }
      }
    });

    filteredData["Quick Access"] = updatedQuickAccess;
    setBasketData(filteredData);
  }, [globalState.consoleItem]);
  console.log(basketData);
  const pinnedItems: Record<string, boolean> = {};
  (Object.values(basketData) as BasketItem[][]).flat().forEach((item) => {
    pinnedItems[item.id] = !!item.pin;
  });

  const toggleCategory = useCallback((category: keyof BasketData) => {
    if (category === "Quick Access") return;
    setOpenCategory(category);
  }, []);
  const togglePin = useCallback(
    (id: string) => {
      if (!isEdit) return;

      // بررسی آیا آیتم در Quick Access است یا نه
      const isCurrentlyPinned = basketData["Quick Access"].some(
        (item) => item.id === id && item.title !== ""
      );

      if (isCurrentlyPinned) {
        // Unpin کردن - حذف از Quick Access
        const emptyIndex = basketData["Quick Access"].findIndex(
          (i) => i.id === id
        );
        if (emptyIndex !== -1) {
          setBasketData((prev) => {
            const newQuickAccess = [...prev["Quick Access"]];
            newQuickAccess[emptyIndex] = {
              id: `empty-${Date.now()}`,
              icon: "IoIosAdd",
              href: "#",
              title: "",
              para: false,
              lock: false,
              pin: false,
            };

            return {
              ...prev,
              "Quick Access": newQuickAccess,
            };
          });

          // آپدیت globalState برای غیرفعال کردن آیتم در consoleItem
          updateGlobalState({
            consoleItem: {
              ...globalState.consoleItem,
              [id]: false,
            },
          });
        }
      } else {
        // Pin کردن - اضافه به Quick Access
        let itemToPin: BasketItem | undefined;

        // پیدا کردن آیتم در بخش‌های دیگر
        for (const [category, items] of Object.entries(basketData) as [
          keyof BasketData,
          BasketItem[]
        ][]) {
          if (category === "Quick Access") continue;

          const item = items.find((i) => i.id === id);
          if (item) {
            itemToPin = item;
            break;
          }
        }

        if (itemToPin) {
          const emptyIndex = basketData["Quick Access"].findIndex(
            (i) => !i.title
          );
          if (emptyIndex !== -1) {
            setBasketData((prev) => {
              const newQuickAccess = [...prev["Quick Access"]];
              newQuickAccess[emptyIndex] = { ...itemToPin!, pin: true };

              return {
                ...prev,
                "Quick Access": newQuickAccess,
              };
            });

            // آپدیت globalState برای فعال کردن آیتم در consoleItem
            updateGlobalState({
              consoleItem: {
                ...globalState.consoleItem,
                [id]: true,
              },
            });
          } else {
            alert("ظرفیت Quick Access پر است.");
          }
        }
      }
    },
    [isEdit, basketData, globalState.consoleItem, updateGlobalState]
  );
  return (
    <div className="flex flex-col items-center w-full rounded-lg bg-light text-dark h-full">
      <div className="w-full flex py-3 items-center justify-between border-b px-4">
        <div>
          <h6>Console Basket</h6>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => setIsEdit((s) => !s)}
            leftIcon={<IoFilterOutline className="text-2xl" />}
            size="md"
            variant="outlined"
          />
          <div className="mx-2">
            <input
              type="text"
              placeholder="Search"
              className="border dark:border-stone-300 border-stone-500 rounded-md outline-none bg-inherit"
            />
          </div>
          <Button
            leftIcon={<VscChecklist className="text-2xl" />}
            size="md"
            title="List"
            variant="textActive"
          />
          <Button
            leftIcon={<CiGrid41 className="text-2xl" />}
            size="md"
            title="Icon"
            variant="text"
          />
        </div>
        <Button
          onClick={() =>
            updateGlobalState({
              modal: {
                isOpen: false,
              },
            })
          }
          leftIcon={<IoMdClose className="text-2xl" />}
          variant="text"
        />
      </div>

      <div className="p-5 overflow-y-auto flex flex-col overflow-x-hidden w-full h-full custom-scrollbar">
        {(Object.entries(basketData) as [keyof BasketData, BasketItem[]][]).map(
          ([category, items]) => {
            const isOpen =
              category === "Quick Access" || category === openCategory;
            const computedHeight =
              category === "Quick Access"
                ? "auto"
                : isOpen
                ? `${items.length * 56}px`
                : "0";

            return (
              <div key={category} className="mb-1">
                <div
                  className="flex items-center justify-between cursor-pointer gap-1 w-full"
                  onClick={() => toggleCategory(category)}
                >
                  <Text as="h6" className="font-bold mb-2">
                    {category}
                  </Text>
                  {category !== "Quick Access" && (
                    <>
                      <div className="border border-dashed border-stone-300 dark:border-stone-900 flex flex-1"></div>
                      <Button
                        size="lg"
                        variant="text"
                        leftIcon={
                          <MdKeyboardArrowDown
                            className={`transform ${
                              openCategory === category ? "rotate-180" : ""
                            } duration-500 transition-all`}
                          />
                        }
                      />
                    </>
                  )}
                </div>

                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ height: computedHeight }}
                  aria-hidden={category !== "Quick Access" && !isOpen}
                >
                  {items.map((item) => {
                    const isInQuickAccess = basketData["Quick Access"].some(
                      (qaItem) => qaItem.id === item.id && qaItem.title !== ""
                    );
                    const isEmpty = !item.title;
                    const canTogglePin = !isEmpty && !item.lock;

                    return (
                      <div
                        key={item.id}
                        className={`flex items-center gap-2 mb-2 p-2 rounded ${
                          isEmpty
                            ? "cursor-not-allowed opacity-80"
                            : "cursor-default"
                        }`}
                      >
                        {category === "Quick Access" && (
                          <Button variant="text" leftIcon={<FcMenu />} />
                        )}
                        {item.lock && <Button leftIcon={<CiLock />} />}

                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (canTogglePin) togglePin(item.id);
                          }}
                          variant={isInQuickAccess ? "filled" : "outlined"} // تغییر این خط
                          leftIcon={<TiPinOutline />}
                          title={
                            canTogglePin
                              ? isInQuickAccess
                                ? "Unpin"
                                : "Pin"
                              : item.lock
                              ? "Locked"
                              : "Unavailable"
                          }
                          className={`${
                            isEdit
                              ? "opacity-100 visible"
                              : "opacity-0 invisible"
                          } duration-300`}
                        />

                        <Link to={isEdit || isEmpty ? "#" : item.href}>
                          <Button
                            leftIcon={iconMap[item.icon] ?? <IoIosAdd />}
                            className={`${isEmpty ? "cursor-not-allowed" : ""}`}
                            onClick={() => {}}
                          />
                        </Link>

                        <Text
                          size="sm"
                          className={`${
                            isEmpty ? "text-stone-400 italic" : ""
                          }`}
                        >
                          {isEmpty ? "Empty slot — Not available" : item.title}
                        </Text>
                        <div className="flex flex-1 border border-dashed border-stone-200 dark:border-stone-900"></div>
                        <Text size="sm" className="truncate">
                          {isEmpty
                            ? "This slot is empty"
                            : "Lorem ipsum dolor sit amet consectetur adipisicing"}
                        </Text>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default memo(BasketItems);
