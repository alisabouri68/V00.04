import Slider from "../COMP/RCMP_swiper/swiper"
/**
 * Jinni Box Component
 * 
 * A simple placeholder container with consistent styling that displays "jinni Box" text.
 * 
 * Features:
 * - White background with rounded corners
 * - Subtle shadow for depth
 * - Fixed height container
 * - Padding for internal spacing
 * 
 * Usage:
 * <Index /> - Renders a styled div with placeholder text
 * 
 * Styling:
 * - : White background
 * - rounded-xl: Large rounded corners (16px radius)
 * - rounded-md: Medium drop shadow
 * - p-6: Padding of 1.5rem (24px) on all sides
 * - h-40: Fixed height of 10rem (160px)
 */
function Index() {
    return (
        /**
         * Jinni Box Container
         * - Serves as a visual placeholder
         * - Provides consistent styling for content
         * - Can be used as a base for more complex components
         */
        <div className=" flex items-center justify-center rounded-t-xl my-custom-card h-40 overflow-hidden relative">
            <Slider />
        </div>
    );
}

export default Index;