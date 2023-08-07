import React from 'react';
import SelectTable from '../../common/matching/SelectTable';
import { styled } from 'styled-components';
import Threepl_ListingPage from '../Threepl_ListingPage';
function Threepl_MatchList(props: any) {
  const columns: string[][] = [
    ['바코드 번호', 'productNo'],
    ['상품명', 'productName'],
    ['입고량', 'importAmount'],
  ];

  const rows = [
    { product_no: 12312542, productName: '청바지', importAmount: 10 },
    { product_no: 12156104, productName: '자켓', importAmount: 5 },
    { product_no: 125156306, productName: '반바지', importAmount: 30 },
  ];
  return (
    <MainPage>
      <SelectTable></SelectTable>
      <h1></h1>
      <Threepl_ListingPage
        sellerNo={props.seller}
        titles={columns}
        number={[1, 2, 3]}
        rows={rows}
        columns={columns.length}
        onDetail={true}
      />
    </MainPage>
  );
}

const MainPage = styled.div`
  margin-top: -40px;
  display: grid;
  grid-template-columns: 3fr 0.2fr 5fr;
  grid-template-areas: 'SelectTable . Threepl_ListingPage';
`;

export default Threepl_MatchList;
