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
  return (
    <>
      {menuOn && (
        <SubMenuBar>
          {subMenu &&
            subMenu.map((item: ThreeplSubMenu, index: number) => (
              <Link to={item.subMenuUrl}>
                <SubItem key={index}>{item.subMenuName}</SubItem>
              </Link>
            ))}
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
  background: #d9eaff;
  opacity: 90%;
`;
const SubItem = styled.button`
  margin-left: 20px;
  font-family: Jalnan;
  font-size: 14px;
  border: none;
  color: black;
  background-color: transparent;
  margin-top: 10px;
`;

export default SubMenu;
