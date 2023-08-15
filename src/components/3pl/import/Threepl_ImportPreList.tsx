import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Threepl_ListingPage from '../Threepl_ListingPage';
import axios from 'axios';

function Threepl_ImportPreList(props: any) {
  const titleMain: string[][] = [
    ['입고예정번호', 'importNo'],
    ['작성 일자', 'localRequestDate'],
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

  //입고 예정 내역 목록 조회
  async function getPreImportList() {
    const listurl = `${process.env.REACT_APP_API_URL}/seller/import/pre/list`;
    //const listurl = '/seller/import/pre/list';
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
        setRowsList(response.data.preImports);
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

  //입고 예정 상세 조회
  async function getPreImportDetail() {
    const listurl = `${process.env.REACT_APP_API_URL}/seller/import/pre/detail/${preImport?.importNo}`;
    //const listurl = '/seller/import/pre/detail/' + preImport?.importNo;
    await axios
      .get(listurl, {})
      .then(function (response) {
        setRowsDetail(response.data);
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

  const [preImport, setPreImport] = useState<any>();

  useEffect(() => {
    getPreImportList();
  }, [props.seller, currentPage]);

  useEffect(() => {
    getPreImportDetail();
  }, [preImport]);

  return (
    <MainPage>
      <Threepl_ListingPage
        sellerNo={props.seller}
        titles={titleMain}
        number={pageList}
        rows={rowsList}
        columns={titleMain.length + 1}
        onDetail={true}
        getItem={setPreImport}
        navPage={navPage}
      />
      <h1></h1>
      {preImport !== undefined && (
        <ImportDetail>
          <Flow>
            <DetailTable>
              <DetailTitle>
                <p>입고예정번호: {preImport?.importNo}</p>
                <p>{preImport?.localRequestDate}</p>
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
          </Flow>
        </ImportDetail>
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

const ImportDetail = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
  margin: 0 10px;
  height: 500px;
  display: flex;
  background: #fff;

  justify-content: center;
  border-radius: 14px;
  box-shadow: 0 1px 3px -2px black;
`;

const Flow = styled.div`
  width: 97%;
`;

export default Threepl_ImportPreList;
