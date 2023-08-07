import React, { useEffect, useState } from 'react';
import Threepl_ListingPage from '../Threepl_ListingPage';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import LoginBtn from '../../common/Loginbtn';
import axios from 'axios';
import ListingPage from '../../ListingPage';

function Threepl_ExportInvoice(props: any) {
  // const columns: string[] = ['바코드 번호', '상품명', '주문수량', '출고일자', '송장번호', '주문 상태'];

  // const rows: any = [
  //   {
  //     productNo: '0234101010',
  //     productName: '바지',
  //     amount: 2,
  //     exportDate: '2022-08-02',
  //     invoiceNo: 15641213,
  //     orderStatus: '대기중',
  //   },
  //   {
  //     productNo: '2345424',
  //     productName: '자켓',
  //     amount: 1,
  //     exportDate: '2022-08-02',
  //     invoiceNo: null,
  //     orderStatus: '대기중',
  //   },
  //   {
  //     productNo: '87654647',
  //     productName: '슬리퍼',
  //     amount: 1,
  //     exportDate: '2022-08-02',
  //     invoiceNo: null,
  //     orderStatus: '대기중',
  //   },
  //   {
  //     productNo: '324656534',
  //     productName: '모자',
  //     amount: 1,
  //     exportDate: '2022-08-02',
  //     invoiceNo: null,
  //     orderStatus: '대기중',
  //   },
  // ];

  const title: string[][] = [
    ['바코드 번호', 'productNo'],
    ['상품명', 'productName'],
    ['주문수량', 'amount'],
    ['출고일자', 'exportDate'],
    ['송장번호', 'invoiceNo'],
    ['주문상태', 'orderStatus'],
  ];

  const [rows, setRows] = useState<any[]>([]);

  const [pageList, setPageList] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [invoiceProducts, setInvoiceProducts] = useState<any[]>([]);

  async function getExportDetail() {
    const listurl = '/3pl/export/' + state.exportNo;
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
        console.log('-', response.data.exportProducts);
        setRows(response.data.exportProducts);
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

  function navPage(e: React.MouseEvent<HTMLButtonElement> | undefined) {
    if (e != undefined) {
      const pageNum = Number(e.currentTarget.value);
      setCurrentPage(pageNum);
    }
  }

  function regInvoice(): void {
    console.log('invo', invoiceProducts);
  }

  function findExp(exp: any): void {
    setInvoiceProducts([...invoiceProducts, exp.item]);
  }

  useEffect(() => {
    console.log('---');
    getExportDetail();
  }, [currentPage]);

  const { state } = useLocation();

  return (
    <MainPage>
      <Btn>
        <p>{state.exportNo}</p>
        <LoginBtn variant="primary" type="landscape" onClick={regInvoice}>
          송장 출력
        </LoginBtn>
      </Btn>
      <Threepl_ListingPage
        sellerNo={props.seller}
        titles={title}
        number={pageList}
        rows={rows}
        columns={title.length + 1}
        onDetail={true}
        getItem={findExp}
        navPage={navPage}
      />
    </MainPage>
  );
}

const MainPage = styled.div`
  display: grid;
  grid-template-rows: 0.1fr 0.9fr;
`;

const Btn = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default Threepl_ExportInvoice;
