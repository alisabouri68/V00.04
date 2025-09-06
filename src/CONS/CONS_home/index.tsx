import BOX_actionn from "../../BOX/BOX_action";
import Auxiliary from "../../BOX/BOX_auxiliary";
import Component_1 from "../../COMP/RCMP_component_1";
import Component_2 from "../../COMP/RCMP_component_2";
import EnviMngr from "../../COMP/RCMP_envimngr_v00.04";
import { useState } from "react";
import Button from "../../COMP/RCMP_button_V00.04";

function index() {
  const [assistant, setAssistant] = useState<string>("Assistant");
  return (
    <>
      <BOX_actionn
        ActionContent={
          <div className="flex items-center justify-center gap-4">
            <Button
              size="xlarge"
              buttunTitle="Component_1"
              variant="filled"
              onClick={() => setAssistant("Component_1")}
            />
            <Button
              size="xlarge"
              buttunTitle="Component_2"
              variant="filled"
              onClick={() => setAssistant("Component_2")}
            />
            <Button
              size="xlarge"
              buttunTitle="ENVI_Mngr"
              variant="filled"
              onClick={() => setAssistant("Envi_mngr")}
            />
          </div>
        }
      />

      <Auxiliary
        children={
          <div>
            <span className="border w-full rounded-md mb-4 flex items-center justify-center border-primary p-2">
              {assistant && assistant}
            </span>

            {assistant === "Envi_mngr" ? (
              <EnviMngr />
            ) : assistant === "Component_1" ? (
              <Component_1 />
            ) : assistant === "Component_2" ? (
              <Component_2 />
            ) : null}
          </div>
        }
      />
    </>
  );
}

export default index;
