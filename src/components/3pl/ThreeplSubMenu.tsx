import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

interface ThreeplSubMenu {
  subMenuName: string;
  subMenuUrl: string;
}

function SubMenu(props: any) {
  const [subMenu, setSubMenu] = useState<ThreeplSubMenu[] | null>([]);
  const [menuOn, setMenuOn] = useState(false);

  useEffect(() => {
    switch (props.title) {
      case '상품관리':
        setMenuOn(false);
        break;
      case '발주관리':
        const blist = [
          { subMenuName: '발주 등록', subMenuUrl: '/3pl/order/register' },
          { subMenuName: '발주 내역', subMenuUrl: '/3pl/order/list' },
        ];
        setSubMenu(blist);
        setMenuOn(true);
        break;
      case '입고관리':
        const clist = [
          { subMenuName: '입고 예정', subMenuUrl: '/3pl/import/pre/list' },
          { subMenuName: '입고 내역', subMenuUrl: '/3pl/import/list' },
        ];
        setSubMenu(clist);
        setMenuOn(true);
        break;
      case '출고관리':
        setMenuOn(false);
        break;
      case '매칭서비스':
        setMenuOn(false);
        break;
      case '마이페이지':
        const elist = [
          { subMenuName: '회원정보관리', subMenuUrl: '/3pl/mypage' },
          { subMenuName: '화주사관리', subMenuUrl: '/3pl/mypage/seller/list' },
        ];
        setSubMenu(elist);
        setMenuOn(true);
        break;
    }
  }, [props.title]);

  function close() {
    console.log(menuOn);
    setMenuOn(false);
    stateChange();
  }

  function stateChange() {
    props.closeMenu();
  }

  return (
    <>
      {menuOn && (
        <SubMenuBar>
          {subMenu &&
            subMenu.map((item: ThreeplSubMenu, index: number) => {
              return (
                <Link to={item.subMenuUrl}>
                  <SubItem onClick={close}>{item.subMenuName}</SubItem>
                </Link>
              );
            })}
        </SubMenuBar>
      )}
    </>
  );
}

const SubMenuBar = styled.div`
  margin-top: 10px;
  display: grid;
  width: fit-content;
  background-color: #fff;
  border: 2px solid black;
  border-radius: 15px;
  padding: 5px;
  justify-items: start;
`;
const SubItem = styled.button`
  margin-left: 20px;
  font-family: Dotum_Bold;
  font-size: 14px;
  font-weight: 800;
  border: none;
  color: black;
  background-color: transparent;
  margin: 5px;
`;

export default SubMenu;
