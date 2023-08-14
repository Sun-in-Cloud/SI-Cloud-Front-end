import React, { useEffect, useState } from 'react';
import TableColumn from '../../TableColumn';
import ExportTableRow from './ExportTableRow';
import { styled } from 'styled-components';
import { useLocation } from 'react-router-dom';
import LoginBtn from '../../common/Loginbtn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppSelect } from '../../../redux/configStore.hooks';

interface DetailExportList {
  productNo: number;
  productName: string;
  amount: number;
  exportDate: string;
  invoiceNo: number;
  orderStatus: string;
  sellingPrice: number;
}

function SellerDetailExport(props: any) {
  const location = useLocation();
  let navigate = useNavigate();

  const detailExportTitles: string[][] = [
    ['상품번호', 'productNo'],
    ['상품명', 'productName'],
    ['주문수량', 'amount'],
    ['판매금액', 'sellingPrice'],
    ['출고일', 'exportDate'],
    ['송장번호', 'invoiceNo'],
    ['주문상태', 'orderStatus'],
  ];

  const [detailExport, setDetailExport] = useState<DetailExportList[]>([]);
  const seller = useAppSelect((state) => state.seller);
  const [totalPage, setTotalPage] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  async function getPreImportList() {
    const listurl = '/seller/export/' + location.state.exportNo;
    await axios
      .get(listurl, {
        params: {
          pageNum: currentPage,
          countPerPage: '3',
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log(response);
        setDetailExport(response.data.exportProducts);

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

  function navPage(e: React.MouseEvent<HTMLButtonElement> | undefined) {
    if (e != undefined) {
      const pageNum = Number(e.currentTarget.value);
      setCurrentPage(pageNum);
    }
  }
  useEffect(() => {
    getPreImportList();
  }, [currentPage]);
  return (
    <>
      <ExportForm>
        <p></p>
        <ExportList>
          <ExportHeader>
            <LoginBtn variant="primary" type="landscape" onClick={() => navigate('/seller/export/list')}>
              뒤로가기
            </LoginBtn>
            <ExportNo>주문번호 : {location.state.exportNo}</ExportNo>
          </ExportHeader>

          <TableColumn title={detailExportTitles} columns={detailExportTitles.length} />
          <ExportTableRow
            title={detailExportTitles}
            rows={detailExport}
            columns={detailExportTitles.length}
            onDetail={false}
          ></ExportTableRow>
        </ExportList>
        <p></p>
      </ExportForm>
    </>
  );
}

const ExportForm = styled.div`
  margin-top: -65px;
  display: grid;
  grid-template-columns: 0.7fr 6.6fr 0.7fr;
  z-index: 2;
`;

const ExportNo = styled.div`
  font-size: 20px;
  font-family: 'Jalnan';
`;

const ExportList = styled.div`
  padding: 11px;
  overflow-x: hidden;
`;

const ExportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 10px 10px 10px;
`;

export default SellerDetailExport;
