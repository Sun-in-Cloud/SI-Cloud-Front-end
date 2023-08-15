import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import TableColumn from '../../TableColumn';
import TableRow from '../../TableRow';
import Navbtn from '../../common/Navbtn';
import TableRowImport from './TableRowImport';
import { useAppSelect } from '../../../redux/configStore.hooks';

interface ImportList {
  importNo: number;
  requestDate: string;
}

interface DetailList {
  productNo: string;
  productName: string;
  importAmount: number;
}

function SellerImporList(props: any) {
  const [detail, setDetail] = useState(false);
  const [importList, setImportList] = useState<ImportList[]>([]);
  const [importNo, setImportNo] = useState(0); // 선택한 importNo
  const [detailList, setDetailList] = useState<DetailList[]>([]);
  const [totalPage, setTotalPage] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const seller = useAppSelect((state) => state.seller);

  const ImportTitles: string[][] = [
    ['입고번호', 'importNo'],
    ['작성일', 'localImportDate'],
  ];

  const DetailTitles: string[][] = [
    ['상품번호', 'productNo'],
    ['상품명', 'productName'],
    ['입고수량', 'importAmount'],
  ];

  async function getImportList() {
    const listurl = `${process.env.REACT_APP_API_URL}/seller/import/list`;

    await axios
      .get(listurl, {
        params: {
          sellerNo: seller.userNo,
          pageNum: currentPage,
          countPerPage: 7,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        setImportList(response.data.importproduct);
        let list = [];
        for (let i = 1; i <= response.data.totalPage; i++) {
          list.push(i);
        }
        setTotalPage(list);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function getImportDetail() {
    const listurl = `${process.env.REACT_APP_API_URL}/seller/import/${importNo}`;
    console.log(importNo);
    await axios
      .get(listurl)
      .then(function (response) {
        console.log(response);
        setDetailList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getImportNo(props: number) {
    setDetail(true);
    setImportNo(props);
  }

  function navPage(e: React.MouseEvent<HTMLButtonElement> | undefined) {
    if (e != undefined) {
      const pageNum = Number(e.currentTarget.value);
      setCurrentPage(pageNum);
    }
  }

  useEffect(() => {
    getImportList();
  }, [currentPage]);

  useEffect(() => {
    getImportDetail();
  }, [importNo]);

  return (
    <>
      <SellerImport>
        <Title>
          <SubTitle>입고내역 확인</SubTitle>
        </Title>
        <p></p>
        <ImportList>
          <TableColumn title={ImportTitles} columns={ImportTitles.length} />
          <TableRowImport
            title={ImportTitles}
            rows={importList}
            columns={ImportTitles.length}
            onDetail={true}
            getOrderNo={getImportNo}
          ></TableRowImport>
          <Navbtns>
            <Navbtn number={totalPage} navPage={navPage}></Navbtn>
          </Navbtns>
        </ImportList>
        {detail && (
          <ImportDetail>
            <TableColumn title={DetailTitles} columns={DetailTitles.length} />
            <TableRow title={DetailTitles} rows={detailList} columns={DetailTitles.length}></TableRow>
          </ImportDetail>
        )}
        <p></p>
      </SellerImport>
    </>
  );
}

const Title = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: #f6f2ef;
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

const SellerImport = styled.div`
  display: grid;
  width: 100%;
  height: 550px;
  padding-top: 50px;
  grid-template-columns: 0.7fr 1fr 4.5fr 0.7fr;
  overflow-x: hidden;
  z-index: 2;
`;
const ImportList = styled.div`
  width: 350px;
`;
const ImportDetail = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 30px;
`;
const Navbtns = styled.div`
  display: flex;
  justify-content: center;
`;

export default SellerImporList;
