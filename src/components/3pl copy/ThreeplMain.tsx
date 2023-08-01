import React from 'react';
import Header from '../Header';
import Sidebar from '../3pl/Sidebar';
import ListingPage from '../ListingPage';
import { styled } from 'styled-components';

function ThreeplMain(props: any) {
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
  function StyleType(style: any) {
    if (style == 'portrait') {
      return 'portrait';
    } else {
      return 'landscape';
    }
  }
  return (
    <>
      <Header type={StyleType(props.type)} />
      <MainPage>
        <h1></h1>
        <Sidebar company={com} />
        <ListingPage />
        <h1></h1>
      </MainPage>
    </>
  );
}

const MainPage = styled.div`
  margin-top: -40px;
  display: grid;
  grid-template-columns: 0.5fr 1.6fr 5fr 0.5fr;
  grid-template-areas: '. . ListingPage .';
`;

export default ThreeplMain;
