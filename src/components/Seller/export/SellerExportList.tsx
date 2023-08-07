import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';
import DetailExport from './SellerDetailExport';
import TableColumn from '../../TableColumn';
import ExportTableRow from './ExportTableRow';
import Navbtn from '../../common/Navbtn';
import axios from 'axios';

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
    ['주문번호', 'exportNo'],
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
  const [exportList, setExportList] = useState<ExportList[]>([]);

  const [totalPage, setTotalPage] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  async function getPreImportList() {
    const listurl = '/seller/export/list';
    await axios
      .get(listurl, {
        params: {
          sellerNo: 8,
          pageNum: currentPage,
          countPerPage: '3',
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log(response);
        setExportList(response.data.exports);

        let list = [];
        for (let i = 1; i <= response.data.totalPage; i++) {
          list.push(i);
        }
        setTotalPage(list);
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
    getPreImportList();
  }, [currentPage]);

  return (
    <>
      <ExportForm>
        <p></p>
        <ExportList>
          <TableColumn title={exportTitles} columns={exportTitles.length} />
          <ExportTableRow
            title={exportTitles}
            rows={exportList}
            columns={exportTitles.length}
            onDetail={true}
          ></ExportTableRow>
          <Navbtns>
            <Navbtn number={totalPage} navPage={navPage}></Navbtn>
          </Navbtns>
        </ExportList>
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

const ExportList = styled.div`
  margin-top: 30px;
  padding: 11px;
  overflow-x: hidden;
`;

const Navbtns = styled.div`
  display: flex;
  justify-content: center;
`;

export default SellerExportList;
