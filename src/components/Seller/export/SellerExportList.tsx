import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';
import DetailExport from './SellerDetailExport';
import TableColumn from '../../TableColumn';
import ExportTableRow from './ExportTableRow';
import Navbtn from '../../common/Navbtn';
import axios from 'axios';
import { useAppSelect } from '../../../redux/configStore.hooks';

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
    ['수량', 'amount'],
    ['판매금액', 'sellingPrice'],
    ['출고일', 'exportDate'],
    ['송장번호', 'invoiceNo'],
    ['주문상태', 'orderStatus'],
  ];
  const [exportList, setExportList] = useState<ExportList[]>([]);
  const seller = useAppSelect((state) => state.seller);
  const [totalPage, setTotalPage] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  async function getPreImportList() {
    const listurl = `${process.env.REACT_APP_API_URL}/seller/export/list`;
    // const listurl = `/seller/export/list`;
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
        <Title>
          <SubTitle>출고 확인하기</SubTitle>
        </Title>
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
const Title = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: #f6f2ef;
  width: 100%;
  height: 120px;
  border-radius: 0 0 10px 10px;
`;

const SubTitle = styled.div`
  display: grid;
  margin-top: 75px;
  font-size: 20px;
  font-family: 'GmarketSansMedium';
`;
const ExportForm = styled.div`
  display: grid;
  height: 550px;
  padding-top: 30px;
  grid-template-columns: 0.7fr 6.6fr 0.7fr;
  z-index: 2;
`;

const ExportList = styled.div`
  padding: 11px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Navbtns = styled.div`
  display: flex;
  justify-content: center;
`;

export default SellerExportList;
