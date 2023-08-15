import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserReducer, logout, User, initialStateValue, loginUserAsync, setUserAsync } from '../../redux/user';
import { useAppSelect } from '../../redux/configStore.hooks';
import axios from 'axios';
import { styled } from 'styled-components';
import RegisterNew from '../common/RegisterNew';
import LoginBtn from '../common/Loginbtn';
import { CopyShader } from 'three-stdlib';
import threepl, { setThreeplReducer } from '../../redux/threepl';
import seller, { setSellerReducer } from '../../redux/seller';
import { useNavigate } from 'react-router';

function Login(props: any) {
  const [loginUser, setLoginUser] = useState<User>(initialStateValue);

  const user = useAppSelect((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const setUser = (e: any) => {
    e.preventDefault();
    dispatch(setUserReducer(loginUser));
    getUserInfo();
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
  async function getUserInfo() {
    const info = { loginId: loginUser.id, loginPassword: loginUser.password };
    //dispatch(setUserAsync(info));
    `${process.env.REACT_APP_API_URL}/auth/login`;
    const listurl = `/auth/login`;
    await axios
      .post(listurl, info)
      .then(function (response) {
        console.log(response);
        if (response.data.userType == 'SELLER') {
          dispatch(setSellerReducer(response.data));
          navigate('/seller');
        } else if (response.data.userType == 'THREE_PL') {
          dispatch(setThreeplReducer(response.data));
          navigate('/3pl');
          console.log(threepl);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <LoginForm>
      <Title>
        <SubTitle>로그인</SubTitle>
      </Title>
      <p></p>
      <LoginText>
        <Text>
          <OneRow>
            <Item>아이디</Item>
            <RegisterNew type="text" name="id" onChange={onChange} />
          </OneRow>
          <OneRow>
            <Item>비밀번호</Item>
            <RegisterNew type="text" name="password" onChange={onChange} />
          </OneRow>
        </Text>
        <Btns>
          <LoginBtn onClick={setUser} variant="dark" type="landscape">
            login
          </LoginBtn>
        </Btns>
      </LoginText>

      <p></p>
      {/* <button onClick={clearUser}>logout</button> */}
    </LoginForm>
  );
}

const LoginForm = styled.div`
  display: grid;
  width: 100%;
  padding-top: 150px;
  height: 430px;
  grid-template-columns: 1fr 2fr 1fr;
`;

const Title = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: #f6f2ef;
  width: 100%;
  height: 200px;
  border-radius: 0 0 10px 10px;
`;
const OneRow = styled.div`
  display: grid;
  width: 100%;
  justify-items: center;
`;
const Text = styled.div`
  padding: 10px;
`;

const Item = styled.div`
  font-size: 20px;
  font-family: 'GmarketSansMedium';
  margin: 10px;
`;

const LoginText = styled.div`
  margin-top: 65px;
  display: grid;
  height: fit-content;
`;

const Btns = styled.div`
  display: flex;
  justify-content: center;
`;

const SubTitle = styled.div`
  display: grid;
  margin-top: 130px;
  font-size: 20px;
  font-family: 'GmarketSansMedium';
`;
export default Login;
