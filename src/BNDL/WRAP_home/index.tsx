import Dropdown from "COMP/RCMP_dropdown_V00.04";
import { useGlobalState } from "RDUX/dynamanContext";

function Index() {
  const { globalState, updateGlobalState } = useGlobalState();

  const dropdownItems = Object.entries(globalState).map(([key, value]) => {
    const displayValue = typeof value === 'object' ? JSON.stringify(value) : value;
    
    return {
      name: key,
      value: displayValue,
      id: key
    };
  });
 const handleSelect = (selectedItem) => {
    console.log("Selected:", selectedItem);
    updateGlobalState({ abcd:{
        name:selectedItem.name,
        id:selectedItem.id,
        value:selectedItem.value,
    } });
  };

 

  return (
    <div className="flex">
      <Dropdown
        options={dropdownItems}
        selected={null} 
        onSelect={handleSelect}
        placeholder="SELECT_ENVI"
      />
    </div>
  );
}

export default Index;