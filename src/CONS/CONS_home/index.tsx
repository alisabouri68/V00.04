import BOX_action from "BOX/BOX_action";
import BOX_actionMenu from "BOX/BOX_actionMenue";
import BOX_actionContent from "BOX/BOX_actionContent";
import BOX_Assistant from "BOX/BOX_assistant";
import BndlActionMenu from "../../BNDL/WRAP_home/index_action_menu";
import BundlAssistantMenu from "BNDL/WRAP_home/index_assistant_menu"
import BundlAssistantContent from "BNDL/WRAP_home/index_assistant_content"
import ButtonTest from "COMP/RCMP_button_V00.04/indextest";
import { useState } from "react";

function Index() {
  const [activeView, setActiveView] = useState<"assistant" | "editor">("assistant");
  const [selectedTab, setSelectedTab] = useState<"meta" | "geo" | "log" | "style">("meta");
  return (
    <>

      <BOX_action>
        <div>
          <div>
            <BOX_actionMenu>
              <BndlActionMenu />
            </BOX_actionMenu>
          </div>
          <div>
            <BOX_actionContent>
              <div className="flex flex-col gap-4">
                <div className="flex gap-5 items-center">
                  <ButtonTest logic={{ buttonTitle: "mini", isLoading: false, variant: "filled" }} geo={{ size: "mini" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "small", isLoading: false, variant: "filled" }} geo={{ size: "small" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "default", isLoading: false, variant: "filled" }} geo={{ size: "default" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "large", isLoading: false, variant: "filled" }} geo={{ size: "large" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "xlarge", isLoading: false, variant: "filled" }} geo={{ size: "xlarge" }} style={{}} meta={{}} methode={{}} />
                  <span className="font-semibold text-primary">VARIANT _ FILLED </span>
                </div>
                <div className="flex gap-5 items-center">
                  <ButtonTest logic={{ buttonTitle: "mini", isLoading: false, disabled: true }} geo={{ size: "mini" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "small", isLoading: false, disabled: true }} geo={{ size: "small" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "default", isLoading: false, disabled: true }} geo={{ size: "default" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "large", isLoading: false, disabled: true }} geo={{ size: "large" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "xlarge", isLoading: false, disabled: true }} geo={{ size: "xlarge" }} style={{}} meta={{}} methode={{}} />
                  <span className="font-semibold text-primary">DISABLED</span>
                </div>
                <div className="flex gap-5 items-center">
                  <ButtonTest logic={{ buttonTitle: "mini", isLoading: true }} geo={{ size: "mini" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "small", isLoading: true }} geo={{ size: "small" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "default", isLoading: true }} geo={{ size: "default" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "large", isLoading: true }} geo={{ size: "large" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "xlarge", isLoading: true }} geo={{ size: "xlarge" }} style={{}} meta={{}} methode={{}} />
                  <span className="font-semibold text-primary">DISABLED _ LOADING</span>
                </div>
                <div className="flex gap-5 items-center">
                  <ButtonTest logic={{ buttonTitle: "mini", isLoading: false, variant: "outlined" }} geo={{ size: "mini" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "small", isLoading: false, variant: "outlined" }} geo={{ size: "small" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "default", isLoading: false, variant: "outlined" }} geo={{ size: "default" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "large", isLoading: false, variant: "outlined" }} geo={{ size: "large" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "xlarge", isLoading: false, variant: "outlined" }} geo={{ size: "xlarge" }} style={{}} meta={{}} methode={{}} />
                  <span className="font-semibold text-primary">VARIANT _ OUTLINED </span>
                </div>
                <div className="flex gap-5 items-center">
                  <ButtonTest logic={{ buttonTitle: "mini", isLoading: false, disabled: true, variant: "outlined" }} geo={{ size: "mini" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "small", isLoading: false, disabled: true, variant: "outlined" }} geo={{ size: "small" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "default", isLoading: false, disabled: true, variant: "outlined" }} geo={{ size: "default" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "large", isLoading: false, disabled: true, variant: "outlined" }} geo={{ size: "large" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "xlarge", isLoading: false, disabled: true, variant: "outlined" }} geo={{ size: "xlarge" }} style={{}} meta={{}} methode={{}} />
                  <span className="font-semibold text-primary">DISABLED</span>
                </div>
                <div className="flex gap-5 items-center">
                  <ButtonTest logic={{ buttonTitle: "mini", isLoading: true, disabled: true, variant: "outlined" }} geo={{ size: "mini" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "small", isLoading: true, disabled: true, variant: "outlined" }} geo={{ size: "small" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "default", isLoading: true, disabled: true, variant: "outlined" }} geo={{ size: "default" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "large", isLoading: true, disabled: true, variant: "outlined" }} geo={{ size: "large" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "xlarge", isLoading: true, disabled: true, variant: "outlined" }} geo={{ size: "xlarge" }} style={{}} meta={{}} methode={{}} />
                  <span className="font-semibold text-primary">DISABLED _ LOADING</span>
                </div>
                <div className="flex gap-5 items-center">
                  <ButtonTest logic={{ buttonTitle: "mini", isLoading: false, variant: "text" }} geo={{ size: "mini" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "small", isLoading: false, variant: "text" }} geo={{ size: "small" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "default", isLoading: false, variant: "text" }} geo={{ size: "default" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "large", isLoading: false, variant: "text" }} geo={{ size: "large" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "xlarge", isLoading: false, variant: "text" }} geo={{ size: "xlarge" }} style={{}} meta={{}} methode={{}} />
                  <span className="font-semibold text-primary">VARIANT _ TEXT </span>
                </div>
                <div className="flex gap-5 items-center">
                  <ButtonTest logic={{ buttonTitle: "mini", isLoading: false, disabled: true, variant: "text" }} geo={{ size: "mini" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "small", isLoading: false, disabled: true, variant: "text" }} geo={{ size: "small" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "default", isLoading: false, disabled: true, variant: "text" }} geo={{ size: "default" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "large", isLoading: false, disabled: true, variant: "text" }} geo={{ size: "large" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "xlarge", isLoading: false, disabled: true, variant: "text" }} geo={{ size: "xlarge" }} style={{}} meta={{}} methode={{}} />
                  <span className="font-semibold text-primary">DISABLED</span>
                </div>
                <div className="flex gap-5 items-center">
                  <ButtonTest logic={{ buttonTitle: "mini", isLoading: true, variant: "text" }} geo={{ size: "mini" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "small", isLoading: true, variant: "text" }} geo={{ size: "small" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "default", isLoading: true, variant: "text" }} geo={{ size: "default" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "large", isLoading: true, variant: "text" }} geo={{ size: "large" }} style={{}} meta={{}} methode={{}} />
                  <ButtonTest logic={{ buttonTitle: "xlarge", isLoading: true, variant: "text" }} geo={{ size: "xlarge" }} style={{}} meta={{}} methode={{}} />
                  <span className="font-semibold text-primary">DISABLED _ LOADING</span>
                </div>
              </div></BOX_actionContent>

          </div>
        </div>




      </BOX_action >

      <BOX_Assistant>

        <BundlAssistantMenu
          activeView={activeView}
          setActiveView={setActiveView}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}

        >  <BundlAssistantContent
            activeView={activeView}
            selectedTab={selectedTab}
          /> </BundlAssistantMenu>

      </BOX_Assistant>
    </>
  );
}

export default Index;