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
      <main className="flex w-full lg:w-9/12 h-full py-0 px-0.5 lg:py-1">
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
      </main>
      <div className="w-full hidden lg:flex lg:w-3/12 px-0.5 py-1">
        <Auxiliary
          children={
            <div>
              <span className="border rounded-md mb-4 flex items-center justify-center border-primary">
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
      </div>
    </>
  );
}

export default index;
