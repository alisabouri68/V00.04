import { useState } from "react";
import Auxilary from "../../BOX/BOX_auxiliary";
import Action from "../../BOX/BOX_action";
import Dropdown from "COMP/RCMP_dropdown_V00.04";
import { DropdownOption } from "COMP/RCMP_dropdown_V00.04";
import { useGlobalState } from "RDUX/dynamanContext";

const Index = () => {
  const { globalState, updateGlobalState } = useGlobalState();

  const objDropDown: DropdownOption[] = [
    { id: "1", name: "ENVI_glob", icon: null },
    { id: "2", name: "ENVI_hybrid", icon: null },
    { id: "3", name: "ENVI_profil", icon: null },
    { id: "4", name: "ENVI_console", icon: null },
    { id: "5", name: "ENVI_bundle", icon: null },
  ];

  const [selectedItem, setSelectedItem] = useState<DropdownOption | null>(null);
  const [inputValues, setInputValues] = useState({
    val2: "",
    val3: "",
  });

  const selectItem = (item: DropdownOption) => {
    setSelectedItem(item);
  };
  const options = [
    "homeServiceGeneral",
    "hotserviceGeneral",
    "Cast",
    "Gasma",
    "wikiCnter",
  ];
  return (
    <>
      <main className="flex w-full lg:w-9/12 h-full py-0 px-0.5 lg:py-1">
        <Action
          ActionContent={
            selectedItem?.name === "ENVI_glob" ? (
              <>
                <label htmlFor="theme">
                  THEME {"-----------" + globalState.theme}
                </label>
                <input
                  name="theme"
                  id="theme"
                  type="text"
                  className="w-52 rounded-lg m-3 border text-dark bg-light/40"
                  value={globalState.theme}
                  onChange={(e) => updateGlobalState({ theme: e.target.value })}
                />

                <label htmlFor="val2">LANGUAGE</label>
                <input
                  name="val2"
                  id="val2"
                  type="text"
                  className="w-52 rounded-lg m-3 border"
                  value={inputValues.val2}
                  onChange={(e) =>
                    setInputValues({ ...inputValues, val2: e.target.value })
                  }
                />

                <label htmlFor="val3">Other</label>
                <input
                  name="val3"
                  id="val3"
                  type="text"
                  className="w-52 rounded-lg m-3 border"
                  value={inputValues.val3}
                  onChange={(e) =>
                    setInputValues({ ...inputValues, val3: e.target.value })
                  }
                />

              <div className="flex items-center mt-2">
  {options.map((option) => (
    <label
      key={option}
      className={`flex items-center mr-3 text-dark bg-light`}
    >
      {option}
      <input
        type="checkbox"
        value={option}
        checked={globalState.consoleItem[option]}
        onChange={() => {
          updateGlobalState({
            consoleItem: {
              ...globalState.consoleItem,
              [option]: !globalState.consoleItem[option],
            },
          });
        }}
        className={`w-4 h-4 ml-1 border rounded text-danger bg-dark`}
      />
    </label>
  ))}
</div>
              </>
            ) : null
          }
        />
      </main>

      <div className="w-full hidden lg:flex lg:w-3/12 px-0.5 py-1 border">
        <Auxilary>
          <Dropdown
            options={objDropDown}
            onSelect={selectItem}
            placeholder={selectedItem ? selectedItem.name : "انتخاب کنید"}
          />
        </Auxilary>
      </div>
    </>
  );
};

export default Index;
