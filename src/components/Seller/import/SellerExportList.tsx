import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Navbtn from '../../common/Navbtn';
import axios from 'axios';
import TableColumn from '../../TableColumn';
import TableRowOrder from '../order/TableRowOrder';
import TableRow from '../../TableRow';
import TableRowImport from './TableRowImport';

interface FixedImportList {
  importNo: number;
  requestDate: string;
  importDate: string;
}
interface FixedDetailImportList {
  productNo: string;
  productName: string;
  importAmount: number;
}

function SellerExportList(props: any) {
  const [onDetail, setOnDetail] = useState(false);
  const [preImportList, setPreImportList] = useState<FixedImportList[]>([]);
  const [importNo, setImportNo] = useState(0);
  const [preImportDetail, setPreImportDetail] = useState<FixedDetailImportList[]>([]);
  const [totalPage, setTotalPage] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fixedImportTitles: string[][] = [
    ['입고번호', 'orderNo'],
    ['작성일자', 'orderDate'],
    ['등록여부', 'isImported'],
  ];

  const fixedDetailTitles: string[][] = [
    ['상품번호', 'productNo'],
    ['상품명', 'productName'],
    ['예상수량', 'requestAmount'],
  ];

  function getImportNo(props: FixedImportList) {
    setOnDetail(true);
    // setImportNo(props.importNo);
  }

  async function getFixedImportList() {
    const listurl = '/seller/import/pre/list';
    await axios
      .get(listurl, {
        params: {
          sellerNo: 8,
          pageNum: currentPage,
          countPerPage: 3,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log(response.data);
        setPreImportList(response.data.orders);
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

  async function getPreImportDetail() {
    const listurl = '/seller/import/pre/' + importNo;
    await axios
      .get(listurl)
      .then(function (response) {
        console.log(response.data);
        setPreImportDetail(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //버튼 이동 함수
  function navPage(e: React.MouseEvent<HTMLButtonElement> | undefined) {
    if (e != undefined) {
      const pageNum = Number(e.currentTarget.value);
      setCurrentPage(pageNum);
    }
  }

  useEffect(() => {
    getFixedImportList();
  }, [currentPage]);

  useEffect(() => {
    getPreImportDetail();
  }, [importNo]);

  return (
    <>
      <PreImportList>
        <p></p>
        <ImportList>
          <TableColumn title={fixedImportTitles} columns={fixedImportTitles.length} />
          <TableRowImport
            title={fixedImportTitles}
            rows={preImportList}
            columns={fixedImportTitles.length}
            onDetail={true}
            getOrderNo={getImportNo}
          ></TableRowImport>
          <Navbtns>
            <Navbtn number={totalPage} navPage={navPage}></Navbtn>
          </Navbtns>
        </ImportList>
        {onDetail && (
          <>
            <Detail>
              <>
                <TableColumn title={fixedDetailTitles} columns={fixedDetailTitles.length} />
                <TableRow
                  title={fixedDetailTitles}
                  rows={preImportDetail}
                  columns={fixedDetailTitles.length}
                ></TableRow>
              </>
            </Detail>
          </>
        )}
        <p></p>
      </PreImportList>
    </>
  );
}
const PreImportList = styled.div`
  margin-top: -10px;
  display: grid;
  width: 100%;
  height: 600px;
  grid-template-columns: 0.7fr 3fr 3fr 0.7fr;
`;
const ImportList = styled.div`
  width: 400px;
`;
const Detail = styled.div`
  overflow-y: scroll;
  padding: 0 10px;
`;
const Navbtns = styled.div`
  display: flex;
  justify-content: center;
`;

export default SellerExportList;
