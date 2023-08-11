import React, { useEffect, useState } from 'react';
import HeaderMenu from '../common/HeaderMenu';
import { styled } from 'styled-components';
import line from '../../img/line.svg';
import logo from '../../img/logo.svg';
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
      console.log(e.currentTarget.value);
      setTab(e.currentTarget.value);
    }
  }

  useEffect(() => {}, [style, tab]);
  return (
    <Headers>
      <HeaderBar>
        <p></p>
        <MenuTab>
          <h1></h1>
          <h1></h1>
          <Link to="seller/list" style={{ textDecoration: 'none' }}>
            <HeaderMenu
              type={StyleType(style)}
              onClick={onChangeMenu}
              value="화주사 관리"
              bg={`${tab === '화주사 관리' ? 'active' : 'none'}`}
            >
              화주사 관리
            </HeaderMenu>
          </Link>
          <Link to="3pl/list" style={{ textDecoration: 'none' }}>
            <HeaderMenu
              type={StyleType(style)}
              onClick={onChangeMenu}
              value="3PL 관리"
              bg={`${tab === '3PL 관리' ? 'active' : 'none'}`}
            >
              3PL 관리
            </HeaderMenu>
          </Link>
        </MenuTab>
        <HeaderImages>
          <img
            src={logo}
            style={{ width: `${StyleType(style) === 'portrait' ? '150px' : '70%'}`, marginTop: '-20px' }}
          />
          <img src={line} style={{ width: `${StyleType(style) === 'portrait' ? '260px' : '100%'}` }} />
          <img src={line} style={{ width: `${StyleType(style) === 'portrait' ? '260px' : '100%'}`, zIndex: '-1' }} />

          <img src={line} style={{ width: `${StyleType(style) === 'portrait' ? '260px' : '100%'}`, zIndex: '-1' }} />
          <img src={line} style={{ width: `${StyleType(style) === 'portrait' ? '260px' : '100%'}` }} />
        </HeaderImages>
      </HeaderBar>
    </Headers>
  );
}
const HeaderBar = styled.div`
  height: 10%;
  background: '#FCF9ED';
  display: grid;
  align-items: center;
  grid-template-rows: 30px 40px 30px 0px;
  padding: 4%;
`;

const MenuTab = styled.div`
  display: grid;
  // align-items: center;
  // justify-items: center;
  width: 100%;
  grid-template-columns: 100px 110px 1.3fr 1.3fr 1.5fr 1.5fr 1.5fr;
  z-index: 2;
`;

const Loginbtns = styled.div`
  display: flex;
  justify-content: flex-end;
  z-index: 1;
`;

const HeaderImages = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  z-index: 0;
`;

const Headers = styled.div`
  width: 100%;
  background-color: #fcf9ed;
  display: flex;
`;
export default WMSHeader;
