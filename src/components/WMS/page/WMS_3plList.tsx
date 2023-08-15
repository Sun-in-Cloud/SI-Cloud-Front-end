import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListingPage from '../WMSListingPage';

function WMS_3plList(props: any) {
  const title: string[][] = [
    ['사업자번호', 'businessNo'],
    ['3PL명', 'companyName'],
    ['상품군', 'productGroup'],
    ['남은 창고 수', 'leftContract'],
  ];
  const [rows, setRows] = useState<any[]>([]);

  const [pageList, setPageList] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  async function get3plList() {
    const listurl = `${process.env.REACT_APP_API_URL}/wms/3pl/list`;
    await axios
      .get(listurl, {
        params: {
          pageNum: currentPage,
          countPerPage: 7,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        setRows(response.data.companies);
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
    get3plList();
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

export default WMS_3plList;
