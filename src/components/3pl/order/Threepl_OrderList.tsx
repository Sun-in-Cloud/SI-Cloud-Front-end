import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Order } from '../../../global/OrderInterface';
import axios from 'axios';
import Threepl_ListingPage from '../Threepl_ListingPage';

function Threepl_OrderList(props: any) {
  const titleMain: string[][] = [
    ['발주 번호', 'orderNo'],
    ['발주 일자', 'orderDate'],
  ];

  const [rowsList, setRowsList] = useState<any[]>([]);

  const [pageList, setPageList] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const titleDetail: string[][] = [
    ['바코드 번호', 'productNo'],
    ['상품명', 'productName'],
    ['발주량', 'amount'],
  ];

  const [rowsDetail, setRowsDetail] = useState<any[]>([]);

  //발주 내역 목록 조회
  async function getOrderList() {
    const listurl = '/3pl/order/list';
    await axios
      .get(listurl, {
        params: {
          sellerNo: props.seller,
          pageNum: currentPage,
          countPerPage: 7,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        setRowsList(response.data.orders);
        const list: number[] = [];
        for (let i = 0; i < response.data.totalPage; i++) {
          list[i] = i + 1;
        }
        setPageList(list);
      })
      .catch(function (error) {
        //console.log(error);
      });
  }

  //발주 상세 조회
  async function getOrderDetail() {
    const listurl = '/3pl/order/' + order?.orderNo;
    await axios
      .get(listurl, {
        params: {},
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        setRowsDetail(response.data);
      })
      .catch(function (error) {
        //console.log(error);
      });
  }

  function navPage(e: React.MouseEvent<HTMLButtonElement> | undefined) {
    if (e != undefined) {
      const pageNum = Number(e.currentTarget.value);
      setCurrentPage(pageNum);
    }
  }

  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    setOrder(undefined);
    getOrderList();
  }, [props.seller, currentPage]);

  useEffect(() => {
    getOrderDetail();
  }, [order]);

  return (
    <MainPage>
      <Threepl_ListingPage
        sellerNo={props.seller}
        titles={titleMain}
        number={pageList}
        rows={rowsList}
        columns={titleMain.length}
        onDetail={true}
        getItem={setOrder}
        navPage={navPage}
      />
      <h1></h1>
      {order != undefined && (
        <OrderDetail>
          <Flow>
            <DetailTable>
              <DetailTitle>
                <p>발주번호: {order?.orderNo}</p>
                <p>{order?.orderDate}</p>
              </DetailTitle>
              <Threepl_ListingPage
                sellerNo={props.seller}
                titles={titleDetail}
                number={null}
                rows={rowsDetail}
                columns={titleDetail.length}
                onDetail={false}
              />
            </DetailTable>
          </Flow>
        </OrderDetail>
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

const Flow = styled.div`
  width: 97%;
`;

export default Threepl_OrderList;
