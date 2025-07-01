import React from 'react';
import { StickyContainer } from 'react-sticky';

/**
 * Sticky Container Component
 *
 * Provides a container for sticky elements with consistent styling.
 * Wraps children in a styled container that can be used as a sticky context.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to be rendered inside the container
 *
 * Features:
 * - Uses react-sticky's StickyContainer as the base
 * - Applies consistent white background with shadow and rounded corners
 * - Fixed width of 4/12 (33.33%) of parent container
 * - Includes commented example of Sticky child component usage
 *
 * Note: The Sticky component example is commented out but available for reference
 */
function Index({ children }: any) {
    return (
        /**
         * Sticky Container Wrapper
         * - Provides context for sticky positioning
         * - Standard styling for all sticky sections
         * - Padding and rounded corners for visual consistency
         */
        <StickyContainer className="w-4/12 bg-white rounded-xl shadow-md p-2">
            {children}

            {/* 
            Example Sticky Component Usage (commented out)
            <Sticky topOffset={80}>
                {({ style }) => (
                    <div style={style} className="">
                        <div className="w-full flex justify-start flex-col gap-2">
                            {children}
                        </div>
                    </div>
                )}
            </Sticky> 
            */}
        </StickyContainer>
    );
}

export default Index;
