import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import TableColumn from '../../TableColumn';
import TableRow from '../../TableRow';
import Navbtn from '../../common/Navbtn';
import TableRowImport from './TableRowImport';

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

  const ImportTitles: string[][] = [
    ['입고번호', 'importNo'],
    ['작성일', 'importDate'],
  ];

  const DetailTitles: string[][] = [
    ['상품번호', 'productNo'],
    ['상품명', 'productName'],
    ['입고수량', 'importAmount'],
  ];

  async function getImportList() {
    const listurl = '/seller/import/list';
    await axios
      .get(listurl, {
        params: {
          sellerNo: 8,
          pageNum: currentPage,
          countPerPage: '3',
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log(response.data);
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
    const listurl = '/seller/import/' + importNo;
    console.log(importNo);
    await axios
      .get(listurl)
      .then(function (response) {
        setDetailList(response.data);
        console.log(response);
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
            <TableColumn title={ImportTitles} columns={ImportTitles.length} />
            <TableRow title={DetailTitles} rows={detailList} columns={DetailTitles.length}></TableRow>
          </ImportDetail>
        )}
        <p></p>
      </SellerImport>
    </>
  );
}

const SellerImport = styled.div`
  margin-top: -40px;
  display: grid;
  width: 100%;
  height: 600px;
  grid-template-columns: 0.7fr 1fr 4.5fr 0.7fr;
  overflow-x: hidden;
  z-index: 2;
`;
const ImportList = styled.div`
  width: 350px;
`;
const ImportDetail = styled.div`
  overflow-y: scroll;
  padding: 0 30px;
`;
const Navbtns = styled.div`
  display: flex;
  justify-content: center;
`;

export default SellerImporList;
