import Navigator from "../../COMP/RCMP_navigator_VAR.01_V00.04"
import BoxHeader from "../../BOX/BOX_header"
import BoxNav from "../../BOX/BOX_nav"
import BoxJinni from "../../BOX/BOX_Jinni"
import BoxAuxilary from "../../BOX/BOX_auxiliary"
import ActionMenue from "../../BOX/BOX_actiomMenue"
import ActionContent from "../../BOX/BOX_actionContent"
import ServicePicker from "../../COMP/RCMP_servicePicker_VAR.01_V00.04"
import BOX_assistant from "BOX/BOX_assistant"
import { Outlet, useMatches } from "react-router-dom"
const index = () => {
    const matches = useMatches();
    const hasChildRoutes = matches.length > 2
    console.log(matches)
    return (
        <>
            <BoxHeader console="GASMA" />
            <div className="flex flex-1 h-[calc(100% - 56px)] p-1 overflow-hidden">
                <BoxNav >
                    <Navigator />
                </BoxNav>
                <div className="flex w-full h-full ">
                    <div className="flex flex-col h-full w-9/12 overflow-x-hidden rounded-md overflow-y-auto custom-scrollbar ms-1 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-300">
                        <BoxJinni />
                        <ActionMenue>
                            <ServicePicker />
                        </ActionMenue>
                        <ActionContent>
                            {hasChildRoutes ? <Outlet /> : <p>please select a service</p>}

                        </ActionContent>
                        <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/90 to-transparent dark:from-gray-900/90 z-10"></div>
                    </div>

                    <div className="w-3/12 ps-1">
                        <BoxAuxilary>
                            Auxilary GASMA
                            <BOX_assistant>
                                BOX_assistant GASMA
                                <p className="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, possimus.</p>
                            </BOX_assistant>
                        </BoxAuxilary>
                    </div>
                </div>
            </div>
        </>
    );
};

export default index;
