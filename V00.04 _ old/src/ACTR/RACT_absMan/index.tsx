/**
 * Redux Action Management Utility Class (AbsMan)
 * 
 * Provides strongly-typed versions of Redux hooks with application-specific types.
 * Serves as a centralized access point for Redux store interactions with proper TypeScript typing.
 */

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "RDUX/store"

class AbsMan {
    /**
     * Typed version of Redux's useDispatch hook
     * @static
     * @type {function} Returns the typed dispatch method from the Redux store
     * @template AppDispatch - The type definition for the Redux dispatch function
     * 
     * Usage:
     * const dispatch = AbsMan.useAppDispatch();
     * dispatch(someActionCreator());
     */
    static useAppDispatch = useDispatch.withTypes<AppDispatch>();

    /**
     * Typed version of Redux's useSelector hook
     * @static
     * @type {function} Selector function with RootState type awareness
     * @template RootState - The type definition for the complete Redux store state
     * 
     * Usage:
     * const value = AbsMan.useAppSelector((state) => state.someSlice.value);
     */
    static useAppSelector = useSelector.withTypes<RootState>();
}

export default AbsMan;