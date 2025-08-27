import { ReactNode } from "react";
function Index({ children }: { children?: ReactNode }) {
  return (
    <div className="relative w-full h-full flex-col overflow-y-auto rounded-md  bg-light text-dark flex items-center justify-center p-3 text-center">
      {children}
    </div>
  );
}

export default Index;
