import Jini from "../BOX/BOX_Jinni";
import Auxiliary from "../BOX/BOX_auxiliary";

type Props = {
  jiniChild?: React.ReactNode;
  auxiliaryChild?: React.ReactNode;
};
const BOX_actionn = ({ jiniChild, auxiliaryChild }: Props) => {
  return (
    <div className=" flex flex-row w-full h-full ps-1 ">
      <div className=" relative flex flex-col h-full gap-2 w-9/12 my-custom-card custom-scrollbar overflow-hidden">
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 
            bg-gradient-to-t from-white to-transparent dark:from-stone-900 z-10">
        </div>
        <Jini />
        {jiniChild}
      </div>
      <div className="flex w-3/12 px-1 h-full">
        <Auxiliary />
        {auxiliaryChild}
      </div>
    </div>
  );
};

export default BOX_actionn;
