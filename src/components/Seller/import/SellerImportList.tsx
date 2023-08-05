import React, { useState } from 'react';

interface PreImportList {}

interface PreDetailList {}

function SellerImporList(props: any) {
  const [onDetail, setOnDetail] = useState(false);

  const preImportTitles: string[][] = [
    ['입고예정번호', 'orderNo'],
    ['작성일', 'orderDate'],
    ['입고등록여부', 'importNo'],
  ];

  const PreDetailTitles: string[][] = [
    ['상품번호', 'productNo'],
    ['상품명', 'productName'],
    ['예상입고수량', 'requestAmount'],
  ];

  const [preImportList, setPreImportList] = useState<PreImportList[]>([]);
  const [preImportNo, setPreImportNo] = useState(0);
  const [preDetailList, setPreDetailList] = useState<PreDetailList[]>([]);

  return <></>;
}

export default SellerImporList;
