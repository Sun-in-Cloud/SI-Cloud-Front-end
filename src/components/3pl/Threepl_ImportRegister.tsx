import React from 'react';
import { useLocation } from 'react-router-dom';
import Threepl_ListingPage from './Threepl_ListingPage';

function Threepl_ImportRegister(props: any) {
  const { state } = useLocation();

  const columns: string[] = ['바코드 번호', '상품명', '입고 예정 수량', '실제 입고량'];
  const rows = [
    { productNo: 2143154, productName: '오늘 점심', requestAmount: 200, importAmount: 23 },
    { productNo: 5512351, productName: '배고프다', requestAmount: 300, importAmount: null },
    { productNo: 1645512, productName: '점심 메뉴 고민중', requestAmount: 180, importAmount: null },
  ];

  return (
    <div>
      <h1>{state.importNo}</h1>
      <Threepl_ListingPage
        sellerNo={props.seller}
        titles={columns}
        number={[0, 1]}
        rows={rows}
        columns={columns.length}
        onDetail={true}
      />
    </div>
  );
}

export default Threepl_ImportRegister;
