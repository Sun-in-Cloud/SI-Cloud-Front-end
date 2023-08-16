import React, { useEffect, useState } from 'react';
import Threepl_ListingPage from '../Threepl_ListingPage';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import LoginBtn from '../../common/Loginbtn';
import axios from 'axios';

function Threepl_ExportInvoice(props: any) {
  const title: string[][] = [
    ['바코드 번호', 'productNo'],
    ['상품명', 'productName'],
    ['수량', 'amount'],
    ['출고일자', 'localExportDate'],
    ['송장번호', 'invoiceNo'],
    ['주문상태', 'orderStatus'],
  ];

  const [rows, setRows] = useState<any[]>([]);

  const [pageList, setPageList] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [checkedList, setCheckedList] = useState<[]>();

  //출고내역 상세 조회
  async function getExportDetail() {
    //const listurl = `${process.env.REACT_APP_API_URL}/3pl/export/${state.exportNo}`;
    const listurl = `/3pl/export/${state.exportNo}`;
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
        setRows(response.data.exportProducts);
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

  function navPage(e: React.MouseEvent<HTMLButtonElement> | undefined) {
    if (e != undefined) {
      const pageNum = Number(e.currentTarget.value);
      setCurrentPage(pageNum);
    }
  }

  function getExportProduct(invoiceList: any): void {
    setCheckedList(invoiceList);
  }

  //송장 출력
  async function printInvoice() {
    //const listurl = `${process.env.REACT_APP_API_URL}/3pl/export/invoice`;
    const listurl = `/3pl/export/invoice`;
    await axios
      .put(listurl, {
        exportNo: state.exportNo,
        invoiceProducts: checkedList,

        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        let nullList: string = '';
        response.data.map((value: any, index: number) => {
          if (value.invoiceNo === null) {
            nullList += value.productName;
          }
        });
        nullList !== '' ? alert(nullList + ' 재고 부족') : '';

        getExportDetail();
        setCheckedList([]);
      })
      .catch(function (error) {
        //console.log(error);
      });
  }

  useEffect(() => {
    getExportDetail();
  }, [currentPage]);

  const { state } = useLocation();

  return (
    <MainPage>
      <ExportHeader>
        <p>주문번호: {state.exportNo}</p>
        <Btn>
          <LoginBtn variant="primary" type="landscape" onClick={printInvoice}>
            송장 출력
          </LoginBtn>
        </Btn>
      </ExportHeader>
      <Threepl_ListingPage
        sellerNo={props.seller}
        titles={title}
        number={pageList}
        rows={rows}
        columns={title.length + 1}
        onDetail={true}
        getItem={getExportProduct}
        navPage={navPage}
      />
    </MainPage>
  );
}

const MainPage = styled.div`
  display: grid;
  grid-template-rows: 0.1fr 0.9fr;
`;

const ExportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  font-size: 16px;
  font-family: jalnan;
`;

const Btn = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default Threepl_ExportInvoice;
