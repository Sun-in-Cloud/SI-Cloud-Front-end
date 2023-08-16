import React from 'react';
import WMSHeader from './WMSHeader';
import { Route, Routes } from 'react-router';
import WMS_SellerList from './page/WMS_SellerList';
import { styled } from 'styled-components';
import WMS_Detail from './page/WMS_Detail';
import WMS_3plList from './page/WMS_3plList';

function WMSMain(props: any) {
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
      <WMSHeader type={StyleType(style)} />
      <MainPage>
        <h1></h1>
        <Routes>
          <Route path="/seller/list" element={<WMS_SellerList type={StyleType(style)} />}></Route>
          <Route path="/3pl/list" element={<WMS_3plList type={StyleType(style)} />}></Route>
          <Route path="/seller/*" element={<WMS_Detail type={StyleType(style)} />}></Route>
          <Route path="/3pl/*" element={<WMS_Detail type={StyleType(style)} />}></Route>
        </Routes>
        <h1></h1>
      </MainPage>
    </>
  );
}
const MainPage = styled.div`
  height: 630px;
  margin-top: 100px;
  display: grid;
  grid-template-columns: 0.5fr 5fr 0.5fr;
  grid-template-areas: '. Routes .';
`;

export default WMSMain;
