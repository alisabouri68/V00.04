import { ReactNode } from "react";
import Jini from "../BOX/BOX_Jinni";
import Auxiliary from "../BOX/BOX_auxiliary";

type Props = {
  jiniChild?: React.ReactNode;
  auxiliaryChild?: React.ReactNode;
  children?: ReactNode;
};

const BOX_actionn = ({ jiniChild, auxiliaryChild, children }: Props) => {
  return (
    <div className="w-full min-h-full flex py-1 overflow-hidden">
      <div className="flex gap-2 w-9/12 ps-1">
        <Jini>
          {jiniChild}
          {children}
        </Jini>
      </div>

      <div className="flex w-3/12 px-1 overflow-hidden">
        <Auxiliary />
        {auxiliaryChild}
      </div>
    </div>
  );
};

export default BOX_actionn;
