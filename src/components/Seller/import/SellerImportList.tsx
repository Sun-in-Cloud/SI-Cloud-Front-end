import React, { useState } from 'react';
import { styled } from 'styled-components';

interface ImportList {
  orderNo: number;
  orderDate: string;
}
interface DetailList {
  productNo: number;
  importNo: number;
  requestAmount: number;
  importAmount: number;
}

function SellerImportList(props: any) {
  const [onDetail, setOnDetail] = useState(false);

  const importTitles: string[][] = [
    ['발주번호', 'orderNo'],
    ['발주일자', 'orderDate'],
  ];

  const detailTitles: string[][] = [
    ['상품번호', 'productNo'],
    ['입고번호', 'importNo'],
    ['요청수량', 'requestAmount'],
    ['실제수량', 'importAmount'],
  ];

  const [importList, setImportList] = useState<ImportList[]>([
    { orderNo: 123123, orderDate: '22.12.01' },
    { orderNo: 111, orderDate: '22.12.02' },
    { orderNo: 222, orderDate: '22.12.03' },
  ]);
  const [importNo, setImportNo] = useState(0);

  const [importDetail, setImportDetail] = useState<DetailList[]>([
    {
      productNo: 112233,
      importNo: 1100,
      requestAmount: 111,
      importAmount: 200,
    },
    {
      productNo: 11111,
      importNo: 2233,
      requestAmount: 12,
      importAmount: 144,
    },
    {
      productNo: 24243,
      importNo: 345,
      requestAmount: 65,
      importAmount: 444,
    },
    {
      productNo: 234645,
      importNo: 88,
      requestAmount: 67,
      importAmount: 99,
    },
  ]);

  function getImportNo(props: ImportList) {
    setOnDetail(true);
    setImportNo(props.orderNo);
  }

  return (
    <>
      <SellerImport>
        <ImportList></ImportList>
        <ImportDetail></ImportDetail>
      </SellerImport>
    </>
  );
}
const SellerImport = styled.div`
  margin-top: -65px;
  display: grid;
  grid-template-columns: 0.7fr 4fr 2fr 0.7fr;
  z-index: 2;
`;
const ImportList = styled.div``;
const ImportDetail = styled.div``;

export default SellerImportList;
