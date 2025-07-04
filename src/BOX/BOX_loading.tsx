import React from 'react';
import { LifeLine } from 'react-loading-indicators';

// Separate fallback component for better readability and performance
const BOX_loading = () => (

    <div className="w-screen h-screen flex items-center justify-center text-danger">
        <LifeLine color="rgb(var(--color-primary))" size="large" />
    </div>
);

export default BOX_loading;
