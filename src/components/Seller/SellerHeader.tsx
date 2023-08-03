import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import LoginBtn from '../common/Loginbtn';
import HeaderMenu from '../common/HeaderMenu';
import SubMenu from '../common/SubMenu';
import line from '../../img/line.svg';
import logo from '../../img/logo.svg';
import SellerSubMenu from './SellerSubMenu';
import { Link } from 'react-router-dom';

function SellerHeader(type: any) {
  const [tab, setTab] = useState<string>('curr');
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
        <MenuTab>
          <Link to="/seller/product" style={{ textDecoration: 'none' }}>
            <HeaderMenu
              type={StyleType(style)}
              onClick={onChangeMenu}
              value="상품관리"
              bg={`${tab === '상품관리' ? 'active' : 'none'}`}
            >
              상품관리
            </HeaderMenu>
          </Link>
          <Link to="/seller/order/list" style={{ textDecoration: 'none' }}>
            <HeaderMenu
              type={StyleType(style)}
              onClick={onChangeMenu}
              value="발주관리"
              bg={`${tab === '발주관리' ? 'active' : 'none'}`}
            >
              발주관리
            </HeaderMenu>
          </Link>
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
          <Link to="/seller/match/list" style={{ textDecoration: 'none' }}>
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
            value="마케팅솔루션"
            bg={`${tab === '마케팅솔루션' ? 'active' : 'none'}`}
          >
            마케팅솔루션
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
        <SellerSubMenu title={tab} />
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
  grid-template-rows: 30px 40px 30px 0px;
  padding: 4%;
`;

const MenuTab = styled.div`
  display: grid;
  // align-items: center;
  // justify-items: center;
  width: 100%;
  grid-template-columns: 1.3fr 1.3fr 1.5fr 100px 110px 1.5fr 1.5fr 1.5fr;
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

export default SellerHeader;
