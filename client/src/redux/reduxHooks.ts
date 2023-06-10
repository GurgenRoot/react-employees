import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from './store';

// Custom hook for accessing the Redux dispatch function
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook for accessing the Redux store state
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
