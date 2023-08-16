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
    ['수량', 'amount'],
    ['판매금액', 'sellingPrice'],
    ['출고일', 'localExportDate'],
    ['송장번호', 'invoiceNo'],
    ['주문상태', 'orderStatus'],
  ];

  const [detailExport, setDetailExport] = useState<DetailExportList[]>([]);
  const seller = useAppSelect((state) => state.seller);
  const [totalPage, setTotalPage] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  async function getPreImportList() {
    //const listurl = `${process.env.REACT_APP_API_URL}/seller/export/` + location.state.exportNo;
    const listurl = `/seller/export/` + location.state.exportNo;
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
        <Title>
          <SubTitle>출고 확인하기</SubTitle>
        </Title>
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
  font-family: GmarketSansMedium;
`;
const ExportForm = styled.div`
  display: grid;
  padding-top: 30px;
  grid-template-columns: 0.4fr 6.6fr 0.4fr;
  z-index: 2;
`;

const ExportNo = styled.div`
  font-size: 20px;
  font-family: GmarketSansMedium;
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
