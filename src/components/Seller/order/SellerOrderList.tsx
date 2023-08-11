import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import TableColumn from '../../TableColumn';
import TableRowOrder from './TableRowOrder';
import TableRow from '../../TableRow';
import axios from 'axios';
import Navbtn from '../../common/Navbtn';

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
  const [orderList, setOrderList] = useState<OrderList[]>([]);
  const [orderNo, setOrderNo] = useState(0);
  const [orderDetail, setOrderDetail] = useState<OrderDetail[]>([]);
  const [totalPage, setTotalPage] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [onDetail, setOnDetail] = useState(false);

  const orderTitles: string[][] = [
    ['발주번호', 'orderNo'],
    ['발주일자', 'orderDate'],
    ['입고번호', 'importNo'],
  ];

  const detailTitles: string[][] = [
    ['상품번호', 'productNo'],
    ['상품명', 'productName'],
    ['수량', 'amount'],
  ];

  function getOrderNo(props: OrderList) {
    setOnDetail(true);
    setOrderNo(props.orderNo);
    console.log(orderNo);
  }
  async function getOrderList() {
    const listurl = '/seller/order/list';
    await axios
      .get(listurl, {
        params: {
          sellerNo: 8,
          pageNum: currentPage,
          countPerPage: 7,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log(response.data);
        setOrderList(response.data.orders);
        let list = [];
        for (let i = 1; i <= response.data.totalPage; i++) {
          list.push(i);
        }
        setTotalPage(list);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function getOrderDetail() {
    const listurl = '/seller/order/' + orderNo;

    console.log(listurl);
    await axios
      .get(listurl, {
        params: {
          sellerNo: 8,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        setOrderDetail(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function navPage(e: React.MouseEvent<HTMLButtonElement> | undefined) {
    if (e != undefined) {
      const pageNum = Number(e.currentTarget.value);
      setCurrentPage(pageNum);
    }
  }

  useEffect(() => {
    getOrderList();
  }, [currentPage]);

  useEffect(() => {
    getOrderDetail();
  }, [orderNo]);

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
          <Navbtns>
            <Navbtn number={totalPage} navPage={navPage}></Navbtn>
          </Navbtns>
        </OrderList>

        {onDetail && (
          <>
            <OrderDetail>
              <Flow>
                <TableColumn title={detailTitles} columns={detailTitles.length} />
                <TableRow title={detailTitles} rows={orderDetail} columns={detailTitles.length}></TableRow>
              </Flow>
            </OrderDetail>
          </>
        )}
        <p></p>
      </SellerOrder>
    </>
  );
}

//onDetail={true}

const SellerOrder = styled.div`
  margin-top: -10px;
  display: grid;
  width: 100%;
  height: 600px;
  grid-template-columns: 0.7fr 2fr 4.3fr 0.7fr;
  z-index: 2;
`;
const OrderList = styled.div`
  width: 300px;
`;
const OrderDetail = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
`;
const Navbtns = styled.div`
  display: flex;
  justify-content: center;
`;

const Flow = styled.div`
  padding: 0 10px;
`;

export default SellerOrderList;
