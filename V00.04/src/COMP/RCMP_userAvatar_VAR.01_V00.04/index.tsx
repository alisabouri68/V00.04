import  { memo } from 'react';

function Index({ bgColor, initials }: { bgColor: string; initials: string }) {
    return (
        <div className={`${bgColor} rounded-full w-8 h-8 flex items-center justify-center`}>
            <span className="text-black font-bold text-sm">{initials}</span>
        </div>
    );
}

export default memo(Index);
