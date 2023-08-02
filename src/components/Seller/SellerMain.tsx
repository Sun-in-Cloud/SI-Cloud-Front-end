import React from 'react';
import SellerHeader from './SellerHeader';
import { Route, Router, Routes } from 'react-router-dom';
import LandscapeMain from '../LandscapeMain';
import SellerProductList from './SellerProductList';

function SellerMain(props: any) {
  const style = String(props.type);
  console.log(style);

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
      <Routes>
        {/* 상품 */}
        <Route path="/product/*" element={<SellerProductList type={StyleType(style)} />}></Route>
        {/* 발주 */}
        <Route path="/order" element={<SellerProductList type={'landscape'} />}></Route>
        <Route path="/order/list" element={<SellerProductList type={'landscape'} />}></Route>
        {/* 입고 */}
        <Route path="/import" element={<SellerProductList type={'landscape'} />}></Route>
        <Route path="/import/pre" element={<SellerProductList type={'landscape'} />}></Route>
        <Route path="/import/pre/list" element={<SellerProductList type={'landscape'} />}></Route>
        <Route path="/import/pre/register" element={<SellerProductList type={'landscape'} />}></Route>
        <Route path="/import/search" element={<SellerProductList type={'landscape'} />}></Route>
        <Route path="/import/list" element={<SellerProductList type={'landscape'} />}></Route>
        {/* 출고 */}
        <Route path="/export" element={<SellerProductList type={'landscape'} />}></Route>
        <Route path="/export/list" element={<SellerProductList type={'landscape'} />}></Route>
        {/* 매칭 */}
        <Route path="/match" element={<SellerProductList type={'landscape'} />}></Route>
        <Route path="/match/list" element={<SellerProductList type={'landscape'} />}></Route>
        {/* 마이페이지 */}
        <Route path="/mypage" element={<SellerProductList type={'landscape'} />}></Route>
        {/* 마케팅 */}
        <Route path="/marketing" element={<SellerProductList type={'landscape'} />}></Route>
        <Route path="/marketing/search" element={<SellerProductList type={'landscape'} />}></Route>
        <Route path="/marketing/product" element={<SellerProductList type={'landscape'} />}></Route>
        <Route path="/marketing/danger" element={<SellerProductList type={'landscape'} />}></Route>
        <Route path="/marketing/channel" element={<SellerProductList type={'landscape'} />}></Route>
        {/* 쇼핑몰 */}
        <Route path="/shop" element={<SellerProductList type={'landscape'} />}></Route>
      </Routes>
    </>
  );
}

export default SellerMain;
