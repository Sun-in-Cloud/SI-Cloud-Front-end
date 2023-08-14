import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { RootState } from './configStore';

export interface Seller {
  sellers: Array<string>;
  userNo: number;
  userType: string;
}

export const initialStateValue: Seller = {
  sellers: [],
  userNo: 0,
  userType: 'SELLER',
};

export const sellerSlice = createSlice({
  name: 'seller',
  initialState: initialStateValue,
  reducers: {
    setSellerReducer: (state, action: PayloadAction<Seller>) => {
      state.sellers = action.payload.sellers;
      state.userNo = action.payload.userNo;
      state.userType = action.payload.userType;
    },
  },
  extraReducers: {},
});
export const { setSellerReducer } = sellerSlice.actions;
export const getSellerReducer = (state: RootState) => state.seller;
export const getSellerInfo = (state: RootState) => state.seller;
export default sellerSlice.reducer;
