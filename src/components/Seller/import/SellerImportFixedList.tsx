import React, { useState } from 'react';

interface FixedImportList {}
interface DetailImportList {}

function SellerImportFixedList(props: any) {
  const [onDetail, setOnDetail] = useState(false);

  const importTitles: string[][] = [
    ['입고번호', 'orderNo'],
    ['작성일자', 'orderDate'],
  ];

  const detailTitles: string[][] = [
    ['상품번호', 'productNo'],
    ['상품명', 'productName'],
    ['입고수량', 'amount'],
  ];

  const [orderList, setOrderList] = useState<FixedImportList[]>([]);
  const [orderNo, setOrderNo] = useState(0);
  const [orderDetail, setOrderDetail] = useState<DetailImportList[]>([]);

  function getOrderNo(props: FixedImportList) {
    setOnDetail(true);
    //setOrderNo();
  }

  return <div></div>;
}

export default SellerImportFixedList;
