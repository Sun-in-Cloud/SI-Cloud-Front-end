import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Threepl_ListingPage from '../Threepl_ListingPage';
import { Import } from '../../../global/ImportInterface';
import axios from 'axios';

function Threepl_ImportList(props: any) {
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
    //const listurl = `${process.env.REACT_APP_API_URL}/seller/import/list`;
    const listurl = `/seller/import/list`;
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
        setRowsList(response.data.importproduct);
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

  //입고 상세 조회
  async function getImportDetail() {
    //const listurl = `${process.env.REACT_APP_API_URL}/seller/import/${finImport?.importNo}`;
    const listurl = `/seller/import/${finImport?.importNo}`;
    await axios
      .get(listurl, {
        params: {},
        headers: {
          'Content-type': 'application/json',
        },
      })
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
      <Title>
        <SubTitle>입고 내역 확인하기</SubTitle>
      </Title>
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
        <>
          <ImportDetail>
            <Flow>
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
            </Flow>
          </ImportDetail>
        </>
      )}
    </MainPage>
  );
}

const MainPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.1fr 1.5fr;
  grid-template-areas: 'ListingPage . ListingPage';
`;

const Title = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: white;
  width: 100%;
  height: 120px;
  border-radius: 0 0 10px 10px;
`;

const SubTitle = styled.div`
  display: grid;
  margin-top: 75px;
  font-size: 20px;
  font-family: 'GmarketSansMedium';
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

export default Threepl_ImportList;
