import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import seller from './seller';
import threepl from './threepl';

const store = configureStore({
  reducer: {
    user,
    seller,
    threepl,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
