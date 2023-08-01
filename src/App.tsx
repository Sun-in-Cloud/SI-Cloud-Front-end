import React from 'react';
import './App.css';
import Header from './components/Header';
import { useMediaQuery } from 'react-responsive';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbtn from './components/common/Navbtn';
import ListingPage from './components/ListingPage';
import LandscapeMain from './components/LandscapeMain';
import ThreeplMain from './components/3pl/ThreeplMain';

// 세로 모드
const TabletPortrait = ({ children }: any) => {
  const isTablet = useMediaQuery({ minWidth: 700, maxWidth: 900 });
  return isTablet ? children : null;
};

// 가로 모드  - 우선 순위
const TabletLandscape = ({ children }: any) => {
  const isTablet = useMediaQuery({ minWidth: 1000, maxWidth: 1500 });
  return isTablet ? children : null;
};

function App() {
  return (
    <div className="App">
      <TabletPortrait>
        <Header type="portrait" />
        <ListingPage />
      </TabletPortrait>

      <TabletLandscape>
        <BrowserRouter>
          <Routes>
            <Route path="/ex" element={<LandscapeMain />}></Route>
            <Route path="/seller" element={<LandscapeMain />}></Route>
            <Route path="/3pl/*" element={<ThreeplMain type="landscape" />}></Route>
          </Routes>
        </BrowserRouter>
      </TabletLandscape>
    </div>
  );
}

export default App;
