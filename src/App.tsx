import React from 'react';
import './App.css';
import Header from './components/Header';
import { useMediaQuery } from 'react-responsive';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbtn from './components/common/Navbtn';
import ListingPage from './components/ListingPage';
import SellerMain from './components/Seller/SellerMain';
import ThreeplMain from './components/3pl/ThreeplMain';
import WMSMain from './components/WMS/WMSMain';
import CommonMain from './components/Auth/CommonMain';
import ShopingList from './components/shop/ShopingList';
import '../src/styles/font.css';

// 세로 모드
const TabletPortrait = ({ children }: any) => {
  const isTablet = useMediaQuery({ minWidth: 100, maxWidth: 900 });
  return isTablet ? children : null;
};

// 가로 모드  - 우선 순위
const TabletLandscape = ({ children }: any) => {
  const isTablet = useMediaQuery({ minWidth: 1000, maxWidth: 1700 });
  return isTablet ? children : null;
};

function App() {
  return (
    <div className="App">
      <TabletPortrait>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CommonMain />}></Route>
            <Route path="/3pl/*" element={<ThreeplMain type={'landscape'} />}></Route>
            <Route path="/seller/*" element={<SellerMain type={'landscape'} />}></Route>
            <Route path="/wms/*" element={<WMSMain type={'landscape'} />}></Route>
          </Routes>
        </BrowserRouter>
      </TabletPortrait>

      <TabletLandscape>
        <BrowserRouter>
          <Routes>
            <Route path="/shop/*" element={<ShopingList type={'landscape'} />}></Route>
            <Route path="/3pl/*" element={<ThreeplMain type={'landscape'} />}></Route>
            <Route path="/seller/*" element={<SellerMain type={'landscape'} />}></Route>
            <Route path="/wms/*" element={<WMSMain type={'landscape'} />}></Route>
            <Route path="/*" element={<CommonMain />}></Route>
          </Routes>
        </BrowserRouter>
      </TabletLandscape>
    </div>
  );
}

export default App;
