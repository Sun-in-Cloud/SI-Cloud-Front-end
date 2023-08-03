import React from 'react';
import Threepl_ListingPage from './Threepl_ListingPage';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import LoginBtn from '../common/Loginbtn';

function Threepl_ExportInvoice(props: any) {
  const columns: string[] = ['바코드 번호', '상품명', '주문수량', '출고일자', '송장번호', '주문 상태'];

  const rows: any = [
    {
      productNo: '0234101010',
      productName: '바지',
      amount: 2,
      exportDate: '2022-08-02',
      invoiceNo: 15641213,
      orderStatus: '대기중',
    },
    {
      productNo: '2345424',
      productName: '자켓',
      amount: 1,
      exportDate: '2022-08-02',
      invoiceNo: null,
      orderStatus: '대기중',
    },
    {
      productNo: '87654647',
      productName: '슬리퍼',
      amount: 1,
      exportDate: '2022-08-02',
      invoiceNo: null,
      orderStatus: '대기중',
    },
    {
      productNo: '324656534',
      productName: '모자',
      amount: 1,
      exportDate: '2022-08-02',
      invoiceNo: null,
      orderStatus: '대기중',
    },
  ];

  const { state } = useLocation();

  return (
    <MainPage>
      <Btn>
        <p>{state.exportNo}</p>
        <LoginBtn variant="primary" type="landscape">
          송장 출력
        </LoginBtn>
      </Btn>
      <Threepl_ListingPage
        sellerNo={props.seller}
        titles={columns}
        number={[0, 1, 2, 3]}
        rows={rows}
        columns={columns.length + 1}
        onDetail={true}
      />
    </MainPage>
  );
}

const MainPage = styled.div`
  display: grid;
  grid-template-rows: 0.1fr 0.9fr;
`;

const Btn = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default Threepl_ExportInvoice;
