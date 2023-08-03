import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';
import ExportList from './ExportList';
import DetailExport from './DetailExport';

interface ExportList {
  exportNo: number;
  ordererName: string;
  address: string;
  salesChannel: string;
  orderStatus: string;
}

interface DetailExportList {
  productNo: number;
  productName: string;
  amount: number;
  exportDate: string;
  invoiceNo: number;
  orderStatus: string;
  sellingPrice: number;
}

function SellerExportList(props: any) {
  const exportTitles: string[][] = [
    ['주문번호', 'orderNo'],
    ['주문자명', 'ordererName'],
    ['주소', 'address'],
    ['채널', 'salesChannel'],
    ['주문상태', 'orderStatus'],
  ];

  const detailExportTitles: string[][] = [
    ['상품번호', 'productNo'],
    ['상품명', 'productName'],
    ['주문수량', 'amount'],
    ['판매금액', 'sellingPrice'],
    ['출고일', 'exportDate'],
    ['송장번호', 'invoiceNo'],
    ['주문상태', 'orderStatus'],
  ];
  const [exportList, setExportList] = useState<ExportList[]>([
    { exportNo: 123123, ordererName: '양돌', address: '서울특별시 000', salesChannel: '쿠팡', orderStatus: '주문취소' },
    { exportNo: 234234, ordererName: '양밥', address: '경기도 000', salesChannel: '11번가', orderStatus: '준비중' },
    { exportNo: 345345, ordererName: '양찐', address: '강원도 000', salesChannel: '자사몰', orderStatus: '출고완료' },
  ]);

  const [detailExport, setDetailExport] = useState<DetailExportList[]>([
    {
      productNo: 123123,
      productName: '양말',
      amount: 100,
      exportDate: '23.05.05',
      invoiceNo: 135789,
      orderStatus: '배송중',
      sellingPrice: 168000,
    },
    {
      productNo: 123123,
      productName: '줄무늬 양말',
      amount: 100,
      exportDate: '23.05.05',
      invoiceNo: 123123,
      orderStatus: '배송준비중',
      sellingPrice: 234234,
    },
    {
      productNo: 123123,
      productName: '땡땡이양말',
      amount: 30,
      exportDate: '23.05.05',
      invoiceNo: 42378,
      orderStatus: '배송중',
      sellingPrice: 50000,
    },
  ]);

  const [orderNo, setOrderNo] = useState(0);

  function getExportNo(props: ExportList) {
    // setOrderNo();
  }

  return (
    <>
      <ExportForm>
        <p></p>
        <Routes>
          <Route
            path="/list"
            element={
              <ExportList
                title={exportTitles}
                rows={exportList}
                columns={exportTitles.length}
                getExportNo={getExportNo}
              ></ExportList>
            }
          ></Route>
          <Route
            path="/*"
            element={<DetailExport title={detailExportTitles} rows={detailExport}></DetailExport>}
          ></Route>
        </Routes>
        <p></p>
      </ExportForm>
    </>
  );
}

const ExportForm = styled.div`
  margin-top: -65px;
  display: grid;
  grid-template-columns: 0.7fr 6.6fr 0.7fr;
  z-index: 2;
`;

export default SellerExportList;
