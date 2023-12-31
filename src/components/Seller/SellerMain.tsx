import React, { Suspense } from 'react';
import SellerHeader from './SellerHeader';
import { Route, Router, Routes } from 'react-router-dom';
import SellerProductList from './product/SellerProductList';
import SellerProductDetail from './product/SellerProductDetail';
import SellerProductRegister from './product/SellerProductRegister';
import SellerOrderList from './order/SellerOrderList';
import SellerImportList from './import/SellerImportList';
import SellerExportList from './export/SellerExportList';
import SellerImportPre from './import/SellerImportPre';
import SellerImportFixedList from './import/SellerImportFixedList';
import DetailExport from './export/SellerDetailExport';
import SellerDetailExport from './export/SellerDetailExport';
import SellerMatchList from './match/SellerMatchList';

import MarketingMain from './marketing/MarketingMain';
import SellerMainPage from './SellerMainPage';
import MarketingRegister from './marketing/MarketingRegister';
import MarketingProductManage from './marketing/MarketingProductManage';
import MarketingStatistics from './marketing/MarketingStatistics';
import MarketingDanger from './marketing/MarketingDanger';
import MarketingChannel from './marketing/MarketingChannel';
import { styled } from 'styled-components';
import SellerMyPage from './my/SellerMyPage';

function SellerMain(props: any) {
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
      <SellerHeader type={StyleType(style)} />
      <Body>
        <Routes>
          {/* 상품 */}
          <Route path="/product" element={<SellerProductList type={StyleType(style)} />}></Route>
          <Route path="/product/register" element={<SellerProductRegister type={StyleType(style)} />}></Route>
          <Route path="/product/*" element={<SellerProductDetail type={StyleType(style)} />}></Route>
          {/* 발주 */}
          <Route path="/order/list" element={<SellerOrderList type={'landscape'} />}></Route>
          {/* 입고 */}
          {/* 입고 예정리스트 조회 - 화주사 확정 */}
          <Route path="/import/pre/list" element={<SellerImportFixedList type={'landscape'} />}></Route>
          {/* 입고 등록 */}
          <Route path="/import/pre/*" element={<SellerImportPre type={'landscape'} />}></Route>
          {/* 입고 확정 - 3PL확정 */}
          <Route path="/import/list" element={<SellerImportList type={'landscape'} />}></Route>
          {/* 출고 */}
          <Route path="/export/list" element={<SellerExportList type={'landscape'} />}></Route>
          <Route path="/export/*" element={<SellerDetailExport type={'landscape'} />}></Route>
          {/* 매칭 */}
          <Route path="/match/*" element={<SellerMatchList type={'landscape'} />}></Route>
          {/* 마이페이지 */}
          <Route path="/mypage" element={<SellerMyPage type={'landscape'} />}></Route>
          {/* 마케팅 */}
          <Route path="/marketing" element={<MarketingRegister type={'landscape'} />}></Route>
          <Route path="/marketing/statistics" element={<MarketingStatistics type={'landscape'} />}></Route>
          <Route path="/marketing/product" element={<MarketingProductManage type={'landscape'} />}></Route>
          <Route path="/marketing/danger" element={<MarketingDanger type={'landscape'} />}></Route>
          <Route path="/marketing/channel" element={<MarketingChannel type={'landscape'} />}></Route>
          {/* 쇼핑몰 */}
          <Route path="/shop" element={<SellerProductList type={'landscape'} />}></Route>

          <Route path="*" element={<SellerMainPage type={StyleType(style)} />}></Route>
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

export default SellerMain;
