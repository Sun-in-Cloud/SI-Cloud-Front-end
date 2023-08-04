import React, { useEffect, useState } from 'react';
import { sellerCompany } from '../../global/CompanyInterface';
import { Location, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { styled } from 'styled-components';
import { Order } from '../../global/OrderInterface';
import axios from 'axios';
import Threepl_ListingPage from './Threepl_ListingPage';
import { title } from 'process';

function Threepl_OrderList(props: any) {
  console.log('props', props.seller);
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
          countPerPage: 3,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log('-', response.data.orders);
        setRowsList(response.data.orders);
        const list: number[] = [];
        for (let i = 0; i < response.data.totalPage; i++) {
          list[i] = i + 1;
        }
        setPageList(list);

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
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
        console.log('-', response.data);
        setRowsDetail(response.data);
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

  const columns2: string[] = ['바코드 번호', '상품명', '발주량'];
  const rows2 = [
    { product_no: 12312542, productName: '청바지', amount: 10 },
    { product_no: 12156104, productName: '자켓', amount: 5 },
    { product_no: 125156306, productName: '반바지', amount: 30 },
  ];

  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    setOrder(undefined);
    getOrderList();
  }, [props.seller]);

  useEffect(() => {
    console.log('order', order?.orderDate);
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
