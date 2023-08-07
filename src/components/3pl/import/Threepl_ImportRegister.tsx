import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Threepl_ListingPage from '../Threepl_ListingPage';
import axios from 'axios';

function Threepl_ImportRegister(props: any) {
  const { state } = useLocation();

  // const columns: string[] = ['바코드 번호', '상품명', '입고 예정 수량', '실제 입고량'];
  // const rows = [
  //   { productNo: 2143154, productName: '오늘 점심', requestAmount: 200, importAmount: 23 },
  //   { productNo: 5512351, productName: '배고프다', requestAmount: 300, importAmount: null },
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
        //setRows(response.data.products);
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

  useEffect(() => {
    console.log('---');
    getProductList();
  }, [props.seller, currentPage]);

  return (
    <div>
      <h1>{state.importNo}</h1>
      <Threepl_ListingPage
        sellerNo={props.seller}
        titles={title}
        number={pageList}
        rows={rows}
        columns={title.length}
        onDetail={true}
      />
    </div>
  );
}

export default Threepl_ImportRegister;
