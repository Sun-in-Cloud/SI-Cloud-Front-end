import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Threepl_ListingPage from '../Threepl_ListingPage';
import axios from 'axios';
import BarcodeScan from '../../common/BarcodeScan';
import { styled } from 'styled-components';

function Threepl_ImportRegister(props: any) {
  const { state } = useLocation();

  // const columns: string[] = ['바코드 번호', '상품명', '입고 예정 수량', '실제 입고량'];
  // const row = [
  //   { productNo: 8809718020261, productName: '마스크', requestAmount: 200, importAmount: 23 },
  //   { productNo: 4029787487862, productName: '비타민', requestAmount: 300, importAmount: null },
  //   { productNo: 1645512, productName: '점심 메뉴 고민중', requestAmount: 180, importAmount: null },
  // ];

  const title: string[][] = [
    ['바코드 번호', 'productNo'],
    ['상품명', 'productName'],
    ['입고 예정 수량', 'requestAmount'],
    ['실제 입고량', 'importAmount'],
  ];

  const [rows, setRows] = useState<any[]>([]);

  const [pageList, setPageList] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  async function getProductList() {
    const listurl = '/3pl/product/list';
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
        console.log('-', response.data);
        setRows(response.data.products);
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

  function getProductNo(productNo: string) {
    console.log(productNo);
    rows.map((value: any, index: number) => {
      if (value.productNo == productNo) {
        value.importAmount++;
        console.log(value.importAmount);
      }
    });
    console.log(rows);
  }

  useEffect(() => {
    console.log('---');
    getProductList();
  }, [props.seller, currentPage]);

  // useEffect(() => {
  //   getProductNo('4029787487862');
  // }, []);

  return (
    <>
      <MainPage>
        {/* <h1>{state.importNo}</h1> */}
        <Threepl_ListingPage
          sellerNo={props.seller}
          titles={title}
          number={pageList}
          rows={rows}
          columns={title.length}
          onDetail={true}
        />

        <p></p>
        <BarcodeScan getItem={getProductNo} />
      </MainPage>
    </>
  );
}
const MainPage = styled.div`
  margin-top: -40px;
  display: grid;
  grid-template-columns: 10fr 0.5fr 5fr;
  grid-template-area: Threepl_ListingPage . BarcodeScan;
`;
export default Threepl_ImportRegister;
