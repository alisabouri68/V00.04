import { ReactNode } from "react";
function Index({ children }: { children?: ReactNode }) {
  return (
    <div className="relative w-3/12 h-full flex-col overflow-y-auto rounded-md  bg-light text-dark flex gap-1 p-3 text-center">
      {children}
    </div>
  );
}

export default Index;
