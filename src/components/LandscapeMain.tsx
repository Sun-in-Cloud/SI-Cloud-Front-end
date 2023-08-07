import React from 'react';
import Header from './Header';
import ListingPage from './ListingPage';
import { styled } from 'styled-components';
import Sidebar from './3pl/Sidebar';

function LandscapeMain(props: any) {
  const com: string[] = ['성은이네 옷장', '유진 아이스크림', '성은 케이크'];

  function StyleType(style: any) {
    if (style == 'portrait') {
      return 'portrait';
    } else {
      return 'landscape';
    }
  }

  const titles: string[] = ['바코드 번호', '상품군', '상품명', '안전재고', '현재재고'];
  const paging: number = 6; // for문이 안돌아.. 다른 방법 찾겠숨..
  const rows = [
    ['0101010', '바지', '귀여운 핑크바지', '10', '15'],
    ['111111', '바지', '귀여운 파란바지', '13', '15'],
  ];

  return (
    <>
      <Header type={StyleType(props.type)} />
      <MainPage>
        <h1></h1>
        <Sidebar company={com} />
        {/* <ListingPage titles={titles} paging={paging} rows={rows} /> */}
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

export default LandscapeMain;
