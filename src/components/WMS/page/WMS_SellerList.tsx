import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListingPage from '../WMSListingPage';

function WMS_SellerList(props: any) {
  const title: string[][] = [
    ['사업자번호', 'businessNo'],
    ['화주사명', 'companyName'],
    ['상품군', 'productGroup'],
    ['마케팅 구독', 'marketing'],
  ];
  const [rows, setRows] = useState<any[]>([]);

  const [pageList, setPageList] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  async function getSellerList() {
    const listurl = '/wms/seller/list';
    await axios
      .get(listurl, {
        params: {
          pageNum: currentPage,
          countPerPage: 3,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log('-', response.data.companies);
        setRows(response.data.companies);
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
    getSellerList();
  }, [currentPage]);

  return (
    <ListingPage
      sellerNo={props.seller}
      titles={title}
      number={pageList}
      rows={rows}
      columns={title.length}
      onDetail={true}
      navPage={navPage}
    />
  );
}

export default WMS_SellerList;
