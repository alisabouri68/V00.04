import Auxilary from "../../BOX/BOX_auxiliary";
import Action from "../../BOX/BOX_action";
const Index = () => {
  return (
    <>
      <main className="flex w-full lg:w-9/12 h-full py-0 px-0.5 lg:py-1">
        <Action />
      </main>
      <div className="w-full hidden lg:flex lg:w-3/12 px-0.5 py-1">
        <Auxilary />
      </div>
    </>
  );
};

export default Index;
