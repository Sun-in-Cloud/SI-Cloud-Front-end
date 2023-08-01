import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

function SubMenu(props: any) {
  console.log(props.title);
  const [subMenu, setSubMenu] = useState(['']);
  const [menuOn, setMenuOn] = useState(false);

  useEffect(() => {
    switch (props.title) {
      case '상품관리':
        const alist = ['상품등록', '상품조회'];
        setSubMenu(alist);
        setMenuOn(true);
        break;
      case '발주관리':
        setMenuOn(false);
        break;
      case '입출고관리':
        const clist = ['입고', '출고'];
        setSubMenu(clist);
        setMenuOn(true);
        break;
    }
  }, [props.title]);
  return (
    <>
      {menuOn && (
        <SubMenuBar>
          {' '}
          <SubItem>{subMenu}</SubItem>
        </SubMenuBar>
      )}
    </>
  );
}

const SubMenuBar = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 50px;
  z-index: 100;
  border-radius: 10px;
  background: #ffe9a9;
  opacity: 90%;
`;
const SubItem = styled.button`
  margin-left: 20px;
  font-family: Jalnan;
  font-size: 14px;
  border: none;
  color: black;
  background-color: transparent;
`;

export default SubMenu;
