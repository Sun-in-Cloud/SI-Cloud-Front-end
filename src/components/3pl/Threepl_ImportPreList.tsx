import React, { useEffect, useState } from 'react';
import ListingPage from '../ListingPage';
import { styled } from 'styled-components';
import { Order } from '../../global/OrderInterface';

function Threepl_ImportPreList(props: any) {
  const columns: string[] = ['입고 예정 번호', '작성 일자'];
  const rows = [
    { orderNo: 12312542, orderDate: '2023-02-03' },
    { orderNo: 12156104, orderDate: '2023-02-15' },
    { orderNo: 125156306, orderDate: '2023-02-18' },
  ];

  const [preImport, setPreImport] = useState<Order>();

  useEffect(() => {
    console.log('order', preImport?.orderDate);
  }, [preImport]);

  return (
    <MainPage>
      <ListingPage
        sellerNo={props.seller}
        titles={columns}
        number={[0, 1]}
        rows={rows}
        columns={columns.length + 1}
        onDetail={true}
        getItem={setPreImport}
      />
      <h1></h1>
      <DetailTable>
        <DetailTitle>
          <p>발주번호: {preImport?.orderNo}</p>
          <p>{preImport?.orderDate}</p>
        </DetailTitle>
        <ListingPage
          sellerNo={props.seller}
          titles={columns}
          number={[0, 1]}
          rows={rows}
          columns={columns.length}
          onDetail={true}
        />
      </DetailTable>
    </MainPage>
  );
}

const MainPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.3fr 1fr;
  grid-template-areas: 'ListingPage . ListingPage';
`;

const DetailTable = styled.div`
  display: grid;
  grid-template-rows: 0.1fr 0.9fr;
  margin-top: -50px;
`;

const DetailTitle = styled.div`
  display: flex;
  font-size: 16px;
  font-family: jalnan;
  justify-content: space-between;
`;

export default Threepl_ImportPreList;
