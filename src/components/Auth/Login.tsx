import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserReducer, logout, User, initialStateValue, loginUserAsync, setUserAsync } from '../../redux/user';
import { useAppSelect } from '../../redux/configStore.hooks';
import axios from 'axios';

function Login(props: any) {
  const [loginUser, setLoginUser] = useState<User>(initialStateValue);

  const user = useAppSelect((state) => state.user);

  const dispatch = useDispatch();

  const setUser = (e: any) => {
    e.preventDefault();
    dispatch(setUserReducer(loginUser));
    console.log(loginUser);
    //dispatch(setUserAsync(loginUser));
    getProductList();
  };

  const clearUser = () => {
    dispatch(setUserReducer(initialStateValue));
  };

  const consoleUser = () => {
    console.log(user);
  };

  const handleSubmit = () => {};

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e != undefined) {
      const { name, value } = e.currentTarget;
      setLoginUser({ ...loginUser, [name]: value });
    }
  }
  // 일단 이렇게 하도록..
  async function getProductList() {
    const info = { loginId: user.id, loginPassword: user.password };
    //dispatch(setUserAsync(info));
    const listurl = '/auth/login';
    await axios
      .post(listurl, info)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <input type="text" name="id" onChange={onChange} />
      <input type="text" name="password" onChange={onChange} />
      <button onClick={setUser}>login</button>
      <button onClick={clearUser}>logout</button>
      <button onClick={handleSubmit}>sub</button>
      <button onClick={consoleUser}>console</button>
    </div>
  );
}

export default Login;
