import React, { useEffect, useState } from 'react';
import { sellerCompany } from '../../global/CompanyInterface';
import { Location, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import ListingPage from './Threepl_ListingPage';
import { styled } from 'styled-components';
import { Order } from '../../global/OrderInterface';

function Threepl_OrderList(props: any) {
  console.log('props', props.seller);
  const columns: string[] = ['발주 번호', '발주 일자'];
  const rows = [
    { orderNo: 12312542, orderDate: '2023-02-03' },
    { orderNo: 12156104, orderDate: '2023-02-15' },
    { orderNo: 125156306, orderDate: '2023-02-18' },
  ];

  const columns2: string[] = ['바코드 번호', '상품명', '발주량'];
  const rows2 = [
    { product_no: 12312542, productName: '청바지', amount: 10 },
    { product_no: 12156104, productName: '자켓', amount: 5 },
    { product_no: 125156306, productName: '반바지', amount: 30 },
  ];

  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    setOrder(undefined);
  }, [props.seller]);

  useEffect(() => {
    console.log('order', order?.orderDate);
  }, [order]);

  return (
    <MainPage>
      <ListingPage
        sellerNo={props.seller}
        titles={columns}
        number={[0, 1, 2, 3]}
        rows={rows}
        columns={columns.length}
        onDetail={true}
        getItem={setOrder}
      />
      <h1></h1>
      {order != undefined && (
        <DetailTable>
          <DetailTitle>
            <p>발주번호: {order?.orderNo}</p>
            <p>{order?.orderDate}</p>
          </DetailTitle>
          <ListingPage
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
  grid-template-columns: 1.9fr 0.3fr 2.8fr;
  grid-template-areas: 'ListingPage . ListingPage';
`;

const DetailTable = styled.div`
  display: grid;
  grid-template-rows: 0.1fr 1fr;
  margin-top: -10px;
`;

const DetailTitle = styled.div`
  display: flex;
  font-size: 16px;
  font-family: jalnan;
  justify-content: space-between;
`;

export default Threepl_OrderList;
