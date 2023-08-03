import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Threepl_ListingPage from './Threepl_ListingPage';
import { Import } from '../../global/ImportInterface';

function Threepl_ImportList(props: any) {
  const columns: string[] = ['입고 번호', '입고 일자'];
  const rows = [
    { importNo: 12312542, importDate: '2023-02-05' },
    { importNo: 12156104, importDate: '2023-05-11' },
    { importNo: 125156306, importDate: '2023-06-21' },
    { importNo: 7852225452, importDate: '2023-07-26' },
  ];

  const columns2: string[] = ['바코드 번호', '상품명', '입고량'];
  const rows2 = [
    { product_no: 12312542, productName: '청바지', importAmount: 10 },
    { product_no: 12156104, productName: '자켓', importAmount: 5 },
    { product_no: 125156306, productName: '반바지', importAmount: 30 },
  ];

  const [finImport, setFinImport] = useState<Import>();

  useEffect(() => {}, [finImport]);

  return (
    <MainPage>
      <Threepl_ListingPage
        sellerNo={props.seller}
        titles={columns}
        number={[0, 1]}
        rows={rows}
        columns={columns.length}
        onDetail={true}
        getItem={setFinImport}
      />
      <h1></h1>
      {finImport != undefined && (
        <DetailTable>
          <DetailTitle>
            <p>입고번호: {finImport?.importNo}</p>
            <p>{finImport?.importDate}</p>
          </DetailTitle>
          <Threepl_ListingPage
            sellerNo={props.seller}
            titles={columns2}
            number={null}
            rows={rows2}
            columns={columns2.length}
            onDetail={false}
          />
        </DetailTable>
      )}
    </MainPage>
  );
}

const MainPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.1fr 1fr;
  grid-template-areas: 'ListingPage . ListingPage';
`;

const DetailTable = styled.div`
  display: grid;
  grid-template-rows: 0.1fr 0.9fr;
  margin-top: -10px;
`;

const DetailTitle = styled.div`
  display: flex;
  font-size: 16px;
  font-family: jalnan;
  justify-content: space-between;
`;
export default Threepl_ImportList;
