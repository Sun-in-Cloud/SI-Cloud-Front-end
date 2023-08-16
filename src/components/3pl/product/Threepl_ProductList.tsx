import React, { useEffect, useState } from 'react';
import ListingPage from '../../ListingPage';
import axios from 'axios';

function Threepl_ProductList(props: any) {
  const title: string[][] = [
    ['바코드 번호', 'productNo'],
    ['상품군', 'productGroup'],
    ['상품명', 'productName'],
    ['충분재고', 'enoughStock'],
    ['안전재고', 'safetyStock'],
    ['현재재고', 'currentStock'],
  ];

  const [rows, setRows] = useState<any[]>([]);

  const [pageList, setPageList] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  async function getProductList() {
    const listurl = `${process.env.REACT_APP_API_URL}/3pl/product/list`;
    // const listurl = `/3pl/product/list`;
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
        console.log(response);
        setRows(response.data.products);
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

  useEffect(() => {
    getProductList();
  }, [props.seller, currentPage]);

  return (
    <ListingPage
      sellerNo={props.seller}
      titles={title}
      number={pageList}
      rows={rows}
      columns={title.length}
      onDetail={false}
      navPage={navPage}
    />
  );
}

export default Threepl_ProductList;
