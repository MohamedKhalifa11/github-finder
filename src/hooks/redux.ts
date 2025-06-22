import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { RootState, AppDispatch } from "../store/store";

// Custom hook to use the typed dispatch function
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook to use the typed selector function
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
