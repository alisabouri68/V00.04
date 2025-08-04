import Button from "COMP/RCMP_button_V00.04";
import { ReactNode } from "react";
import { RxDividerHorizontal } from "react-icons/rx";
function Index({ children, onClick }: { children?: ReactNode, onClick?: () => void }) {
    return (

        <div className="relative w-full h-full flex-col overflow-hidden rounded-md bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-300  flex items-center justify-center">
            <Button variant="text" className="lg:hidden -translate-y-4" onClick={onClick} leftIcon={<RxDividerHorizontal className="text-7xl" />} />
            {children}
        </div>
    );
}

export default Index;
