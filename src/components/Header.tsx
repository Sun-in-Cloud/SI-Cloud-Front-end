import React from 'react';
import LoginBtn from './common/Loginbtn';

function Header() {
  return (
    <div>
      <h1></h1>
      <LoginBtn variant="secondary">로그인</LoginBtn>
      <LoginBtn variant="primary">로그아웃</LoginBtn>
    </div>
  );
}

export default Header;
