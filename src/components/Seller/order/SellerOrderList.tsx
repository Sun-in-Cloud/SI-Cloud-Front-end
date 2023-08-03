import React, { useState } from 'react';
import { styled } from 'styled-components';
import TableColumn from '../../TableColumn';
import TableRowOrder from './TableRowOrder';
import TableRow from '../../TableRow';

interface OrderList {
  orderNo: number;
  orderDate: string;
  importNo: number;
  isImported: boolean;
}

interface OrderDetail {
  productNo: number;
  productName: string;
  amount: number;
}

function SellerOrderList(props: any) {
  const [onDetail, setOnDetail] = useState(false);

  const orderTitles: string[][] = [
    ['발주번호', 'orderNo'],
    ['발주일자', 'orderDate'],
    ['입고번호', 'importNo'],
    ['입고연동', 'isImported'],
  ];

  const detailTitles: string[][] = [
    ['상품번호', 'productNo'],
    ['상품명', 'productName'],
    ['수량', 'amount'],
  ];

  const [orderList, setOrderList] = useState<OrderList[]>([
    { orderNo: 123123, orderDate: '22.12.01', importNo: 1245555, isImported: false },
    { orderNo: 111, orderDate: '22.12.02', importNo: 155522, isImported: false },
    { orderNo: 222, orderDate: '22.12.03', importNo: 2457568, isImported: true },
  ]);
  const [orderNo, setOrderNo] = useState(0);
  const [orderDetail, setOrderDetail] = useState<OrderDetail[]>([
    {
      productNo: 112233,
      productName: '야구 방망이',
      amount: 3,
    },
    {
      productNo: 22222,
      productName: '야구공',
      amount: 43,
    },
    {
      productNo: 3333,
      productName: '야구 글러브',
      amount: 1,
    },
    {
      productNo: 44444,
      productName: '야구 모자',
      amount: 2,
    },
  ]);

  function getOrderNo(props: OrderList) {
    setOnDetail(true);
    setOrderNo(props.orderNo);
    console.log(orderNo);
  }

  return (
    <>
      <SellerOrder>
        <p></p>
        <OrderList>
          <TableColumn title={orderTitles} columns={orderTitles.length} />
          <TableRowOrder
            title={orderTitles}
            rows={orderList}
            columns={orderTitles.length}
            onDetail={true}
            getOrderNo={getOrderNo}
          ></TableRowOrder>
        </OrderList>
        {onDetail && (
          <>
            <h1>발주 번호 : {orderNo}</h1>
            <OrderDetail>
              <TableColumn title={detailTitles} columns={detailTitles.length} />
              <TableRow
                title={detailTitles}
                rows={orderDetail}
                columns={detailTitles.length}
                onDetail={true}
              ></TableRow>
            </OrderDetail>
          </>
        )}
        <p></p>
      </SellerOrder>
    </>
  );
}

const SellerOrder = styled.div`
  margin-top: -65px;
  display: grid;
  grid-template-columns: 0.7fr 4fr 2fr 0.7fr;
  z-index: 2;
`;
const OrderList = styled.div``;
const OrderDetail = styled.div``;

export default SellerOrderList;
