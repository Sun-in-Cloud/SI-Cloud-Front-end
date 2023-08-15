import React, { useEffect, useState } from 'react';
import HeaderMenu from '../common/HeaderMenu';
import { styled } from 'styled-components';
import line from '../../img/line.svg';
import logo from '../../img/s.png';
import { Link } from 'react-router-dom';

function WMSHeader(props: any) {
  const [tab, setTab] = useState<string>('curr');
  const style = String(props.type);
  function StyleType(style: any) {
    if (style == 'portrait') {
      return 'portrait';
    } else {
      return 'landscape';
    }
  }

  function onChangeMenu(e: React.MouseEvent<HTMLButtonElement> | undefined): void {
    if (e != undefined) {
      setTab(e.currentTarget.value);
    }
  }

  useEffect(() => {}, [style, tab]);
  return (
    <Headers>
      <HeaderBar>
        <p></p>
        <HeaderLogo>
          <Link to="/wms">
            <img src={logo} style={{ width: `${StyleType(style) === 'portrait' ? '90px' : '100px'}` }} />
          </Link>
        </HeaderLogo>
        <MenuTab>
          <HeaderMenu
            type={StyleType(style)}
            onClick={onChangeMenu}
            value="화주사 관리"
            bg={`${tab === '화주사 관리' ? 'active' : 'none'}`}
          >
            <Link to="seller/list" style={{ textDecoration: 'none', color: 'black' }}>
              화주사 관리
            </Link>
          </HeaderMenu>

          <HeaderMenu
            type={StyleType(style)}
            onClick={onChangeMenu}
            value="3PL 관리"
            bg={`${tab === '3PL 관리' ? 'active' : 'none'}`}
          >
            <Link to="3pl/list" style={{ textDecoration: 'none', color: 'black' }}>
              3PL 관리
            </Link>
          </HeaderMenu>
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

const HeaderLogo = styled.div`
  margin-top: -9px;
  display: flex;
  justify-items: center;
  z-index: 0;
`;

const MenuTab = styled.div`
  margin-top: 15px;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
  z-index: 2;
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
export default WMSHeader;
