import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import TableColumn from '../../TableColumn';
import TableRowOrder from './TableRowOrder';
import TableRow from '../../TableRow';
import axios from 'axios';
import Navbtn from '../../common/Navbtn';
import { useAppSelect } from '../../../redux/configStore.hooks';

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
  const seller = useAppSelect((state) => state.seller);
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
  }
  async function getOrderList() {
    const listurl = '/seller/order/list';
    await axios
      .get(listurl, {
        params: {
          sellerNo: seller.userNo,
          pageNum: currentPage,
          countPerPage: 10,
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
    const listurl = `${process.env.REACT_APP_API_URL}/seller/order/${orderNo}`;

    await axios
      .get(listurl, {
        params: {
          sellerNo: seller.userNo,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        setOrderDetail(response.data);
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
  padding-top: 55px;
  background-color: #f4f0ed;
  border-radius: 15px 15px 0 0;
  display: grid;
  grid-template-columns: 0.3fr 3.5fr 5fr 0.3fr;
  column-gap: 15px;
  z-index: 2;
  height: 93%;
`;
const OrderList = styled.div`
  width: 100%;
`;
const OrderDetail = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
  margin: 0 10px;
  height: 500px;
  display: flex;
  background: #fff;

  justify-content: center;
  border-radius: 14px;
  box-shadow: 0 1px 3px -2px black;
`;
const Navbtns = styled.div`
  display: flex;
  justify-content: center;
`;

const Flow = styled.div`
  width: 97%;
`;

export default SellerOrderList;
