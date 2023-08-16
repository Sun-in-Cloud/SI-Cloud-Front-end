import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { RootState } from './configStore';

export interface Threepl {
  sellers: Array<string>;
  userNo: number;
  userType: string;
}

export const initialStateValue: Threepl = {
  sellers: [],
  userNo: 0,
  userType: 'THREE_PL',
};

export const threeplSlice = createSlice({
  name: 'threepl',
  initialState: initialStateValue,
  reducers: {
    setThreeplReducer: (state, action: PayloadAction<Threepl>) => {
      state.sellers = action.payload.sellers;
      state.userNo = action.payload.userNo;
      state.userType = action.payload.userType;
    },
  },
  extraReducers: {},
});
export const { setThreeplReducer } = threeplSlice.actions;
export const getThreeplReducer = (state: RootState) => state.threepl;
export const getThreeplInfo = (state: RootState) => state.threepl;
export default threeplSlice.reducer;
