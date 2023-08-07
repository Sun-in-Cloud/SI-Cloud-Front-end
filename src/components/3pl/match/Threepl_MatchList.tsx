import React, { useEffect, useState } from 'react';
import SelectTable from '../../common/matching/SelectTable';
import { styled } from 'styled-components';
import Threepl_ListingPage from '../Threepl_ListingPage';
import axios from 'axios';
function Threepl_MatchList(props: any) {
  // const rows = [
  //   { companyName: 12312542, productGroup: '의류', endDate: '2023-09-09' },
  //   { companyName: 12156104, productGroup: '냉장', endDate: '2023-09-09' },
  //   { companyName: 125156306, productGroup: '냉장', endDate: '2023-09-09' },
  // ];

  const titles: string[][] = [
    ['화주사명', 'companyName'],
    ['상품군', 'productGroup'],
    ['계약 종료일', 'endDate'],
  ];

  const [rows, setRows] = useState<any[]>([]);

  const [pageList, setPageList] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  async function getSellerList(item: any) {
    const listurl = '/3pl/match/list';
    await axios
      .get(listurl, {
        params: {
          productGroup: item.productGroup,
          address: item.address,
          numValue: item.numValue,
          contractPeriod: item.contractPeriod,
          pageNum: currentPage,
          countPerPage: 3,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log('res', response);
        setRows(response.data.matchingSellers);
        const list: number[] = [];
        for (let i = 0; i < response.data.totalPage; i++) {
          list[i] = i + 1;
        }
        setPageList(list);
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
    //getSellerList();
  }, [currentPage]);

  return (
    <MainPage>
      <SelectTable getFilter={getSellerList}></SelectTable>
      <h1></h1>
      <Threepl_ListingPage
        sellerNo={props.seller}
        titles={titles}
        number={pageList}
        rows={rows}
        columns={titles.length + 1}
        onDetail={true}
        navPage={navPage}
      />
    </MainPage>
  );
}

const MainPage = styled.div`
  margin-top: -40px;
  display: grid;
  grid-template-columns: 3fr 0.2fr 5fr;
  grid-template-areas: 'SelectTable . Threepl_ListingPage';
`;

export default Threepl_MatchList;
