import React, { useEffect, useState } from 'react';
import LoginBtn from '../common/Loginbtn';
import styled from 'styled-components';
import line from '../../img/line.svg';
import logo from '../../img/logo.svg';
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

  useEffect(() => {}, [style, tab]);

  return (
    <Headers>
      <HeaderBar>
        {/* <Loginbtns>
          <LoginBtn variant="secondary" type={StyleType(style)}>
            로그인
          </LoginBtn>
          <LoginBtn variant="primary" type={StyleType(style)}>
            로그아웃
          </LoginBtn>
        </Loginbtns> */}
        <p></p>
        <MenuTab>
          <Link to="/3pl/product/list" style={{ textDecoration: 'none' }}>
            <HeaderMenu
              type={StyleType(style)}
              onClick={onChangeMenu}
              value="상품관리"
              bg={`${tab === '상품관리' ? 'active' : 'none'}`}
            >
              상품관리
            </HeaderMenu>
          </Link>
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
            value="입출고관리"
            bg={`${tab === '입출고관리' ? 'active' : 'none'}`}
          >
            입출고 관리
          </HeaderMenu>
          <h1></h1>
          <h1></h1>

          <Link to="/3pl/match/list" style={{ textDecoration: 'none' }}>
            <HeaderMenu
              type={StyleType(style)}
              onClick={onChangeMenu}
              value="매칭서비스"
              bg={`${tab === '매칭서비스' ? 'active' : 'none'}`}
            >
              매칭서비스
            </HeaderMenu>
          </Link>
          <HeaderMenu
            type={StyleType(style)}
            onClick={onChangeMenu}
            value="마이페이지"
            bg={`${tab === '마이페이지' ? 'active' : 'none'}`}
          >
            마이페이지
          </HeaderMenu>
        </MenuTab>
        <SubMenu title={tab} />
        <HeaderImages>
          <img src={line} style={{ width: `${StyleType(style) === 'portrait' ? '260px' : '100%'}` }} />
          <img src={line} style={{ width: `${StyleType(style) === 'portrait' ? '260px' : '100%'}`, zIndex: '-1' }} />
          <img
            src={logo}
            style={{ width: `${StyleType(style) === 'portrait' ? '150px' : '70%'}`, marginTop: '-20px' }}
          />
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
  grid-template-rows: 30px 30px 30px 50px;
  padding: 4%;
`;

const MenuTab = styled.div`
  display: grid;
  // align-items: center;
  // justify-items: center;
  width: 100%;
  grid-template-columns: 1.3fr 1.3fr 1.5fr 150px 30px 1.5fr 1.5fr;
  z-index: 2;
  text-decoration: none;
`;

const Loginbtns = styled.div`
  display: flex;
  justify-content: flex-end;
  z-index: 1;
`;

const HeaderImages = styled.div`
  display: grid;
  bottom: 20;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  z-index: 0;
`;

const Headers = styled.div`
  width: 100%;
  background-color: #fcf9ed;
  display: flex;
`;
//overflow : hidden

export default Header;
