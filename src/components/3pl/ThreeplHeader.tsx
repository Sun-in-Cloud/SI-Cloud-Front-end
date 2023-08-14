import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../../img/s.png';
import HeaderMenu from '../common/HeaderMenu';
import SubMenu from './ThreeplSubMenu';
import { Link } from 'react-router-dom';

function Header(type: any) {
  const [tab, setTab] = useState<string>('curr');

  const style = String(type.type);
  console.log(style);

  function StyleType(style: any) {
    if (style == 'portrait') {
      return 'portrait';
    } else {
      return 'landscape';
    }
  }

  function onChangeMenu(e: React.MouseEvent<HTMLButtonElement> | undefined) {
    if (e != undefined) {
      console.log(e.currentTarget.value);
      setTab(e.currentTarget.value);
    }
  }

  function closeMenu() {
    setTab('curr');
  }

  useEffect(() => {}, [style, tab]);

  return (
    <Headers>
      <HeaderBar>
        <p></p>
        <HeaderLogo>
          <Link to="/3pl">
            <img src={logo} style={{ width: `${StyleType(style) === 'portrait' ? '90px' : '100px'}` }} />
          </Link>
        </HeaderLogo>
        <MenuTab>
          <HeaderMenu
            type={StyleType(style)}
            onClick={onChangeMenu}
            value="상품관리"
            bg={`${tab === '상품관리' ? 'active' : 'none'}`}
          >
            <Link to="/3pl/product/list" style={{ textDecoration: 'none', color: 'black' }}>
              상품관리
            </Link>
          </HeaderMenu>

          <HeaderMenu
            type={StyleType(style)}
            onClick={onChangeMenu}
            value="발주관리"
            bg={`${tab === '발주관리' ? 'active' : 'none'}`}
          >
            발주관리
          </HeaderMenu>

          <HeaderMenu
            type={StyleType(style)}
            onClick={onChangeMenu}
            value="입고관리"
            bg={`${tab === '입고관리' ? 'active' : 'none'}`}
          >
            입고관리
          </HeaderMenu>

          <HeaderMenu
            type={StyleType(style)}
            onClick={onChangeMenu}
            value="출고관리"
            bg={`${tab === '출고관리' ? 'active' : 'none'}`}
          >
            <Link to="/3pl/export/list" style={{ textDecoration: 'none', color: 'black' }}>
              출고관리
            </Link>
          </HeaderMenu>

          <HeaderMenu
            type={StyleType(style)}
            onClick={onChangeMenu}
            value="매칭서비스"
            bg={`${tab === '매칭서비스' ? 'active' : 'none'}`}
          >
            <Link to="/3pl/match/list" style={{ textDecoration: 'none', color: 'black' }}>
              매칭서비스
            </Link>
          </HeaderMenu>

          <HeaderMenu
            type={StyleType(style)}
            onClick={onChangeMenu}
            value="마이페이지"
            bg={`${tab === '마이페이지' ? 'active' : 'none'}`}
          >
            마이페이지
          </HeaderMenu>
          <p></p>
          {tab === '발주관리' ? <SubMenu title={tab} closeMenu={closeMenu} /> : <p></p>}
          {tab === '입고관리' ? <SubMenu title={tab} closeMenu={closeMenu} /> : <p></p>}
          <p></p>
          <p></p>
          {tab === '마이페이지' ? <SubMenu title={tab} closeMenu={closeMenu} /> : ''}
        </MenuTab>
      </HeaderBar>
    </Headers>
  );
}

const HeaderBar = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.3fr 1.5fr 12fr 0.5fr;
`;

const MenuTab = styled.div`
  margin-top: 15px;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1.5fr 1.5fr 2fr 1.8fr 2fr 2fr;
  z-index: 2;
`;

const Loginbtns = styled.div`
  display: flex;
  justify-content: flex-end;
  z-index: 1;
`;

const HeaderLogo = styled.div`
  margin-top: -9px;
  display: flex;
  justify-items: center;
  z-index: 0;
`;

const Headers = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: grid;
  padding: 20px 10px;
  background-color: 'transparent';
  height: 60px;
  z-index: 10;
`;

export default Header;
