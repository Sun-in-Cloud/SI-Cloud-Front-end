import React from 'react';
import Sidebar from './Sidebar';
import ListingPage from '../ListingPage';
import { styled } from 'styled-components';

function Threepl_ProductList() {
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
  return (
    <MainPage>
      <h1>상품목록조회</h1>
      <Sidebar company={com} />
      <ListingPage />
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
