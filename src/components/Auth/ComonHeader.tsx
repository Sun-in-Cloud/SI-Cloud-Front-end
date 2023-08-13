import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import HeaderMenu from '../common/HeaderMenu';
import SellerSubMenu from '../Seller/SellerSubMenu';
import logo from '../../img/s.png';

function ComonHeader(type: any) {
  const [tab, setTab] = useState<string>('curr');
  const [openSub, setOpenSub] = useState<boolean>();
  const style = String(type.type);

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

  function closeMenu() {
    setTab('curr');
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
            </LoginBtn> // 옮기기로 했음
          </Loginbtns> */}
        <p></p>
        <HeaderLogo>
          <Link to="/">
            <img src={logo} style={{ width: `${StyleType(style) === 'portrait' ? '90px' : '100px'}` }} />
          </Link>
        </HeaderLogo>
        <MenuTab>
          <p></p>
          <p></p>
          <p></p>
          <HeaderMenu
            type={StyleType(style)}
            onClick={onChangeMenu}
            value="로그인"
            bg={`${tab === '로그인' ? 'active' : 'none'}`}
          >
            <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
              로그인
            </Link>
          </HeaderMenu>

          <HeaderMenu
            type={StyleType(style)}
            onClick={onChangeMenu}
            value="3pl회원가입"
            bg={`${tab === '3pl회원가입' ? 'active' : 'none'}`}
          >
            <Link to="/threepl/register" style={{ textDecoration: 'none', color: 'black' }}>
              3PL - 회원가입
            </Link>
          </HeaderMenu>

          <HeaderMenu
            type={StyleType(style)}
            onClick={onChangeMenu}
            value="seller회원가입"
            bg={`${tab === 'seller회원가입' ? 'active' : 'none'}`}
          >
            <Link to="/selle/register" style={{ textDecoration: 'none', color: 'black' }}>
              판매자 - 회원가입
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

const MenuTab = styled.div`
  margin-top: 15px;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1.5fr 1.5fr 2fr 1.8fr 3fr 3fr;
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
export default ComonHeader;
