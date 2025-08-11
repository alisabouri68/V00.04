import { memo, useEffect, useState } from "react";
import Button from "../RCMP_button_V00.04/index";
import { IoBookOutline, IoFilterOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { CiGrid41, CiLock } from "react-icons/ci";
import { VscChecklist } from "react-icons/vsc";
import { FcMenu } from "react-icons/fc";
import { TiPinOutline } from "react-icons/ti";
import { HiOutlineHome } from "react-icons/hi2";
import { MdMyLocation, MdOutlineLocalFireDepartment, MdKeyboardArrowDown } from "react-icons/md";
import { closeModal} from "../../RDUX/modal/modalSlice";
import Text from "WIDG/RWID_text_v00.04";
import { useDispatch } from "react-redux";
import { setItems } from "../../RDUX/quickAccessSlice/quickAccessSlice";
import { FaLongArrowAltUp } from "react-icons/fa";
import { RiVoiceprintFill } from "react-icons/ri";
import { Link } from "react-router-dom";
// import type { RootState } from "../../RDUX/store"; 
import { JSX } from "react/jsx-runtime";

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
  "Community": BasketItem[];
  "Mono Service": BasketItem[];
  "General": BasketItem[];
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
const LOCAL_STORAGE_KEY = "basketData_v2";

const initialData: BasketData = {
  "Quick Access": Array.from({ length: 6 }, (_, idx) => ({
    id: `empty-${idx + 1}`,
    icon: "IoIosAdd",
    href: "#",
    title: "",
    para: false,
    lock: false,
    pin: false,
  })),
  "Community": [
    { id: "Cast", icon: "voiceprintfill", href: "/cast", title: "CAST", para: true, lock: false, pin: false },
    { id: "Gasma", icon: "FaLongArrowAltUp", href: "/gasma", title: "GASMA", para: true, lock: false, pin: false },
  ],
  "Mono Service": [
    { id: "wikiCnter", icon: "bookoutline", href: "/mono", title: "WikiCnter", para: true, lock: false, pin: false },
  ],
  "General": [
    { id: "homeServiceGeneral", icon: "HiOutlineHome", href: "/", title: "HOME", para: true, lock: false, pin: false },
    { id: "hotserviceGeneral", icon: "MdOutlineLocalFireDepartment", href: "/hot", title: "Hot", para: true, lock: false, pin: false },
  ],
};

// ---------------- Component ----------------
const BasketItems = () => {
  const dispatch = useDispatch();
  const [basketData, setBasketData] = useState<BasketData>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved) as BasketData;
      } catch {
        return initialData;
      }
    }
    return initialData;
  });

  const [openCategory, setOpenCategory] = useState<keyof BasketData>("Community");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(basketData));
    dispatch(setItems(basketData["Quick Access"]));
  }, [basketData, dispatch]);

  const pinnedItems: Record<string, boolean> = {};
  (Object.values(basketData) as BasketItem[][]).flat().forEach((item) => {
    pinnedItems[item.id] = !!item.pin;
  });

  const toggleCategory = (category: keyof BasketData) => {
    if (category === "Quick Access") return;
    setOpenCategory(category);
  };

  const sortQuickAccess = (items: BasketItem[]) => {
    const filledItems = items.filter((item) => item.title);
    const emptyItems = items.filter((item) => !item.title);
    return [...filledItems, ...emptyItems];
  };

  const togglePin = (id: string) => {
    if (!isEdit) return;

    let itemCategory: keyof BasketData | null = null;
    let itemIndex = -1;
    let item: BasketItem | undefined;

    for (const [cat, items] of Object.entries(basketData) as [keyof BasketData, BasketItem[]][]) {
      const index = items.findIndex((i) => i.id === id);
      if (index !== -1) {
        itemCategory = cat;
        itemIndex = index;
        item = items[index];
        break;
      }
    }

    if (!item || !itemCategory) return;
    if (item.lock || !item.title) return;

    if (!item.pin) {
      const emptyIndex = basketData["Quick Access"].findIndex((i) => !i.title);
      if (emptyIndex === -1) {
        alert("ظرفیت Quick Access پر است.");
        return;
      }

      const newCategoryItems = [...basketData[itemCategory]];
      newCategoryItems.splice(itemIndex, 1);

      const newQuickAccess = [...basketData["Quick Access"]];
      newQuickAccess[emptyIndex] = { ...item, pin: true };

      setBasketData((prev) => ({
        ...prev,
        [itemCategory!]: newCategoryItems,
        "Quick Access": sortQuickAccess(newQuickAccess),
      }));
    } else {
      if (itemCategory !== "Quick Access") return;

      const newQuickAccess = [...basketData["Quick Access"]];
      newQuickAccess[itemIndex] = {
        id: `empty-${Date.now()}`,
        icon: "IoIosAdd",
        href: "#",
        title: "",
        para: false,
        lock: false,
        pin: false,
      };

      let originalCategory: keyof BasketData = "Community";
      for (const [cat, items] of Object.entries(initialData) as [keyof BasketData, BasketItem[]][]) {
        if (items.some((i) => i.id === item!.id)) {
          originalCategory = cat;
          break;
        }
      }

      const newCategoryItems = [...basketData[originalCategory], { ...item, pin: false }];

      setBasketData((prev) => ({
        ...prev,
        "Quick Access": sortQuickAccess(newQuickAccess),
        [originalCategory]: newCategoryItems,
      }));
    }
  };

  return (
    <div className="flex flex-col items-center w-full rounded-lg bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-300 h-full">
      <div className="w-full flex py-3 items-center justify-evenly border-b">
        <div><h6>Console Basket</h6></div>
        <div className="flex items-center">
          <Button onClick={() => setIsEdit((s) => !s)} leftIcon={<IoFilterOutline className="text-2xl" />} size="md" variant="outlined" />
          <div className="mx-2">
            <input type="text" placeholder="Search" className="border dark:border-gray-300 border-gray-500 rounded-md outline-none bg-inherit" />
          </div>
          <Button leftIcon={<VscChecklist className="text-2xl" />} size="md" title="List" variant="textActive" />
          <Button leftIcon={<CiGrid41 className="text-2xl" />} size="md" title="Icon" variant="text" />
        </div>
        <Button onClick={() => dispatch(closeModal())} leftIcon={<IoMdClose className="text-2xl" />} variant="text" />
      </div>

      <div className="p-5 overflow-y-auto flex flex-col overflow-x-hidden w-full h-full custom-scrollbar">
        {(Object.entries(basketData) as [keyof BasketData, BasketItem[]][]).map(([category, items]) => {
          const isOpen = category === "Quick Access" || category === openCategory;
          const computedHeight = category === "Quick Access" ? "auto" : isOpen ? `${items.length * 56}px` : "0";

          return (
            <div key={category} className="mb-1">
              <div className="flex items-center justify-between cursor-pointer gap-1 w-full" onClick={() => toggleCategory(category)}>
                <Text as="h6" className="font-bold mb-2">{category}</Text>
                {category !== "Quick Access" && (
                  <>
                    <div className="border border-dashed border-gray-50 dark:border-gray-900 flex flex-1"></div>
                    <Button
                      size="lg"
                      variant="text"
                      leftIcon={<MdKeyboardArrowDown className={`transform ${openCategory === category ? "rotate-180" : ""} duration-500 transition-all`} />}

                    />
                  </>
                )}
              </div>

              <div className="overflow-hidden transition-all duration-300" style={{ height: computedHeight }} aria-hidden={category !== "Quick Access" && !isOpen}>
                {items.map((item) => {
                  const isPinned = pinnedItems[item.id];
                  const isEmpty = !item.title;
                  const canTogglePin = !isEmpty && !item.lock;

                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-2 mb-2 p-2 rounded ${isEmpty ? "bg-gray-50 dark:bg-gray-900 cursor-not-allowed opacity-70" : "hover:bg-gray-50 dark:hover:bg-gray-900 cursor-default"}`}>

                      {category === "Quick Access" && <Button variant="text" leftIcon={<FcMenu />} />}
                      {item.lock && <Button leftIcon={<CiLock />} />}

                      <Button
                        onClick={(e) => { e.stopPropagation(); if (canTogglePin) togglePin(item.id); }}
                        variant={isPinned ? "filled" : "outlined"}
                        leftIcon={<TiPinOutline />}
                        title={canTogglePin ? (isPinned ? "Unpin" : "Pin") : item.lock ? "Locked" : "Unavailable"}
                        className={`${isEdit ? "opacity-100 visible" : "opacity-0 invisible"} duration-300`}
                      />

                      <Link to={isEdit || isEmpty ? "#" : item.href}>
                        <Button
                          leftIcon={iconMap[item.icon] ?? <IoIosAdd />}
                          className={`${isEmpty ? "cursor-not-allowed" : ""}`}
                          onClick={() => { }}
                        />
                      </Link>

                      <Text size="sm" className={`${isEmpty ? "text-gray-400 italic" : ""}`}>
                        {isEmpty ? "Empty slot — Not available" : item.title}
                      </Text>
                      <div className="flex flex-1 border border-dashed border-gray-200 dark:border-gray-900"></div>
                      <Text size="sm" className="truncate">
                        {isEmpty ? "This slot is empty" : "Lorem ipsum dolor sit amet consectetur adipisicing"}
                      </Text>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(BasketItems);
