import React, { useEffect, useState } from 'react';
import LoginBtn from './common/Loginbtn';
import styled from 'styled-components';
import line from '../img/line.svg';
import logo from '../img/logo.svg';
import HeaderMenu from './common/HeaderMenu';

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
        <MenuTab>
          <HeaderMenu
            type={StyleType(style)}
            onClick={onChangeMenu}
            value="상품관리"
            bg={`${tab === '상품관리' ? 'active' : 'none'}`}
          >
            상품관리
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
            value="입출고관리"
            bg={`${tab === '입출고관리' ? 'active' : 'none'}`}
          >
            입출고 관리
          </HeaderMenu>
          <HeaderMenu
            type={StyleType(style)}
            onClick={onChangeMenu}
            value="매칭서비스"
            bg={`${tab === '매칭서비스' ? 'active' : 'none'}`}
          >
            매칭서비스
          </HeaderMenu>
          <HeaderMenu
            type={StyleType(style)}
            onClick={onChangeMenu}
            value="마이페이지"
            bg={`${tab === '마이페이지' ? 'active' : 'none'}`}
          >
            마이페이지
          </HeaderMenu>
        </MenuTab>

        <Loginbtns>
          <LoginBtn variant="secondary" type={StyleType(style)}>
            로그인
          </LoginBtn>
          <LoginBtn variant="primary" type={StyleType(style)}>
            로그아웃
          </LoginBtn>
        </Loginbtns>
        <HeaderImages>
          <img src={line} />
          <img src={logo} style={{ width: '80%' }} />
          <img src={line} />
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
  grid-template-rows: 60px 20px 60px;
  padding: 4%;
`;

const MenuTab = styled.div`
  display: grid;
  width: max-width;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  z-index: 2;
`;

const Loginbtns = styled.div`
  display: flex;
  justify-content: flex-end;
  z-index: 1;
`;

const HeaderImages = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  z-index: 0;
`;

const Headers = styled.div`
  width: 100%;
  background-color: #fcf9ed;
`;

export default Header;
