import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import ListingPage from '../ListingPage';
import { styled } from 'styled-components';
import { Location, useLocation } from 'react-router-dom';

function Threepl_ProductList(props: any) {
  const com: string[] = [
    '성은이네 옷장',
    '유진 아이스크림',
    '성은 케이크',
    '성은이네 옷장',
    '유진 아이스크림',
    '성은 케이크',
    '성은이네 옷장',
    '유진 아이스크림',
  ];

  const location: Location = useLocation();

  const [seller, setSeller] = useState('');

  function findSeller(new_seller: any): void {
    setSeller(new_seller.item);
    console.log(seller);
  }

  function submenu(location: Location) {
    if (location.pathname.includes('/3pl/product')) {
      return <Sidebar company={com} findSeller={findSeller} />;
    }
  }

  useEffect(() => {}, [seller]);

  return (
    <MainPage>
      <h1>상품목록조회</h1>
      {submenu(location)}
      <ListingPage sellerName={seller} />
      <h1></h1>
    </MainPage>
  );
}

const MainPage = styled.div`
  margin-top: -40px;
  display: grid;
  grid-template-columns: 0.5fr 1.6fr 5fr 0.5fr;
  grid-template-areas: '. . ListingPage .';
`;

export default Threepl_ProductList;
