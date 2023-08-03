import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Order } from '../../global/OrderInterface';
import Threepl_ListingPage from './Threepl_ListingPage';
import { Import } from '../../global/ImportInterface';

function Threepl_ImportPreList(props: any) {
  const columns: string[] = ['입고예정번호', '작성 일자'];
  const rows = [
    { importNo: 12312542, requestDate: '2023-02-03', importDate: '2023-02-05' },
    { importNo: 12156104, requestDate: '2023-02-15', importDate: '2023-02-21' },
    { importNo: 125156306, requestDate: '2023-02-18', importDate: null },
    { importNo: 7852225452, requestDate: '2023-07-18', importDate: null },
  ];

  const columns2: string[] = ['바코드 번호', '상품명', '예상 입고'];
  const rows2 = [
    { productNo: 12312542, productName: '청바지', requestAmount: 10 },
    { productNo: 12156104, productName: '자켓', requestAmount: 5 },
    { productNo: 125156306, productName: '반바지', requestAmount: 30 },
  ];

  const [preImport, setPreImport] = useState<Import>();

  useEffect(() => {
    setPreImport(undefined);
  }, [props.seller]);

  useEffect(() => {}, [preImport]);

  return (
    <MainPage>
      <Threepl_ListingPage
        sellerNo={props.seller}
        titles={columns}
        number={[0, 1]}
        rows={rows}
        columns={columns.length + 1}
        onDetail={true}
        getItem={setPreImport}
      />
      <h1></h1>
      {preImport !== undefined && (
        <DetailTable>
          <DetailTitle>
            <p>입고예정번호: {preImport?.importNo}</p>
            <p>{preImport?.requestDate}</p>
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

export default Threepl_ImportPreList;
