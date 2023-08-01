import React from 'react';
import Header from './ThreeplHeader';
import Threepl_ProductList from './Threepl_ProductList';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

function ThreeplMain(props: any) {
  function StyleType(style: any) {
    if (style == 'portrait') {
      return 'portrait';
    } else {
      return 'landscape';
    }
  }

  return (
    <>
      <Header type={StyleType(props.type)} />
      <Routes>
        <Route path="/product/list" element={<Threepl_ProductList />}></Route>{' '}
      </Routes>
    </>
  );
}

export default ThreeplMain;
