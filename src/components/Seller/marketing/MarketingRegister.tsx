import React from 'react';
import { styled } from 'styled-components';
import one from '../../../img/registerImg/1.jpg';
import LoginBtn from '../../common/Loginbtn';

function MarketingRegister(props: any) {
  return (
    <RegisterPage>
      <p></p>
      <Register>
        <img src={one} style={{ width: '100%', height: '65%', borderRadius: '14px' }} />
        <Type>
          <h3>[ 기본 회원 ]</h3>
          <li style={{ color: '#0073FF' }}>상품관리 서비스 이용 가능</li>
          <li style={{ color: '#DA3915' }}>위험군 판단 불가</li>
          <li style={{ color: '#DA3915' }}>채널별 분석 불가</li>
          <Btns>
            <LoginBtn variant="primary" type="landscape">
              신청하기
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
            <LoginBtn variant="primary" type="landscape">
              신청하기
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
            <LoginBtn variant="primary" type="landscape">
              신청하기
            </LoginBtn>
          </Btns>
        </Type>
      </Register>
      <p></p>
    </RegisterPage>
  );
}
const RegisterPage = styled.div`
  margin-top: -20px;
  width: 100%;
  height: 550px;
  display: grid;
  grid-template-columns: 0.7fr 2fr 2fr 2fr 0.7fr;
`;
const Register = styled.div`
  background: #fff;
  margin: 15px;
  border-radius: 14px;
  box-shadow: 0 1px 3px -2px black;
`;
const Type = styled.div`
  position: absolute;
  display: grid;
  background-color: #fff;
  width: 301px;
  height: 190px;
  margin-top: -20px;
  z-index: 3;
  font-family: 'Jalnan';
`;

const Btns = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5px 20px;
`;

export default MarketingRegister;
