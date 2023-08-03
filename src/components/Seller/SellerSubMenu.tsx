import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import SubMenu from '../common/SubMenu';
import { Link } from 'react-router-dom';

interface SellerSubMenu {
  subMenuName: string;
  subMenuUrl: string;
}

function SellerSubMenu(props: any) {
  const [subMenu, setSubMenu] = useState<SellerSubMenu[] | null>([]);
  const [menuOn, setMenuOn] = useState(false);

  const [page, setPage] = useState('');

  function sub_menu(props: string) {
    console.log(props);
    // axios만 들기
  }

  useEffect(() => {
    switch (props.title) {
      case '상품관리':
        setMenuOn(false);
        break;
      case '발주관리':
        setMenuOn(false);
        break;
      case '입출고관리':
        const clist = [
          { subMenuName: '입고 등록', subMenuUrl: '/seller/product/list' },
          { subMenuName: '입고 예정', subMenuUrl: '/seller/product/list' },
          { subMenuName: '입고 내역', subMenuUrl: '/seller/product/list' },
          { subMenuName: '출고', subMenuUrl: '/seller/product/list' },
        ];

        setSubMenu(clist);
        setMenuOn(true);
        break;
      case '매칭서비스':
        setMenuOn(false);
        break;
      case '마케팅솔루션':
        const dlist = [
          { subMenuName: '신청', subMenuUrl: '/seller/product/list' },
          { subMenuName: '상품관리', subMenuUrl: '/seller/product/list' },
          { subMenuName: '위험군 판단', subMenuUrl: '/seller/product/list' },
          { subMenuName: '채널별 분석', subMenuUrl: '/seller/product/list' },
        ];
        setSubMenu(dlist);
        setMenuOn(true);
        break;
      case '마이페이지':
        setMenuOn(false);
        break;
    }
  }, [props.title]);

  return (
    <>
      {menuOn && (
        <SubMenuBar>
          {subMenu &&
            subMenu.map((item: SellerSubMenu, index: number) => {
              return (
                <Link to={item.subMenuUrl}>
                  <SubItem>{item.subMenuName}</SubItem>
                </Link>
              );
            })}
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
  font-family: Dotum_Bold;
  font-size: 16px;
  font-weight: 800;
  border: none;
  color: black;
  background-color: transparent;
  margin-top: 10px;
  z-index: 50;
`;

export default SellerSubMenu;
