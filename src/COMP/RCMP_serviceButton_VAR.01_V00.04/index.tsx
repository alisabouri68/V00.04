import  { memo } from 'react';

function Index({ service, onClick }: any) {
    return (
        <button
            onClick={() => onClick(service)}
            className={`${service.color} border p-3 rounded-xl text-sm hover:opacity-90 transition-opacity`}>
            {service.serviceName}
        </button>
    );
}

export default memo(Index);
