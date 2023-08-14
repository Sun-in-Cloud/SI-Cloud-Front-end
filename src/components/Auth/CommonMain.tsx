import React from 'react';
import ComonHeader from './ComonHeader';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import SellerRegister from './SellerRegister';
import ThreePlRegister from './ThreePLRegister';
import SellerMainPage from '../Seller/SellerMainPage';
import { styled } from 'styled-components';

function CommonMain(props: any) {
  const style = String(props.type);

  function StyleType(style: any) {
    if (style == 'portrait') {
      return 'portrait';
    } else {
      return 'landscape';
    }
  }

  return (
    <>
      <ComonHeader />
      <Body>
        <Routes>
          <Route path="/login" element={<Login type={StyleType(style)} />}></Route>
          <Route path="/selle/register" element={<SellerRegister type={StyleType(style)} />}></Route>
          <Route path="/threepl/register" element={<ThreePlRegister type={StyleType(style)} />}></Route>
          {/* <Route path="*" element={<SellerMainPage type={StyleType(style)} />}></Route> */}
        </Routes>
      </Body>
    </>
  );
}
const Body = styled.div`
  margin-top: 95px;
  width: 100%;
  height: 630px;
`;
export default CommonMain;
