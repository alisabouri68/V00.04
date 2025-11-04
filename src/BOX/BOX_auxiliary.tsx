import { ReactNode } from "react";
function Index({ children }: { children?: ReactNode }) {
  return (
    <div className="relative w-3/12 h-full flex-col  overflow-y-auto custom-scrollbar rounded-md gap-1 bg-light text-dark flex p-3 text-center">
      {children}
    </div>
  );
}

export default Index;
