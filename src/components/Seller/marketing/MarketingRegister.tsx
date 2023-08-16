import React from 'react';
import { styled } from 'styled-components';
import one from '../../../img/registerImg/1.jpg';
import LoginBtn from '../../common/Loginbtn';

function MarketingRegister(props: any) {
  return (
    <RegisterPage>
      <Title>
        <SubTitle>솔루션 신청하기</SubTitle>
      </Title>
      <p></p>
      <Register>
        <img src={one} style={{ width: '100%', height: '65%', borderRadius: '14px' }} />
        <Type>
          <h3>[ 기본 회원 ]</h3>
          <li style={{ color: '#0073FF' }}>상품관리 서비스 이용 가능</li>
          <li style={{ color: '#DA3915' }}>위험군 판단 불가</li>
          <li style={{ color: '#DA3915' }}>채널별 분석 불가</li>
          <Btns>
            <LoginBtn variant="dark" type="landscape">
              신청
            </LoginBtn>
          </Btns>
        </Type>
      </Register>
      <Register>
        <img src={one} style={{ width: '100%', height: '65%', borderRadius: '14px' }} />
        <Type>
          <h3>[ 골드 회원 ]</h3>
          <li style={{ color: '#0073FF' }}>상품 관리 서비스 이용 가능</li>
          <li style={{ color: '#0073FF' }}>위험군 판단 서비스 이용 가능</li>
          <li style={{ color: '#DA3915' }}>채널별 분석 불가</li>
          <Btns>
            <LoginBtn variant="dark" type="landscape">
              신청
            </LoginBtn>
          </Btns>
        </Type>
      </Register>
      <Register>
        <img src={one} style={{ width: '100%', height: '65%', borderRadius: '14px' }} />
        <Type>
          <h3>[ 프리미엄 회원 ]</h3>
          <li style={{ color: '#0073FF' }}>상품 관리 서비스 이용 가능</li>
          <li style={{ color: '#0073FF' }}>위험군 판단 서비스 이용 가능</li>
          <li style={{ color: '#0073FF' }}>채널별 분석 서비스 이용 가능</li>
          <Btns>
            <LoginBtn variant="dark" type="landscape">
              신청
            </LoginBtn>
          </Btns>
        </Type>
      </Register>
      <p></p>
    </RegisterPage>
  );
}
const Title = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: #f6f2ef;
  width: 100%;
  height: 135px;
  border-radius: 0 0 10px 10px;
`;

const SubTitle = styled.div`
  display: grid;
  margin-top: 90px;
  font-size: 20px;
  font-family: 'GmarketSansMedium';
`;
const RegisterPage = styled.div`
  width: 100%;
  padding-top: 50px;
  height: 550px;
  display: grid;
  grid-template-columns: 0.4fr 2fr 2fr 2fr 0.4fr;
  column-gap: 15px;
`;
const Register = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 1px 3px -2px black;
`;
const Type = styled.div`
  position: absolute;
  display: grid;
  background-color: #fff;
  width: 310px;
  height: 190px;
  margin-top: -20px;
  z-index: 3;
  font-family: 'Pretendard';
`;

const Btns = styled.div`
  display: flex;
  width: 300px;
  margin-top: 10px;
  justify-content: center;
`;

export default MarketingRegister;
