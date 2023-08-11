import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Threepl_ListingPage from '../Threepl_ListingPage';
import { Import } from '../../../global/ImportInterface';
import axios from 'axios';

function Threepl_ImportList(props: any) {
  // const columns: string[] = ['입고 번호', '입고 일자'];
  // const rows = [
  //   { importNo: 12312542, importDate: '2023-02-05' },
  //   { importNo: 12156104, importDate: '2023-05-11' },
  //   { importNo: 125156306, importDate: '2023-06-21' },
  //   { importNo: 7852225452, importDate: '2023-07-26' },
  // ];

  // const columns2: string[] = ['바코드 번호', '상품명', '입고량'];
  // const rows2 = [
  //   { product_no: 12312542, productName: '청바지', importAmount: 10 },
  //   { product_no: 12156104, productName: '자켓', importAmount: 5 },
  //   { product_no: 125156306, productName: '반바지', importAmount: 30 },
  // ];

  const titleMain: string[][] = [
    ['입고 번호', 'importNo'],
    ['입고 일자', 'localRequestDate'],
  ];
  const [rowsList, setRowsList] = useState<any[]>([]);

  const [pageList, setPageList] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const titleDetail: string[][] = [
    ['바코드 번호', 'productNo'],
    ['상품명', 'productName'],
    ['입고량', 'importAmount'],
  ];

  const [rowsDetail, setRowsDetail] = useState<any[]>([]);

  //입고 내역 목록 조회
  async function getImportList() {
    const listurl = '/seller/import/list';
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
        setRowsList(response.data.importproduct);
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

  //입고 상세 조회
  async function getImportDetail() {
    const listurl = '/seller/import/' + finImport?.importNo;
    await axios
      .get(listurl, {
        params: {},
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log('-', response.data);
        setRowsDetail(response.data);
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

  const [finImport, setFinImport] = useState<Import>();

  useEffect(() => {
    setFinImport(undefined);
    getImportList();
  }, [props.seller, currentPage]);

  useEffect(() => {
    getImportDetail();
  }, [finImport]);

  return (
    <MainPage>
      <Threepl_ListingPage
        sellerNo={props.seller}
        titles={titleMain}
        number={pageList}
        rows={rowsList}
        columns={titleMain.length}
        onDetail={true}
        getItem={setFinImport}
        navPage={navPage}
      />
      <h1></h1>
      {finImport != undefined && (
        <DetailTable>
          <DetailTitle>
            <p>입고번호: {finImport?.importNo}</p>
            <p>{finImport?.importDate}</p>
          </DetailTitle>
          <Threepl_ListingPage
            sellerNo={props.seller}
            titles={titleDetail}
            number={null}
            rows={rowsDetail}
            columns={titleDetail.length}
            onDetail={false}
          />
        </DetailTable>
      )}
    </MainPage>
  );
}

const MainPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.1fr 1fr;
  grid-template-areas: 'ListingPage . ListingPage';
`;

const DetailTable = styled.div`
  display: grid;
  grid-template-rows: 0.1fr 0.9fr;
  margin-top: -10px;
`;

const DetailTitle = styled.div`
  display: flex;
  font-size: 16px;
  font-family: jalnan;
  justify-content: space-between;
`;
export default Threepl_ImportList;
