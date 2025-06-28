import React, { useCallback, memo } from 'react';
import { faSun, faGlobe } from '@fortawesome/free-solid-svg-icons';
import AbsMan from 'ACTR/RACT_absMan';
import { logout } from 'RDUX/env/HybSlice';
import ConsoleSwicher from 'COMP/RCMP_consoleSwitcher_VAR.01_V00.04';
import IconTextItem from 'COMP/RCMP_iconTextItem_VAR.01_V00.04';
import UserProfile from 'COMP/RCMP_userProfile_VAR.01_V00.04';

// Assets
import avatar from 'ASST/images/avatar.png';

/**
 * Header Component
 * 
 * Application header containing navigation controls, user profile, and settings.
 * 
 * Features:
 * - Console switcher for environment selection
 * - Theme and language selection controls
 * - User profile display with avatar
 * - Logout functionality
 * - Optimized with React.memo to prevent unnecessary re-renders
 * 
 * State Management:
 * - Uses Redux dispatch for logout action
 * - Manages local state for UI interactions
 */
const Header = () => {
    // Initialize Redux dispatch with typed hook
    const dispatch = AbsMan.useAppDispatch();

    /**
     * Handles user logout process
     * - Removes access token from localStorage
     * - Dispatches logout action to Redux store
     * - Memoized with useCallback to maintain stable reference
     */
    const handleLogout = useCallback(() => {
        window.localStorage.removeItem('access_token');
        dispatch(logout());
    }, [dispatch]);

    return (
        /** 
         * Header Container
         * - Fixed white background
         * - Flex layout for horizontal alignment
         * - Padding for spacing
         */
        <header className="flex justify-between p-3 bg-white items-center">
            {/* Left-aligned console switcher control */}
            <ConsoleSwicher />

            {/* Right-aligned control group */}
            <div className="flex gap-6 items-center">
                {/* Theme switcher button */}
                <IconTextItem icon={faSun} text="Theme" />
                
                {/* Language selector button */}
                <IconTextItem icon={faGlobe} text="English" />
                
                {/* User profile section with avatar and info */}
                <UserProfile 
                    avatarSrc={avatar} 
                    name="Hana Rezaei" 
                    location="(Tehran)" 
                />
                
                {/*
                 * Logout button
                 * - Hidden visual element with click handler
                 * - Accessible with role and tabIndex
                 * - Right padding for spacing
                 */}
                <div
                    className="pr-8 cursor-pointer"
                    title="logout"
                    onClick={handleLogout}
                    role="button"
                    tabIndex={0}
                />
            </div>
        </header>
    );
};

// Export memoized component to prevent unnecessary re-renders
export default memo(Header);