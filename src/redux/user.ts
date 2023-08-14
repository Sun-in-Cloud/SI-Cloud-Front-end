import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../redux/configStore';
import axios from 'axios';

export interface User {
  id: string;
  password: string;
}

export const initialStateValue: User = {
  id: '',
  password: '',
};

//회원가입으로 사용할 예정
export const loginUserAsync = createAsyncThunk('LOGIN_USER', async (user: User) => {
  console.log('here');
  const response = await axios.post('/auth/login', user);
  console.log(response);
  return response.data;
});

export const setUserAsync = createAsyncThunk('SET_USER', async (user: User) => {
  console.log(user);
  let data: any;
  await axios
    .post('/auth/login', user)
    .then(function (response) {
      console.log(response.data);
      data = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialStateValue,
  reducers: {
    setUserReducer: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.password = action.payload.password;
    },
    logout: (state) => {
      state.id = initialStateValue.id;
      state.password = initialStateValue.password;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setUserAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      return { ...state, ...action.payload };
    });
    builder.addCase(setUserAsync.rejected, (state, action) => {
      return { ...state };
    });
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
    builder.addCase(loginUserAsync.rejected, (state, action) => {
      return { ...state };
    });
  },
});

export const { setUserReducer, logout } = userSlice.actions;
export const getUserReducer = (state: RootState) => state.user;
export const getUserInfo = (state: RootState) => state.user;
export default userSlice.reducer;
