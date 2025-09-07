import Jini from "./BOX_Jinni";
type Props = {
  ActionMenu?: React.ReactNode;
  ActionContent?: React.ReactNode;
};
const BOX_actionn = ({ ActionMenu, ActionContent }: Props) => {
  return (
    <div className=" flex flex-col w-full h-full bg-light text-dark lg:rounded-md custom-scrollbar overflow-y-auto ">
      <Jini />
      {ActionMenu}
      {ActionContent}
    </div>
  );
};

export default BOX_actionn;
