import React from "react";

export const ResponsiveWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="w-full h-full">
            {children}
        </div>
    );
};