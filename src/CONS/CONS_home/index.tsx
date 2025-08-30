import { useState } from "react";
import Auxilary from "../../BOX/BOX_auxiliary";
import Action from "../../BOX/BOX_action";
import { useGlobalState } from "RDUX/dynamanContext";
import Button from "COMP/RCMP_button_V00.04";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
const Index = () => {
  const { globalState, updateGlobalState } = useGlobalState();
  const [selectepara, setSelectepara] = useState<string>("paraAssistant");
  const [paraAssistant, setParaAssistant] = useState<string>("meta");
  // const [assistant, setassistant] = useState<string>("");
  const codeString = `// meta
.model_id:          ${globalState.filed6.head.id}
.model_title:       ${globalState.filed6.head.title}
.model_type:        ${globalState.filed6.head.type}
.model_version:     ${globalState.filed6.head.ver}
.model_owner:       ${globalState.filed6.head.rem}
.model_lastUpgrade: ${globalState.filed6.head.create}`;
  return (
    <>
      <main className="flex w-full lg:w-9/12 h-full py-0 px-0.5 lg:py-1">
        <Action
          ActionContent={
            <>
              <Button buttunTitle="کامپوننت دکمه" variant="filled" />
            </>
          }
        />
      </main>

      <div className="w-full hidden lg:flex lg:w-3/12  px-0.5 py-1">
        <Auxilary>
          <div className="flex items-center justify-around gap-1">
            <Button
              variant={selectepara === "paraAssistant" ? "filled" : "outlined"}
              buttunTitle="para assistant"
              onClick={() => setSelectepara("paraAssistant")}
              fullWidth
            />
            <Button
              variant={selectepara === "paraEditor" ? "filled" : "outlined"}
              buttunTitle="para editor"
              onClick={() => setSelectepara("paraEditor")}
              fullWidth
            />
          </div>
          {selectepara === "paraAssistant" && (
            <div className="flex items-center w-full *:flex-1">
              <div>
                <Button
                  buttunTitle="meta"
                  fullWidth
                  variant={paraAssistant === "meta" ? "filled" : "outlined"}
                  onClick={() => setParaAssistant("meta")}
                />
              </div>
              <div>
                <Button
                  buttunTitle="geo"
                  fullWidth
                  variant={paraAssistant === "geo" ? "filled" : "outlined"}
                  onClick={() => setParaAssistant("geo")}
                />
              </div>
              <div>
                <Button
                  buttunTitle="logic"
                  fullWidth
                  variant={paraAssistant === "logic" ? "filled" : "outlined"}
                  onClick={() => setParaAssistant("logic")}
                />
              </div>
              <div>
                <Button
                  buttunTitle="style"
                  fullWidth
                  variant={paraAssistant === "style" ? "filled" : "outlined"}
                  onClick={() => setParaAssistant("style")}
                />
              </div>
            </div>
          )}

          {paraAssistant === "meta" &&
            selectepara ==="paraAssistant" &&(
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    className="custom-scrollbar h-full"
                    customStyle={{
                      margin: 0,
                      padding: "16px",
                      fontSize: "14px",
                      borderRadius: "12px",
                      minHeight:"75vh"
                    }}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              )}
        </Auxilary>
      </div>
    </>
  );
};

export default Index;
