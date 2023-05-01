import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import store, { IRootReducer } from '../services/store';

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootReducer> = useSelector;
