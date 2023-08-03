import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import ListingPage from '../ListingPage';
import { styled } from 'styled-components';
import { Location, useLocation } from 'react-router-dom';
import { sellerCompany } from '../../global/CompanyInterface';
import axios from 'axios';

function Threepl_ProductList(props: any) {
  const columns: string[] = ['바코드 번호', '상품군', '상품명', '충분재고', '안전재고', '현재재고'];

  const rows: any = [
    {
      productNo: '0101010',
      productGroup: '바지',
      productName: '귀여운 핑크바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
    {
      productNo: '111111',
      productGroup: '바지',
      productName: '귀여운 파란바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
    {
      productNo: '22222222',
      productGroup: '바지',
      productName: '귀여운 파란바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
    {
      productNo: '333333',
      productGroup: '바지',
      productName: '귀여운 파란바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
    {
      productNo: '444444',
      productGroup: '바지',
      productName: '귀여운 파란바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
    {
      productNo: '555555',
      productGroup: '바지',
      productName: '귀여운 파란바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
    {
      productNo: '6666666',
      productGroup: '바지',
      productName: '귀여운 파란바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
    {
      productNo: '777778',
      productGroup: '바지',
      productName: '귀여운 파란바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
    {
      productNo: '8888888',
      productGroup: '바지',
      productName: '귀여운 파란바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
    {
      productNo: '999999',
      productGroup: '바지',
      productName: '귀여운 파란바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
  ];

  return (
    <ListingPage
      sellerNo={props.seller}
      titles={columns}
      number={[0, 1, 2, 3]}
      rows={rows}
      columns={columns.length}
      onDetail={false}
    />
  );
}

export default Threepl_ProductList;
