import React from 'react';
import './App.css';
import Header from './components/Header';
import { useMediaQuery } from 'react-responsive';

// 세로 모드
const TabletPortrait = ({ children }: any) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 999 });
  return isTablet ? children : null;
};

// 가로 모드  - 우선 순위
const TabletLandscape = ({ children }: any) => {
  const isTablet = useMediaQuery({ minWidth: 1000, maxWidth: 1200 });
  return isTablet ? children : null;
};

function App() {
  return (
    <div className="App">
      <TabletPortrait>
        <Header type="portrait" />
      </TabletPortrait>

      <TabletLandscape>
        <Header type="landscape" />
      </TabletLandscape>
    </div>
  );
}

export default App;
